/* =========================================================================
   YÖNETİM PANELİ
   ========================================================================= */

(function () {
  const CFG = window.SITE_CONFIG;
  const I = window.ICONS;
  const esc = Util.escape;
  const $ = (id) => document.getElementById(id);
  const SESSION_KEY = "elara.admin.ok";
  const STATUS = { beklemede: "Beklemede", onaylandi: "Onaylandı", tamamlandi: "Tamamlandı", iptal: "İptal" };

  const state = { range: "today", date: Util.toDateStr(new Date()), barber: "", status: "", q: "", view: "list", all: [], current: null };

  function toast(msg, err) {
    const t = $("toast");
    t.textContent = msg; t.classList.toggle("err", !!err); t.classList.add("show");
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 3000);
  }

  /* ---------- PIN ---------- */
  function initGate() {
    $("gate-logo").innerHTML = I.logo;
    const inputs = [...$("pin").querySelectorAll("input")];
    inputs.forEach((inp, i) => {
      inp.addEventListener("input", () => {
        inp.value = inp.value.replace(/\D/g, "").slice(-1);
        if (inp.value && inputs[i + 1]) inputs[i + 1].focus();
        if (inputs.every((x) => x.value)) check();
      });
      inp.addEventListener("keydown", (e) => { if (e.key === "Backspace" && !inp.value && inputs[i - 1]) inputs[i - 1].focus(); });
      inp.addEventListener("paste", (e) => {
        const v = (e.clipboardData.getData("text") || "").replace(/\D/g, "").slice(0, 4);
        if (v.length === 4) { e.preventDefault(); inputs.forEach((x, k) => (x.value = v[k])); check(); }
      });
    });
    function check() {
      const pin = inputs.map((x) => x.value).join("");
      if (pin === String(CFG.admin.pin)) { sessionStorage.setItem(SESSION_KEY, "1"); openAdmin(); }
      else { $("pin-err").textContent = "Hatalı PIN, tekrar deneyin."; inputs.forEach((x) => (x.value = "")); inputs[0].focus(); }
    }
    if (sessionStorage.getItem(SESSION_KEY) === "1") openAdmin();
  }

  function openAdmin() {
    $("gate").style.display = "none";
    $("admin").classList.add("show");
    initAdmin();
  }

  /* ---------- Veri ---------- */
  function rangeBounds() {
    const t = new Date(); t.setHours(0, 0, 0, 0);
    const ds = Util.toDateStr;
    if (state.range === "today") return { from: ds(t), to: ds(t) };
    if (state.range === "tomorrow") { const n = new Date(t); n.setDate(n.getDate() + 1); return { from: ds(n), to: ds(n) }; }
    if (state.range === "week") { const s = new Date(t); s.setDate(s.getDate() - ((s.getDay() + 6) % 7)); const e = new Date(s); e.setDate(e.getDate() + 6); return { from: ds(s), to: ds(e) }; }
    if (state.range === "date") return { from: state.date, to: state.date };
    return {};
  }

  async function load() {
    $("content").innerHTML = `<div class="empty">${I.refresh}<span>Yükleniyor…</span></div>`;
    try {
      state.all = await Store.list(rangeBounds());
      render();
    } catch (e) {
      $("content").innerHTML = `<div class="empty">${I.info}<span>${esc(e.message)}</span></div>`;
    }
  }

  function filtered() {
    const q = state.q.toLocaleLowerCase("tr");
    return state.all.filter((a) =>
      (!state.barber || a.barberId === state.barber) &&
      (!state.status || a.status === state.status) &&
      (!q || [a.name, a.phone, a.code, a.serviceNames].some((v) => String(v || "").toLocaleLowerCase("tr").includes(q))));
  }

  /* ---------- Render ---------- */
  function render() {
    const list = filtered();
    const active = list.filter((a) => a.status !== "iptal");
    $("kpis").innerHTML = [
      ["Randevu", list.length],
      ["Beklemede", list.filter((a) => a.status === "beklemede").length],
      ["Onaylı / Tamamlandı", list.filter((a) => a.status === "onaylandi" || a.status === "tamamlandi").length],
      ["Tahmini Ciro", Util.money(active.reduce((s, a) => s + (a.price || 0), 0))],
    ].map(([l, v]) => `<div class="kpi"><span>${l}</span><b>${v}</b></div>`).join("");

    $("content").innerHTML = state.view === "list" ? renderList(list) : renderTimeline(list);
    $("content").querySelectorAll("[data-open]").forEach((el) => el.addEventListener("click", () => openModal(el.dataset.open)));
    $("content").querySelectorAll("[data-quick]").forEach((el) => el.addEventListener("click", (e) => { e.stopPropagation(); setStatus(el.dataset.id, el.dataset.quick); }));
  }

  function renderList(list) {
    if (!list.length) return `<div class="table-wrap"><div class="empty">${I.calendar}<b>Randevu bulunamadı</b><span>Seçili tarih ve filtrelerde kayıt yok.</span></div></div>`;
    const showDate = state.range === "all" || state.range === "week";
    return `<div class="table-wrap"><table class="appts">
      <thead><tr><th>Saat</th><th>Misafir</th><th>Hizmet</th><th>Uzman</th><th>Ücret</th><th>Durum</th><th></th></tr></thead>
      <tbody>${list.map((a) => `
        <tr data-open="${a.id}" style="cursor:pointer">
          <td><span class="t-time">${a.time}${showDate ? `<small>${Util.dateLabel(a.date, { day: "numeric", month: "short", weekday: "short" })}</small>` : `<small>${a.duration} dk</small>`}</span></td>
          <td class="t-name"><b>${esc(a.name)}</b><small>${esc(a.phone)} · ${esc(a.code)}</small></td>
          <td>${esc(a.serviceNames)}</td>
          <td>${esc(a.barberName)}</td>
          <td>${Util.money(a.price || 0)}</td>
          <td><span class="badge ${a.status}">${STATUS[a.status] || a.status}</span></td>
          <td><div class="row-actions">
            ${a.status === "beklemede" ? `<button class="icon-btn" title="Onayla" data-quick="onaylandi" data-id="${a.id}">${I.check}</button>` : ""}
            ${a.status === "onaylandi" ? `<button class="icon-btn" title="Tamamlandı" data-quick="tamamlandi" data-id="${a.id}">${I.shield}</button>` : ""}
            ${a.status !== "iptal" && a.status !== "tamamlandi" ? `<button class="icon-btn" title="İptal" data-quick="iptal" data-id="${a.id}">${I.close}</button>` : ""}
            <button class="icon-btn" title="Detay" data-open="${a.id}">${I.eye}</button>
          </div></td>
        </tr>`).join("")}</tbody></table></div>`;
  }

  function renderTimeline(list) {
    const dates = [...new Set(list.map((a) => a.date))].sort();
    if (dates.length !== 1) {
      return `<div class="table-wrap"><div class="empty">${I.calendar}<b>Zaman çizelgesi tek gün için gösterilir</b><span>Üstten "Bugün", "Yarın" ya da belirli bir tarih seçin.</span></div></div>`;
    }
    const date = dates[0];
    const h = Util.dayHours(date) || { open: "09:00", close: "21:00" };
    const open = Util.timeToMin(h.open), close = Util.timeToMin(h.close);
    const hours = []; for (let m = open; m < close; m += 60) hours.push(Util.minToTime(m));
    const pxPerMin = 1; // 60px / saat
    const barbers = state.barber ? CFG.team.filter((t) => t.id === state.barber) : CFG.team;
    return `<div class="timeline">
      <div class="tl-hours"><div style="height:42px;border-bottom:1px solid var(--line)"></div>${hours.map((t) => `<div>${t}</div>`).join("")}</div>
      <div class="tl-cols">${barbers.map((b) => `
        <div class="tl-col" style="height:${42 + (close - open) * pxPerMin}px;background-position:0 42px">
          <div class="tl-col-head"><img src="${esc(b.photo)}" alt="">${esc(b.name)}</div>
          ${list.filter((a) => a.barberId === b.id).map((a) => {
            const top = 42 + (Util.timeToMin(a.time) - open) * pxPerMin;
            const hgt = Math.max(a.duration * pxPerMin - 4, 26);
            return `<div class="tl-event ${a.status}" style="top:${top}px;height:${hgt}px" data-open="${a.id}" title="${esc(a.name)} · ${esc(a.serviceNames)}">
              <b>${a.time} ${esc(a.name)}</b>${esc(a.serviceNames)}</div>`;
          }).join("")}
        </div>`).join("")}</div>
    </div>`;
  }

  /* ---------- Modal ---------- */
  function openModal(id) {
    const a = state.all.find((x) => x.id === id); if (!a) return;
    state.current = a;
    $("m-code").textContent = "Onay kodu " + a.code;
    $("m-title").textContent = a.name;
    $("m-details").innerHTML = `
      <div><span>Tarih</span>${Util.dateLabel(a.date)}</div>
      <div><span>Saat</span>${a.time} – ${Util.addMinutes(a.time, a.duration)} (${a.duration} dk)</div>
      <div class="full"><span>Hizmetler</span>${esc(a.serviceNames)}</div>
      <div><span>Uzman</span>${esc(a.barberName)}</div>
      <div><span>Ücret</span>${Util.money(a.price || 0)}</div>
      <div><span>Telefon</span><a href="tel:${esc(a.phone.replace(/\s/g, ""))}" style="color:var(--gold-2)">${esc(a.phone)}</a></div>
      <div><span>Oluşturulma</span>${new Date(a.createdAt).toLocaleString("tr-TR")}</div>
      ${a.note ? `<div class="full"><span>Not</span>${esc(a.note)}</div>` : ""}`;
    $("m-status").innerHTML = Object.entries(STATUS).map(([k, v]) => `<button class="${a.status === k ? "on" : ""}" data-s="${k}">${v}</button>`).join("");
    $("m-status").querySelectorAll("button").forEach((b) => b.addEventListener("click", () => setStatus(a.id, b.dataset.s, true)));
    const msg = `Merhaba ${a.name}, ${CFG.brand.name} randevunuz ${Util.dateLabel(a.date, { day: "numeric", month: "long", weekday: "long" })} saat ${a.time} için ${a.status === "onaylandi" ? "onaylanmıştır" : "alınmıştır"}. Onay kodunuz: ${a.code}. Görüşmek üzere!`;
    const phone = a.phone.replace(/\D/g, "").replace(/^0/, "90").replace(/^(?!90)/, "90");
    $("m-wa").href = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    $("modal").classList.add("show");
  }
  function closeModal() { $("modal").classList.remove("show"); state.current = null; }

  async function setStatus(id, status, keepOpen) {
    try {
      await Store.update(id, { status });
      const a = state.all.find((x) => x.id === id); if (a) a.status = status;
      toast(`Durum güncellendi: ${STATUS[status]}`);
      render();
      if (keepOpen && state.current) openModal(id); else closeModal();
    } catch (e) { toast(e.message, true); }
  }

  async function remove() {
    const a = state.current; if (!a) return;
    if (!window.confirm(`${a.name} adlı misafirin ${a.date} ${a.time} randevusu silinsin mi?`)) return;
    try {
      await Store.remove(a.id);
      state.all = state.all.filter((x) => x.id !== a.id);
      closeModal(); render(); toast("Randevu silindi.");
    } catch (e) { toast(e.message, true); }
  }

  /* ---------- Dışa aktar ---------- */
  function exportCsv() {
    const rows = [["Kod", "Tarih", "Saat", "Süre (dk)", "Misafir", "Telefon", "Hizmetler", "Uzman", "Ücret", "Durum", "Not", "Oluşturulma"]];
    filtered().forEach((a) => rows.push([a.code, a.date, a.time, a.duration, a.name, a.phone, a.serviceNames, a.barberName, a.price, STATUS[a.status], a.note || "", a.createdAt]));
    const csv = "﻿" + rows.map((r) => r.map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`).join(";")).join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    a.download = `randevular-${Util.toDateStr(new Date())}.csv`;
    a.click(); URL.revokeObjectURL(a.href);
  }

  /* ---------- Demo veri ---------- */
  async function seedDemo() {
    if (Store.mode === "remote") return toast("Demo veri yalnızca yerel modda eklenir.", true);
    if (!window.confirm("Bugün ve yarın için örnek randevular eklensin mi?")) return;
    const names = ["Ayşe Yılmaz", "Fatma Kaya", "Zeynep Demir", "Elif Çelik", "Merve Aslan", "Esra Şahin", "Gizem Koç", "Büşra Arslan", "Seda Doğan", "Nazlı Kurt"];
    const statuses = ["beklemede", "onaylandi", "onaylandi", "tamamlandi"];
    const d0 = new Date(); const d1 = new Date(); d1.setDate(d1.getDate() + 1);
    for (const d of [d0, d1]) {
      const ds = Util.toDateStr(d);
      const h = Util.dayHours(ds); if (!h) continue;
      for (const b of CFG.team) {
        let t = Util.timeToMin(h.open) + 30 * Math.floor(Math.random() * 4);
        const n = 2 + Math.floor(Math.random() * 3);
        for (let i = 0; i < n && t + 60 < Util.timeToMin(h.close); i++) {
          const svc = CFG.services[Math.floor(Math.random() * 6)];
          await Store.create({
            services: [svc.id], serviceNames: svc.name, barberId: b.id, barberName: b.name,
            date: ds, time: Util.minToTime(t), duration: svc.duration, price: svc.price,
            name: names[Math.floor(Math.random() * names.length)],
            phone: "05" + String(Math.floor(Math.random() * 1e9)).padStart(9, "0").replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4"),
            note: "", source: "demo", status: statuses[Math.floor(Math.random() * statuses.length)],
          });
          t += Math.ceil(svc.duration / 30) * 30 + 30 * Math.floor(Math.random() * 3);
        }
      }
    }
    toast("Demo randevular eklendi."); load();
  }

  /* ---------- Başlat ---------- */
  function initAdmin() {
    if (initAdmin.done) return; initAdmin.done = true;
    const pill = $("mode-pill");
    pill.textContent = Store.mode === "remote" ? "Google Sheets bağlı" : "Yerel mod (bu cihaz)";
    pill.classList.toggle("remote", Store.mode === "remote");
    $("m-close").innerHTML = I.close;
    $("f-barber").innerHTML += CFG.team.map((t) => `<option value="${t.id}">${esc(t.name)}</option>`).join("");
    $("f-date").value = state.date;
    if (Store.mode === "remote") $("btn-demo").style.display = "none";

    $("range").querySelectorAll("button").forEach((b) => b.addEventListener("click", () => {
      state.range = b.dataset.range;
      $("range").querySelectorAll("button").forEach((x) => x.classList.toggle("on", x === b));
      load();
    }));
    $("f-date").addEventListener("change", () => { state.range = "date"; state.date = $("f-date").value; $("range").querySelectorAll("button").forEach((x) => x.classList.remove("on")); load(); });
    $("f-barber").addEventListener("change", () => { state.barber = $("f-barber").value; render(); });
    $("f-status").addEventListener("change", () => { state.status = $("f-status").value; render(); });
    $("f-q").addEventListener("input", () => { state.q = $("f-q").value.trim(); render(); });
    $("view").querySelectorAll("button").forEach((b) => b.addEventListener("click", () => {
      state.view = b.dataset.view;
      $("view").querySelectorAll("button").forEach((x) => x.classList.toggle("on", x === b));
      render();
    }));
    $("btn-refresh").addEventListener("click", load);
    $("btn-export").addEventListener("click", exportCsv);
    $("btn-demo").addEventListener("click", seedDemo);
    $("btn-logout").addEventListener("click", () => { sessionStorage.removeItem(SESSION_KEY); location.reload(); });
    $("m-close").addEventListener("click", closeModal);
    $("m-delete").addEventListener("click", remove);
    $("modal").addEventListener("click", (e) => e.target === $("modal") && closeModal());
    document.addEventListener("keydown", (e) => e.key === "Escape" && closeModal());
    load();
  }

  document.addEventListener("DOMContentLoaded", initGate);
})();
