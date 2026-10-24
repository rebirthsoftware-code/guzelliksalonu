/* =========================================================================
   SİTE YAPILANDIRMASI
   -------------------------------------------------------------------------
   Sitedeki tüm içerik (işletme adı, iletişim, hizmetler, ekip, çalışma
   saatleri, randevu ayarları) bu dosyadan yönetilir. HTML dosyalarına
   dokunmadan burada değişiklik yapmanız yeterlidir.
   ========================================================================= */

window.SITE_CONFIG = {
  brand: {
    name: "EFENDİ",
    subtitle: "Erkek Kuaförü & Barber",
    since: 2012,
    tagline: "Sıradan bir tıraş değil, kendinize ayırdığınız en değerli zaman.",
    description:
      "Klasik berberlik geleneğini modern erkek bakımıyla buluşturuyoruz. " +
      "Ustura tıraşından fade kesime, sakal tasarımından cilt bakımına kadar " +
      "her detayı sizin için özenle planlıyoruz.",
  },

  contact: {
    phone: "+90 (555) 000 00 00",
    whatsapp: "905550000000",          // Sadece rakam, ülke koduyla. Randevu mesajı buraya gider.
    email: "info@efendibarber.com",
    address: "Cumhuriyet Cad. No: 12/A, Kadıköy / İstanbul",
    mapUrl: "https://maps.google.com/?q=Kadıköy+İstanbul",
    instagram: "https://instagram.com/",
    youtube: "https://youtube.com/",
    tiktok: "https://tiktok.com/",
  },

  stats: [
    { value: "10K+", label: "Mutlu Müşteri" },
    { value: "14",   label: "Yıl Deneyim" },
    { value: "6",    label: "Usta Berber" },
    { value: "4.9",  label: "Google Puanı" },
  ],

  marquee: [
    "ERKEK BAKIMI", "KLASİK USTURA", "MODERN KESİM", "SAKAL TASARIMI",
    "DAMAT TIRAŞI", "CİLT BAKIMI", "ÇOCUK KESİMİ", "PREMIUM DENEYİM",
  ],

  /* Çalışma saatleri. Haftanın günleri: 0 = Pazar ... 6 = Cumartesi.
     closed: true olan gün randevuya kapalıdır. */
  hours: {
    1: { open: "09:00", close: "21:00" },
    2: { open: "09:00", close: "21:00" },
    3: { open: "09:00", close: "21:00" },
    4: { open: "09:00", close: "21:00" },
    5: { open: "09:00", close: "21:00" },
    6: { open: "09:00", close: "20:00" },
    0: { closed: true },
  },
  hoursLabel: [
    { days: "Pazartesi – Cuma", time: "09:00 – 21:00" },
    { days: "Cumartesi",        time: "09:00 – 20:00" },
    { days: "Pazar",            time: "Kapalı" },
  ],

  /* Randevu alınamayacak özel günler (YYYY-AA-GG). */
  holidays: ["2026-01-01", "2026-04-23", "2026-05-01", "2026-05-19", "2026-08-30", "2026-10-29"],

  booking: {
    slotStep: 30,          // Dakika cinsinden saat dilimi aralığı
    daysAhead: 30,         // Kaç gün ilerisine randevu alınabilir
    minLeadMinutes: 60,    // Şu andan en az kaç dakika sonrasına randevu alınabilir
    maxServices: 4,
  },

  services: [
    { id: "sac",      name: "Saç Kesimi",            price: 700,  duration: 45, icon: "scissors",
      desc: "Yüz hatlarınıza ve stilinize uygun, makas ve makine ile hassas kesim. Yıkama ve fön dahildir." },
    { id: "sac-sakal",name: "Saç & Sakal",           price: 900,  duration: 60, icon: "razor", featured: true,
      desc: "Saç kesimi ile birlikte sakal şekillendirme ve sıcak havlu ile ustura kontür temizliği." },
    { id: "sakal",    name: "Sakal Şekillendirme",   price: 350,  duration: 25, icon: "beard",
      desc: "Sakalınızın yoğunluğuna göre tasarlanan form, ustura ile hat ve sıcak havlu uygulaması." },
    { id: "ustura",   name: "Klasik Ustura Tıraşı",  price: 450,  duration: 30, icon: "razor",
      desc: "Sıcak havlu, köpük ve ustura ile geleneksel yöntemle pürüzsüz bir tıraş." },
    { id: "cilt",     name: "Cilt Bakımı",           price: 600,  duration: 40, icon: "spa",
      desc: "Siyah nokta temizliği, buhar, maske ve nemlendirme ile yüz bakımı." },
    { id: "cocuk",    name: "Çocuk Kesimi",          price: 450,  duration: 30, icon: "child",
      desc: "12 yaş altı küçük beyler için sabırlı ve eğlenceli bir kesim deneyimi." },
    { id: "damat",    name: "Damat Paketi",          price: 5000, duration: 150, icon: "crown",
      desc: "Saç, sakal, cilt bakımı, kaş düzeltme, ağda ve masaj. Büyük gününüze özel tam bakım." },
    { id: "boya",     name: "Saç / Sakal Boyama",    price: 800,  duration: 60, icon: "drop",
      desc: "Beyazları kapatma ya da doğal ton geçişleri için profesyonel boyama." },
  ],

  team: [
    { id: "kerem", name: "Kerem Aydın",   role: "Kurucu & Usta Berber", exp: "20 yıl",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
      skills: ["Klasik Ustura", "Damat Tıraşı"] },
    { id: "burak", name: "Burak Şahin",   role: "Usta Berber",          exp: "12 yıl",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
      skills: ["Fade Kesim", "Sakal Tasarımı"] },
    { id: "emre",  name: "Emre Kaya",     role: "Saç Kesim Uzmanı",     exp: "8 yıl",
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
      skills: ["Modern Kesim", "Saç Boyama"] },
    { id: "can",   name: "Can Yılmaz",    role: "Saç Kesim Uzmanı",     exp: "6 yıl",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
      skills: ["Makas Kesim", "Çocuk Kesimi"] },
    { id: "mert",  name: "Mert Demir",    role: "Cilt Bakım Uzmanı",    exp: "5 yıl",
      photo: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=600&q=80",
      skills: ["Cilt Bakımı", "Ağda & Kaş"] },
    { id: "ali",   name: "Ali Koç",       role: "Baş Asistan",          exp: "3 yıl",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      skills: ["Yıkama & Fön", "Sakal Bakımı"] },
  ],

  gallery: [
    { src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=900&q=80", alt: "Ustura ile fade kontür" },
    { src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80", alt: "Sakal şekillendirme" },
    { src: "https://images.unsplash.com/photo-1536520002442-39764a41e987?auto=format&fit=crop&w=900&q=80", alt: "Salon içi" },
    { src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=900&q=80", alt: "Makine ile kesim" },
    { src: "https://images.unsplash.com/photo-1532710093739-9470acff878f?auto=format&fit=crop&w=900&q=80", alt: "Klasik tıraş köpüğü" },
    { src: "https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?auto=format&fit=crop&w=900&q=80", alt: "Sonuç" },
    { src: "https://images.unsplash.com/photo-1587909209111-5097ee578ec3?auto=format&fit=crop&w=900&q=80", alt: "Bakım ürünleri" },
    { src: "https://images.unsplash.com/photo-1598524374912-6b0b0bab43dd?auto=format&fit=crop&w=900&q=80", alt: "Şekillendirme" },
  ],

  heroImage:  "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=2000&q=80",
  aboutImage: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=1200&q=80",
  aboutImage2:"https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=80",
  experienceImage: "https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=1600&q=80",

  reviews: [
    { name: "Ahmet Y.", text: "Yıllardır başka yere gitmiyorum. Kerem Usta'nın ustura tıraşı bambaşka. Randevu sistemi de çok pratik, 1 dakikada hallediyorum.", rating: 5 },
    { name: "Serkan D.", text: "Düğünümden önce damat paketini aldım, cilt bakımı ve masaj inanılmazdı. Fotoğraflarda fark hemen belli oldu.", rating: 5 },
    { name: "Oğuzhan K.", text: "Temiz, şık ve zamanında. Burak'ın fade kesimi İstanbul'da en iyisi diyebilirim. Kahve ikramı da cabası.", rating: 5 },
  ],

  /* -----------------------------------------------------------------------
     VERİ KAYNAĞI
     api.url boşsa randevular tarayıcının yerel hafızasında (localStorage)
     tutulur; bu, demo ve tek cihaz kullanımı içindir.
     Gerçek kullanım için backend/google-apps-script klasöründeki Code.gs
     dosyasını Google Apps Script olarak yayınlayıp web uygulaması adresini
     buraya yazın. Randevular Google Sheets'e yazılır ve tüm cihazlardan
     görünür.
     ----------------------------------------------------------------------- */
  api: {
    url: "",
    token: "",                         // Code.gs içindeki TOKEN ile aynı olmalı
  },

  admin: {
    pin: "1979",                       // Yönetim paneli giriş PIN'i (yalnızca basit koruma sağlar)
  },
};
