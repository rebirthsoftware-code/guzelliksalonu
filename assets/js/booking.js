/* =========================================================================
   RANDEVU AKIŞI
   ========================================================================= */

(function () {
  const CFG = window.SITE_CONFIG;
  const I = window.ICONS;
  const esc = Util.escape;
  const $ = (id) => document.getElementById(id);

  const state = {
    step: 1,
    services: [],
    barberId: null,       // null = fark etmez
    date: null,
    time: null,
    freeBarbers: [],      // seçili saatte boş olan uzmanlar
    calYear: null,
    calMonth: null,
    name: "", phone: "", note: "",
  };

  const today = new Date(); today.setHours(0, 0, 0, 0);
  const maxDate = new Date(today); maxDate.setDate(maxDate.getDate() + CFG.booking.daysAhead);

  const totalDuration = () => state.services.reduce((s, id) => s + Util.serviceById(id).duration, 0);
  const totalPrice = () => state.services.reduce((s, id) => s + Util.serviceById(id).price, 0);

  function toast(msg, err) {
    const t = $("toast");
    t.textContent = msg; t.classList.toggle("err", !!err); t.classList.add("show");
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 3200);
  }

  /* ---------- Adımlar ---------- */
  function goTo(n) {
    state.step = n;
    document.querySelectorAll(".step").forEach((s) => s.classList.toggle("active", Number(s.dataset.step) === n));
    document.querySelectorAll(".step-dot").forEach((d) => {
      const k = Number(d.dataset.step);
      d.classList.toggle("active", k === n);
      d.classList.toggle("done", k < n);
    });
    if (n === 3) { renderCalendar(); if (state.date && !state.time) loadSlots(); }
    if (n === 5) renderConfirm();
    window.scrollTo({ top: $("stepper").offsetTop - 100, behavior: "smooth" });
  }

  /* ---------- 1. Hizmet ---------- */
  function renderServices() {
    $("service-list").innerHTML = CFG.services.map((s) => `
      <button type="button" class="choice ${state.services.includes(s.id) ? "selected" : ""}" data-id="${s.id}">
        <span class="check">${I.check}</span>
        <span class="choice-body"><b>${esc(s.name)}</b><small>${s.duration} dk</small></span>
        <span class="choice-meta">${Util.money(s.price)}</span>
      </button>`).join("");
    $("service-list").querySelectorAll(".choice").forEach((el) =>
      el.addEventListener("click", () => {
        const id = el.dataset.id;
        if (state.services.includes(id)) state.services = state.services.filter((x) => x !== id);
        else if (state.services.length >= CFG.booking.maxServices) return toast(`En fazla ${CFG.booking.maxServices} hizmet seçebilirsiniz.`, true);
        else state.services.push(id);
        state.date = null; state.time = null;
        renderServices(); updateSummary();
      }));
    $("next-1").disabled = state.services.length === 0;
  }

  /* ---------- 2. Uzman ---------- */
  function renderBarbers() {
    const any = `
      <button type="button" class="choice ${state.barberId === null ? "selected" : ""}" data-id="">
        <span class="check">${I.check}</span>
        <span class="avatar-any">${I.users}</span>
        <span class="choice-body"><b>Fark etmez</b><small>İlk müsait uzman ile en erken saat</small></span>
      </button>`;
    $("barber-list").innerHTML = any + CFG.team.map((t) => `
      <button type="button" class="choice ${state.barberId === t.id ? "selected" : ""}" data-id="${t.id}">
        <span class="check">${I.check}</span>
        <img src="${esc(t.photo)}" alt="${esc(t.name)}">
        <span class="choice-body"><b>${esc(t.name)}</b><small>${esc(t.role)} · ${esc(t.exp)}</small></span>
      </button>`).join("");
    $("barber-list").querySelectorAll(".choice").forEach((el) =>
      el.addEventListener("click", () => {
        state.barberId = el.dataset.id || null;
        state.time = null;
        renderBarbers(); updateSummary();
        if (state.date) loadSlots();
      }));
  }

  /* ---------- 3. Takvim ---------- */
  function renderCalendar() {
    if (state.calYear === null) { state.calYear = today.getFullYear(); state.calMonth = today.getMonth(); }
    const first = new Date(state.calYear, state.calMonth, 1);
    $("cal-title").textContent = first.toLocaleDateString("tr-TR", { month: "long", year: "numeric" });

    const minMonth = today.getFullYear() * 12 + today.getMonth();
    const maxMonth = maxDate.getFullYear() * 12 + maxDate.getMonth();
    const cur = state.calYear * 12 + state.calMonth;
    $("cal-prev").disabled = cur <= minMonth;
    $("cal-next").disabled = cur >= maxMonth;

    const dows = ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"];
    let html = dows.map((d) => `<div class="dow">${d}</div>`).join("");
    const offset = (first.getDay() + 6) % 7;   // Pazartesi başlangıç
    for (let i = 0; i < offset; i++) html += "<div></div>";
    const daysIn = new Date(state.calYear, state.calMonth + 1, 0).getDate();
    for (let d = 1; d <= daysIn; d++) {
      const dt = new Date(state.calYear, state.calMonth, d);
      const ds = Util.toDateStr(dt);
      const inRange = dt >= today && dt <= maxDate;
      const open = !!Util.dayHours(ds);
      const enabled = inRange && open;
      const cls = ["day", enabled ? "enabled" : "disabled", ds === Util.toDateStr(today) ? "today" : "", ds === state.date ? "selected" : ""].join(" ");
      html += `<button type="button" class="${cls}" data-date="${ds}" ${enabled ? "" : "disabled"} title="${!open ? "Kapalı" : ""}">${d}</button>`;
    }
    $("cal-grid").innerHTML = html;
    $("cal-grid").querySelectorAll(".day.enabled").forEach((b) =>
      b.addEventListener("click", () => { state.date = b.dataset.date; state.time = null; renderCalendar(); updateSummary(); loadSlots(); }));
    if (!state.date) renderSlots([]);
  }

  async function loadSlots() {
    $("slots-label").textContent = "Saatler yükleniyor…";
    $("slots").innerHTML = "";
    try {
      const slots = await Store.availableSlots({ date: state.date, barberId: state.barberId, duration: totalDuration() });
      renderSlots(slots);
    } catch (e) {
      $("slots-label").textContent = "Saatler alınamadı";
      $("slots").innerHTML = `<div class="slots-empty">${esc(e.message)}</div>`;
    }
  }

  function renderSlots(slots) {
    if (!state.date) { $("slots-label").textContent = "Önce bir gün seçin"; $("slots-count").textContent = ""; $("slots").innerHTML = ""; $("next-3").disabled = true; return; }
    $("slots-label").textContent = Util.dateLabel(state.date);
    $("slots-count").textContent = slots.length ? `${slots.length} uygun saat` : "";
    if (!slots.length) {
      $("slots").innerHTML = `<div class="slots-empty" style="grid-column:1/-1">Bu gün için uygun saat kalmadı. Lütfen başka bir gün ya da uzman seçin.</div>`;
      $("next-3").disabled = true; return;
    }
    $("slots").innerHTML = slots.map((s) => `<button type="button" class="slot ${s.time === state.time ? "selected" : ""}" data-time="${s.time}" data-barbers="${s.barbers.join(",")}">${s.time}</button>`).join("");
    $("slots").querySelectorAll(".slot").forEach((b) =>
      b.addEventListener("click", () => {
        state.time = b.dataset.time; state.freeBarbers = b.dataset.barbers.split(",");
        $("slots").querySelectorAll(".slot").forEach((x) => x.classList.toggle("selected", x === b));
        $("next-3").disabled = false; updateSummary();
      }));
    $("next-3").disabled = !state.time;
  }

  /* ---------- 4. Form ---------- */
  function validateForm() {
    const name = $("f-name").value.trim();
    const phone = $("f-phone").value.replace(/\D/g, "");
    const okName = name.length >= 3;
    const okPhone = phone.length >= 10 && phone.length <= 13;
    $("f-name").closest(".field").classList.toggle("invalid", !okName);
    $("f-phone").closest(".field").classList.toggle("invalid", !okPhone);
    if (!$("f-consent").checked) { toast("Devam etmek için onay kutusunu işaretleyin.", true); return false; }
    if (!okName || !okPhone) return false;
    state.name = name; state.phone = $("f-phone").value.trim(); state.note = $("f-note").value.trim();
    return true;
  }

  /* ---------- 5. Onay ---------- */
  function assignedBarber() {
    if (state.barberId) return Util.barberById(state.barberId);
    const id = state.freeBarbers[0];
    return id ? Util.barberById(id) : null;
  }

  function renderConfirm() {
    const b = assignedBarber();
    $("confirm-details").innerHTML = `
      <div class="full"><span>Hizmetler</span>${state.services.map((id) => esc(Util.serviceById(id).name)).join(", ")}</div>
      <div><span>Uzman</span>${b ? esc(b.name) : "İlk müsait uzman"}${!state.barberId ? ' <small style="color:var(--muted)">(otomatik atandı)</small>' : ""}</div>
      <div><span>Tarih</span>${Util.dateLabel(state.date)}</div>
      <div><span>Saat</span>${state.time} – ${Util.addMinutes(state.time, totalDuration())}</div>
      <div><span>Süre</span>${totalDuration()} dk</div>
      <div><span>Ad Soyad</span>${esc(state.name)}</div>
      <div><span>Telefon</span>${esc(state.phone)}</div>
      ${state.note ? `<div class="full"><span>Not</span>${esc(state.note)}</div>` : ""}
      <div class="full"><span>Toplam</span><b style="font-family:var(--font-accent);font-size:1.6rem;color:var(--gold-2)">${Util.money(totalPrice())}</b></div>`;
    $("confirm-notice").innerHTML = Store.mode === "remote"
      ? `${I.info}<span>Randevunuz salon sistemine anında iletilir. Onay kodunuzu saklayın.</span>`
      : `${I.info}<span>Randevunuz kaydedildikten sonra WhatsApp ile bize iletmeniz halinde hemen onaylıyoruz.</span>`;
  }

  async function confirm() {
    const btn = $("confirm-btn");
    btn.disabled = true; btn.textContent = "Kaydediliyor…";
    try {
      // Son kontrol: saat hâlâ uygun mu?
      const slots = await Store.availableSlots({ date: state.date, barberId: state.barberId, duration: totalDuration() });
      const slot = slots.find((s) => s.time === state.time);
      if (!slot) { toast("Seçtiğiniz saat az önce doldu, lütfen başka bir saat seçin.", true); goTo(3); loadSlots(); return; }
      state.freeBarbers = slot.barbers;
      const barber = assignedBarber();

      const appt = await Store.create({
        services: state.services,
        serviceNames: state.services.map((id) => Util.serviceById(id).name).join(", "),
        barberId: barber.id,
        barberName: barber.name,
        date: state.date,
        time: state.time,
        duration: totalDuration(),
        price: totalPrice(),
        name: state.name,
        phone: state.phone,
        note: state.note,
        source: "web",
      });
      renderSuccess(appt);
    } catch (e) {
      toast(e.message || "Bir hata oluştu, lütfen tekrar deneyin.", true);
    } finally {
      btn.disabled = false; btn.textContent = "Randevuyu Onayla";
    }
  }

  function icsFor(a) {
    const start = a.date.replace(/-/g, "") + "T" + a.time.replace(":", "") + "00";
    const end = a.date.replace(/-/g, "") + "T" + Util.addMinutes(a.time, a.duration).replace(":", "") + "00";
    const lines = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//" + CFG.brand.name + "//Randevu//TR", "BEGIN:VEVENT",
      "UID:" + a.id + "@" + location.hostname, "DTSTAMP:" + new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z",
      "DTSTART;TZID=Europe/Istanbul:" + start, "DTEND;TZID=Europe/Istanbul:" + end,
      "SUMMARY:" + CFG.brand.name + " – " + a.serviceNames,
      "DESCRIPTION:Uzman: " + a.barberName + "\\nOnay kodu: " + a.code,
      "LOCATION:" + CFG.contact.address.replace(/,/g, "\\,"),
      "END:VEVENT", "END:VCALENDAR",
    ];
    return "data:text/calendar;charset=utf-8," + encodeURIComponent(lines.join("\r\n"));
  }

  function gcalFor(a) {
    const s = a.date.replace(/-/g, "") + "T" + a.time.replace(":", "") + "00";
    const e = a.date.replace(/-/g, "") + "T" + Util.addMinutes(a.time, a.duration).replace(":", "") + "00";
    const u = new URL("https://calendar.google.com/calendar/render");
    u.searchParams.set("action", "TEMPLATE");
    u.searchParams.set("text", `${CFG.brand.name} – ${a.serviceNames}`);
    u.searchParams.set("dates", `${s}/${e}`);
    u.searchParams.set("ctz", "Europe/Istanbul");
    u.searchParams.set("details", `Uzman: ${a.barberName}\nOnay kodu: ${a.code}`);
    u.searchParams.set("location", CFG.contact.address);
    return u.toString();
  }

  function renderSuccess(a) {
    const msg = `Merhaba, ${CFG.brand.name} için randevu oluşturdum.\n` +
      `Onay kodu: ${a.code}\nAd: ${a.name}\nHizmet: ${a.serviceNames}\nUzman: ${a.barberName}\n` +
      `Tarih: ${Util.dateLabel(a.date, { day: "numeric", month: "long", weekday: "long" })} ${a.time}`;
    $("confirm-view").style.display = "none";
    const v = $("success-view");
    v.style.display = "grid";
    v.innerHTML = `
      <div class="ok">${I.check}</div>
      <h2>Randevunuz alındı!</h2>
      <p class="lead" style="text-align:center">${esc(a.name)}, <b>${Util.dateLabel(a.date, { day: "numeric", month: "long", weekday: "long" })}</b> günü saat <b>${a.time}</b>'de <b>${esc(a.barberName)}</b> sizi ağırlamaktan mutluluk duyacak.</p>
      <div class="code" title="Onay kodu">${a.code}</div>
      <div class="success-actions">
        <a class="btn btn-wa" href="${UI.waLink(msg)}" target="_blank" rel="noopener">${I.whatsapp} WhatsApp ile Bildir</a>
        <a class="btn btn-ghost" href="${gcalFor(a)}" target="_blank" rel="noopener">${I.calendar} Google Takvim</a>
        <a class="btn btn-ghost" href="${icsFor(a)}" download="randevu-${a.code}.ics">${I.download} Takvime Ekle (.ics)</a>
      </div>
      <a class="btn btn-dark btn-sm" href="./">Ana Sayfaya Dön</a>`;
    document.querySelectorAll(".step-dot").forEach((d) => d.classList.add("done"));
    window.scrollTo({ top: $("stepper").offsetTop - 100, behavior: "smooth" });
  }

  /* ---------- Özet ---------- */
  function updateSummary() {
    $("s-services").innerHTML = state.services.length
      ? `<span class="chip-list">${state.services.map((id) => `<span class="chip">${esc(Util.serviceById(id).name)}</span>`).join("")}</span>` : "—";
    const b = state.barberId ? Util.barberById(state.barberId) : null;
    $("s-barber").textContent = state.barberId ? b.name : (state.step >= 2 ? "Fark etmez" : "—");
    $("s-date").textContent = state.date ? Util.dateLabel(state.date, { day: "numeric", month: "long", weekday: "short" }) : "—";
    $("s-time").textContent = state.time ? `${state.time} – ${Util.addMinutes(state.time, totalDuration())}` : "—";
    $("s-duration").textContent = state.services.length ? `${totalDuration()} dk` : "—";
    $("s-total").textContent = Util.money(totalPrice());
  }

  /* ---------- Başlat ---------- */
  function init() {
    const q = new URLSearchParams(location.search);
    const pre = q.get("hizmet");
    if (pre && Util.serviceById(pre)) state.services = [pre];
    const preBarber = q.get("uzman");
    if (preBarber && Util.barberById(preBarber)) state.barberId = preBarber;
    const preDate = q.get("tarih");
    if (preDate && /^\d{4}-\d{2}-\d{2}$/.test(preDate)) {
      const d = Util.parseDateStr(preDate);
      if (d >= today && d <= maxDate && Util.dayHours(preDate)) { state.date = preDate; state.calYear = d.getFullYear(); state.calMonth = d.getMonth(); }
    }

    $("cal-prev").innerHTML = I.left; $("cal-next").innerHTML = I.right;
    renderServices(); renderBarbers(); updateSummary();

    $("next-1").addEventListener("click", () => goTo(2));
    $("next-2").addEventListener("click", () => goTo(3));
    $("next-3").addEventListener("click", () => goTo(4));
    $("next-4").addEventListener("click", () => validateForm() && goTo(5));
    $("confirm-btn").addEventListener("click", confirm);
    document.querySelectorAll("[data-back]").forEach((b) => b.addEventListener("click", () => goTo(state.step - 1)));
    $("cal-prev").addEventListener("click", () => { state.calMonth--; if (state.calMonth < 0) { state.calMonth = 11; state.calYear--; } renderCalendar(); });
    $("cal-next").addEventListener("click", () => { state.calMonth++; if (state.calMonth > 11) { state.calMonth = 0; state.calYear++; } renderCalendar(); });
    $("info-form").addEventListener("submit", (e) => { e.preventDefault(); validateForm() && goTo(5); });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
