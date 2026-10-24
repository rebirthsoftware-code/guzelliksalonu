/* =========================================================================
   RANDEVU VERİ KATMANI
   -------------------------------------------------------------------------
   İki mod:
   - localStorage (varsayılan): SITE_CONFIG.api.url boşsa.
   - Uzak API (Google Apps Script): SITE_CONFIG.api.url doluysa.
   Her iki modda da aynı arayüz kullanılır: list(), create(), update().
   ========================================================================= */

(function () {
  const CFG = window.SITE_CONFIG;
  const KEY = "elara.randevular.v1";

  const pad = (n) => String(n).padStart(2, "0");

  const Util = {
    pad,
    toDateStr(d) {
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    },
    parseDateStr(s) {
      const [y, m, d] = s.split("-").map(Number);
      return new Date(y, m - 1, d);
    },
    timeToMin(t) {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + m;
    },
    minToTime(min) {
      return `${pad(Math.floor(min / 60))}:${pad(min % 60)}`;
    },
    addMinutes(t, mins) {
      return Util.minToTime(Util.timeToMin(t) + mins);
    },
    uid() {
      return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    },
    code() {
      const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
      let out = "";
      for (let i = 0; i < 6; i++) out += chars[Math.floor(Math.random() * chars.length)];
      return out;
    },
    money(n) {
      return new Intl.NumberFormat("tr-TR").format(n) + " ₺";
    },
    dateLabel(dateStr, opts) {
      const d = Util.parseDateStr(dateStr);
      return d.toLocaleDateString("tr-TR", opts || { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    },
    serviceById: (id) => CFG.services.find((s) => s.id === id),
    barberById: (id) => CFG.team.find((t) => t.id === id),
    /* Belirli bir günün çalışma saatleri; kapalıysa null */
    dayHours(dateStr) {
      if (CFG.holidays.includes(dateStr)) return null;
      const d = Util.parseDateStr(dateStr);
      const h = CFG.hours[d.getDay()];
      if (!h || h.closed) return null;
      return h;
    },
    escape(s) {
      return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    },
  };

  /* ---------- localStorage sürücüsü ---------- */
  const Local = {
    _read() {
      try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
    },
    _write(list) { localStorage.setItem(KEY, JSON.stringify(list)); },
    async list(params = {}) {
      let list = Local._read();
      if (params.from) list = list.filter((a) => a.date >= params.from);
      if (params.to)   list = list.filter((a) => a.date <= params.to);
      if (params.date) list = list.filter((a) => a.date === params.date);
      return list.sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    },
    async create(appt) {
      const list = Local._read();
      list.push(appt);
      Local._write(list);
      return appt;
    },
    async update(id, patch) {
      const list = Local._read();
      const i = list.findIndex((a) => a.id === id);
      if (i === -1) throw new Error("Randevu bulunamadı");
      list[i] = { ...list[i], ...patch, updatedAt: new Date().toISOString() };
      Local._write(list);
      return list[i];
    },
    async remove(id) {
      Local._write(Local._read().filter((a) => a.id !== id));
      return true;
    },
    async clear() { Local._write([]); },
  };

  /* ---------- Google Apps Script sürücüsü ---------- */
  const Remote = {
    async _get(params) {
      const url = new URL(CFG.api.url);
      Object.entries({ ...params, token: CFG.api.token }).forEach(([k, v]) => v != null && url.searchParams.set(k, v));
      const res = await fetch(url.toString(), { method: "GET" });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Sunucu hatası");
      return data.data;
    },
    async _post(body) {
      // Content-Type text/plain: Apps Script'te CORS ön kontrolünü (preflight) önler.
      const res = await fetch(CFG.api.url, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ ...body, token: CFG.api.token }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Sunucu hatası");
      return data.data;
    },
    list: (params = {}) => Remote._get({ action: "list", ...params }),
    create: (appt) => Remote._post({ action: "create", appointment: appt }),
    update: (id, patch) => Remote._post({ action: "update", id, patch }),
    remove: (id) => Remote._post({ action: "delete", id }),
    clear: async () => { throw new Error("Uzak modda toplu silme kapalıdır."); },
  };

  const driver = CFG.api && CFG.api.url ? Remote : Local;

  /* ---------- Ortak iş mantığı ---------- */
  const Store = {
    mode: driver === Remote ? "remote" : "local",
    list: driver.list,
    update: driver.update,
    remove: driver.remove,
    clear: driver.clear,

    async create(input) {
      const appt = {
        id: Util.uid(),
        code: Util.code(),
        status: "beklemede",            // beklemede | onaylandi | tamamlandi | iptal
        createdAt: new Date().toISOString(),
        ...input,
      };
      return driver.create(appt);
    },

    /* Bir gün için uygun başlangıç saatlerini hesaplar. */
    async availableSlots({ date, barberId, duration }) {
      const hours = Util.dayHours(date);
      if (!hours) return [];
      const step = CFG.booking.slotStep;
      const open = Util.timeToMin(hours.open);
      const close = Util.timeToMin(hours.close);

      const booked = (await Store.list({ date })).filter((a) => a.status !== "iptal");
      const busyFor = (bid) =>
        booked
          .filter((a) => a.barberId === bid)
          .map((a) => [Util.timeToMin(a.time), Util.timeToMin(a.time) + a.duration]);

      const barbers = barberId ? [barberId] : CFG.team.map((t) => t.id);
      const busy = Object.fromEntries(barbers.map((b) => [b, busyFor(b)]));

      const now = new Date();
      const isToday = date === Util.toDateStr(now);
      const minStart = isToday ? now.getHours() * 60 + now.getMinutes() + CFG.booking.minLeadMinutes : -1;

      const slots = [];
      for (let t = open; t + duration <= close; t += step) {
        if (t < minStart) continue;
        const free = barbers.filter((b) => !busy[b].some(([s, e]) => t < e && t + duration > s));
        if (free.length) slots.push({ time: Util.minToTime(t), barbers: free });
      }
      return slots;
    },
  };

  window.Util = Util;
  window.Store = Store;
})();
