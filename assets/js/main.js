/* =========================================================================
   ORTAK ARAYÜZ: ikonlar, navigasyon, ana sayfa içeriğinin yapılandırmadan
   üretilmesi, kaydırma animasyonları.
   ========================================================================= */

(function () {
  const CFG = window.SITE_CONFIG;
  const esc = window.Util.escape;

  const I = (window.ICONS = {
    scissors: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12"/></svg>',
    razor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21 12 12"/><rect x="11" y="3" width="10" height="10" rx="2" transform="rotate(45 16 8)"/><path d="m14 6 4 4"/></svg>',
    beard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8c0 7 3 12 6 12s6-5 6-12"/><path d="M6 8c2-3 10-3 12 0"/><path d="M9 13c1 1 5 1 6 0"/><path d="M12 15v3"/></svg>',
    spa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21c-5 0-9-4-9-8 4 0 7 2 9 5 2-3 5-5 9-5 0 4-4 8-9 8Z"/><path d="M12 13c-2-3-2-7 0-10 2 3 2 7 0 10Z"/></svg>',
    child: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0"/><path d="M9 4c1-1 2-2 3-2s2 1 3 2"/></svg>',
    crown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m3 8 4 4 5-7 5 7 4-4-2 11H5Z"/><path d="M5 21h14"/></svg>',
    drop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3s7 7.5 7 12a7 7 0 0 1-14 0c0-4.5 7-12 7-12Z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5L20 7"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.8.7a2 2 0 0 1 1.8 2Z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2 20a7 7 0 0 1 14 0"/><path d="M16 4a3.5 3.5 0 0 1 0 7M22 20a7 7 0 0 0-5-6.7"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3 6.6 7 .8-5.2 4.8 1.4 7L12 17.7 5.8 21.2l1.4-7L2 9.4l7-.8Z"/></svg>',
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 6-6 6 6 6"/></svg>',
    right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>',
    logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 17l5-5-5-5M15 12H3M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 5v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V5Z"/><path d="m9 12 2 2 4-4"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
    refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v6h-6"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3a.5.5 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 12 12 0 0 0 4.6 4c1.7.7 2.3.8 3.2.7a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12s0-4-.5-5.5a2.5 2.5 0 0 0-1.8-1.8C18.2 4.2 12 4.2 12 4.2s-6.2 0-7.7.5A2.5 2.5 0 0 0 2.5 6.5C2 8 2 12 2 12s0 4 .5 5.5a2.5 2.5 0 0 0 1.8 1.8c1.5.5 7.7.5 7.7.5s6.2 0 7.7-.5a2.5 2.5 0 0 0 1.8-1.8C22 16 22 12 22 12Z"/><path d="m10 9 5 3-5 3V9Z" fill="currentColor"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c.4 2.4 2 4 4.5 4.2v3.3a8 8 0 0 1-4.4-1.4v6.4a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v3.4a2.3 2.3 0 1 0 1.4 2.1V3h3.2Z"/></svg>',
    dryer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9a5 5 0 0 1 5-5h9l4-1v10l-4-1H8a5 5 0 0 1-5-5Z"/><path d="M9 14l-2 7h4l2-7"/><circle cx="8" cy="9" r="1.5"/></svg>',
    nail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6v4H9z"/><path d="M8 7h8v6a4 4 0 0 1-8 0V7Z"/><path d="M12 17v4M10 21h4"/></svg>',
    sparkle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7Z"/><path d="M19 15c.3 1.8 1.2 2.7 3 3-1.8.3-2.7 1.2-3 3-.3-1.8-1.2-2.7-3-3 1.8-.3 2.7-1.2 3-3Z"/></svg>',
    lash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 14c3-5 6.5-7.5 10-7.5S19 9 22 14"/><path d="M12 6.5V3M7.5 7.8 6 4.8M16.5 7.8 18 4.8M4.5 10.5 2.5 8M19.5 10.5l2-2.5"/><path d="M5 14c2 2.5 4.5 3.8 7 3.8s5-1.3 7-3.8"/></svg>',
    brush: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m14 4 6 6-8 8-6-6 8-8Z"/><path d="M6 12 3.5 14.5a3.5 3.5 0 0 0 5 5L11 17"/><path d="m16 2 6 6"/></svg>',
    flower: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2.5"/><path d="M12 2c2 2.5 2 5 0 7.5C10 7 10 4.5 12 2ZM12 22c2-2.5 2-5 0-7.5-2 2.5-2 5 0 7.5ZM2 12c2.5-2 5-2 7.5 0-2.5 2-5 2-7.5 0ZM22 12c-2.5-2-5-2-7.5 0 2.5 2 5 2 7.5 0Z"/></svg>',
    logo: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor"><circle cx="24" cy="24" r="22" stroke-width="1.5"/><circle cx="24" cy="24" r="18" stroke-width=".8" opacity=".5"/><path d="M24 11c3.2 4.2 3.2 8.4 0 12.6-3.2-4.2-3.2-8.4 0-12.6ZM24 37c3.2-4.2 3.2-8.4 0-12.6-3.2 4.2-3.2 8.4 0 12.6ZM11 24c4.2-3.2 8.4-3.2 12.6 0-4.2 3.2-8.4 3.2-12.6 0ZM37 24c-4.2-3.2-8.4-3.2-12.6 0 4.2 3.2 8.4 3.2 12.6 0Z" stroke-width="1.5" stroke-linejoin="round"/><circle cx="24" cy="24" r="2" fill="currentColor" stroke="none"/></svg>',
  });

  const waLink = (text) => `https://wa.me/${CFG.contact.whatsapp}${text ? "?text=" + encodeURIComponent(text) : ""}`;
  const telLink = () => "tel:" + CFG.contact.phone.replace(/[^\d+]/g, "");

  /* ---------- Ortak parçalar ---------- */
  function renderNav(active) {
    const home = document.getElementById("hero") ? "" : "./";
    const links = [
      [home + "#hizmetler", "Hizmetler"],
      [home + "#hakkimizda", "Hakkımızda"],
      [home + "#ekip", "Ekibimiz"],
      [home + "#galeri", "Galeri"],
      [home + "#iletisim", "İletişim"],
    ];
    return `
      <nav class="nav" id="nav">
        <div class="container">
          <a class="logo" href="./">
            <span class="logo-mark">${I.logo}</span>
            <span class="logo-text">${esc(CFG.brand.name)}<small>${esc(CFG.brand.subtitle)}</small></span>
          </a>
          <ul class="nav-links">
            ${links.map(([h, t]) => `<li><a href="${h}" ${active === t ? 'class="active"' : ""}>${t}</a></li>`).join("")}
          </ul>
          <div class="nav-cta">
            <a class="nav-phone" href="${telLink()}">${I.phone}${esc(CFG.contact.phone)}</a>
            <a class="btn btn-gold btn-sm" href="randevu.html">${I.calendar} Randevu Al</a>
            <button class="burger" id="burger" aria-label="Menü"><span></span><span></span><span></span></button>
          </div>
        </div>
      </nav>`;
  }

  function renderFooter() {
    const c = CFG.contact;
    return `
      <footer class="footer" id="iletisim">
        <div class="container">
          <div class="footer-grid">
            <div>
              <a class="logo" href="./">
                <span class="logo-mark">${I.logo}</span>
                <span class="logo-text">${esc(CFG.brand.name)}<small>${esc(CFG.brand.subtitle)}</small></span>
              </a>
              <p style="margin-top:18px;max-width:34ch">${esc(CFG.brand.tagline)}</p>
              <div class="socials">
                <a href="${esc(c.instagram)}" target="_blank" rel="noopener" aria-label="Instagram">${I.instagram}</a>
                <a href="${esc(c.youtube)}" target="_blank" rel="noopener" aria-label="YouTube">${I.youtube}</a>
                <a href="${esc(c.tiktok)}" target="_blank" rel="noopener" aria-label="TikTok">${I.tiktok}</a>
                <a href="${waLink()}" target="_blank" rel="noopener" aria-label="WhatsApp">${I.whatsapp}</a>
              </div>
            </div>
            <div>
              <h4>Sayfalar</h4>
              <ul>
                <li><a href="./">Ana Sayfa</a></li>
                <li><a href="./#hizmetler">Hizmetler</a></li>
                <li><a href="./#ekip">Ekibimiz</a></li>
                <li><a href="./#galeri">Galeri</a></li>
                <li><a href="randevu.html">Randevu Al</a></li>
              </ul>
            </div>
            <div>
              <h4>Hizmetler</h4>
              <ul>${CFG.services.slice(0, 6).map((s) => `<li><a href="randevu.html?hizmet=${s.id}">${esc(s.name)}</a></li>`).join("")}</ul>
            </div>
            <div>
              <h4>İletişim</h4>
              <ul>
                <li><a href="${esc(c.mapUrl)}" target="_blank" rel="noopener">${esc(c.address)}</a></li>
                <li><a href="${telLink()}">${esc(c.phone)}</a></li>
                <li><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></li>
                ${CFG.hoursLabel.map((h) => `<li>${esc(h.days)}: <b style="color:var(--text)">${esc(h.time)}</b></li>`).join("")}
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© <span id="year"></span> ${esc(CFG.brand.name)} ${esc(CFG.brand.subtitle)}. Tüm hakları saklıdır.</span>
            <span><a href="yonetim.html" style="opacity:.6">Yönetim</a> · Tasarım &amp; Geliştirme: <a href="https://github.com/rebirthsoftware-code" target="_blank" rel="noopener">rebirthsoftware</a></span>
          </div>
        </div>
      </footer>
      <a class="wa-float" href="${waLink("Merhaba, randevu almak istiyorum.")}" target="_blank" rel="noopener" aria-label="WhatsApp ile yaz">${I.whatsapp}</a>`;
  }

  function mountShared() {
    const navHost = document.getElementById("nav-host");
    const footHost = document.getElementById("footer-host");
    if (navHost) navHost.innerHTML = renderNav(navHost.dataset.active);
    if (footHost) footHost.innerHTML = renderFooter();
    const y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();

    document.title = document.title.replace("{{brand}}", `${CFG.brand.name} ${CFG.brand.subtitle}`);

    document.body.classList.toggle("has-hero", !!document.getElementById("hero"));
    const nav = document.getElementById("nav");
    const burger = document.getElementById("burger");
    const onScroll = () => nav && nav.classList.toggle("scrolled", window.scrollY > 24 || document.body.dataset.solidNav === "1");
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    burger && burger.addEventListener("click", () => nav.classList.toggle("open"));
    nav && nav.querySelectorAll(".nav-links a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("open")));

  }

  /* Görünüme girince .in sınıfı ekler; dinamik üretilen elemanlar için tekrar çağrılabilir. */
  const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))), { threshold: 0.12 });
  function observeReveals() {
    document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
    // Güvenlik payı: gözlemci tetiklenmese bile içerik birkaç saniye sonra görünür olur.
    setTimeout(() => document.querySelectorAll(".reveal:not(.in)").forEach((el) => el.classList.add("in")), 4000);
  }

  /* ---------- Ana sayfa ---------- */
  function renderHome() {
    const $ = (id) => document.getElementById(id);
    if (!$("hero")) return;

    $("hero-img").src = CFG.heroImage;
    $("hero-card1").src = CFG.heroCards[0];
    $("hero-card2").src = CFG.heroCards[1];
    $("hero-tagline").textContent = CFG.brand.tagline;
    const todayHours = Util.dayHours(Util.toDateStr(new Date()));
    $("hero-hours").textContent = todayHours ? `Bugün ${todayHours.open} – ${todayHours.close}` : "Bugün kapalı";
    $("hero-avatars").innerHTML = CFG.heroAvatars.map((src) => `<img src="${esc(src)}" alt="">`).join("");
    $("hero-count").textContent = CFG.stats[0].value;

    // Hızlı randevu çubuğu
    $("q-service").innerHTML = CFG.services.map((s) => `<option value="${s.id}">${esc(s.name)}</option>`).join("");
    $("q-barber").innerHTML += CFG.team.map((t) => `<option value="${t.id}">${esc(t.name)}</option>`).join("");
    const today = Util.toDateStr(new Date());
    const max = new Date(); max.setDate(max.getDate() + CFG.booking.daysAhead);
    $("q-date").min = today; $("q-date").max = Util.toDateStr(max); $("q-date").value = today;
    $("quick-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const u = new URLSearchParams({ hizmet: $("q-service").value });
      if ($("q-barber").value) u.set("uzman", $("q-barber").value);
      if ($("q-date").value) u.set("tarih", $("q-date").value);
      location.href = "randevu.html?" + u.toString();
    });

    $("stats").innerHTML = CFG.stats.map((s) => `<div class="stat"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`).join("");
    $("marquee").innerHTML = [...CFG.marquee, ...CFG.marquee].map((t) => `<span>${esc(t)}</span>`).join("");

    $("services").innerHTML = CFG.services.map((s, i) => `
      <article class="card service-card reveal" data-delay="${i % 4 ? Math.min(i % 4, 3) : 0}">
        ${s.featured ? '<span class="tag">Popüler</span>' : ""}
        <div class="service-media">
          <img src="${esc(s.image)}" alt="${esc(s.name)}" loading="lazy">
          <div class="service-icon">${I[s.icon] || I.sparkle}</div>
        </div>
        <h3>${esc(s.name)}</h3>
        <p>${esc(s.desc)}</p>
        <div class="service-foot">
          <span class="price">${Util.money(s.price)}</span>
          <span class="dur">${I.clock} ${s.duration} dk</span>
        </div>
        <a class="btn btn-ghost btn-sm" href="randevu.html?hizmet=${s.id}">Randevu Al ${I.arrow}</a>
      </article>`).join("");

    $("about-img").src = CFG.aboutImage;
    $("about-img2").src = CFG.aboutImage2;
    $("about-desc").textContent = CFG.brand.description;
    $("since-year").textContent = CFG.brand.since;
    $("founder-name").textContent = CFG.team[0].name;

    $("team").innerHTML = CFG.team.map((t, i) => `
      <article class="member reveal" data-delay="${i % 3}">
        <div class="member-photo">
          <img src="${esc(t.photo)}" alt="${esc(t.name)}" loading="lazy">
          <span class="member-exp">${esc(t.exp)}</span>
          <div class="member-skills">${t.skills.map((k) => `<i>${esc(k)}</i>`).join("")}</div>
        </div>
        <div class="member-info">
          <span>${esc(t.role)}</span>
          <h3>${esc(t.name)}</h3>
        </div>
      </article>`).join("");

    $("gallery").innerHTML = CFG.gallery.map((g) => `<a href="${esc(g.src)}" target="_blank" rel="noopener" data-label="${esc(g.alt)}"><img src="${esc(g.src)}" alt="${esc(g.alt)}" loading="lazy"></a>`).join("");
    $("ig-link").href = CFG.contact.instagram;

    $("reviews").innerHTML = CFG.reviews.map((r, i) => `
      <article class="card review reveal" data-delay="${i}">
        <div class="stars">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</div>
        <q>${esc(r.text)}</q>
        <div class="who"><i>${esc(r.name[0])}</i>${esc(r.name)} · Google Yorumu</div>
      </article>`).join("");

    $("hours").innerHTML = CFG.hoursLabel.map((h) => `<tr><td>${esc(h.days)}</td><td>${esc(h.time)}</td></tr>`).join("");
    $("cta-wa").href = waLink("Merhaba, randevu almak istiyorum.");
    $("cta-map").href = CFG.contact.mapUrl;
  }

  document.addEventListener("DOMContentLoaded", () => {
    mountShared();
    renderHome();
    observeReveals();
  });

  window.UI = { waLink, telLink };
})();
