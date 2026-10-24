/* =========================================================================
   SİTE YAPILANDIRMASI
   -------------------------------------------------------------------------
   Sitedeki tüm içerik (işletme adı, iletişim, hizmetler, ekip, çalışma
   saatleri, randevu ayarları) bu dosyadan yönetilir. HTML dosyalarına
   dokunmadan burada değişiklik yapmanız yeterlidir.
   ========================================================================= */

window.SITE_CONFIG = {
  brand: {
    name: "ELARA",
    subtitle: "Güzellik & Bakım Salonu",
    since: 2014,
    tagline: "Kendinize ayırdığınız en özel zaman.",
    description:
      "Yalnızca kadınlara hizmet veren salonumuzda saç tasarımından cilt bakımına, " +
      "tırnak sanatından gelin hazırlığına kadar her detayı sizin için özenle planlıyoruz. " +
      "Amacımız sadece güzel görünmeniz değil, kendinizi iyi hissederek ayrılmanız.",
  },

  contact: {
    phone: "+90 (555) 000 00 00",
    whatsapp: "905550000000",          // Sadece rakam, ülke koduyla. Randevu mesajı buraya gider.
    email: "info@elaraguzellik.com",
    address: "Bağdat Cad. No: 48/B, Kadıköy / İstanbul",
    mapUrl: "https://maps.google.com/?q=Bağdat+Caddesi+Kadıköy+İstanbul",
    instagram: "https://instagram.com/",
    youtube: "https://youtube.com/",
    tiktok: "https://tiktok.com/",
  },

  stats: [
    { value: "15K+", label: "Mutlu Misafir" },
    { value: "12",   label: "Yıl Deneyim" },
    { value: "6",    label: "Uzman Ekip" },
    { value: "4.9",  label: "Google Puanı" },
  ],

  marquee: [
    "SAÇ TASARIMI", "BALYAJ & RENK", "KERATİN BAKIMI", "MANİKÜR & PEDİKÜR",
    "CİLT BAKIMI", "KAŞ & KİRPİK", "GELİN PAKETİ", "PROFESYONEL MAKYAJ",
  ],

  /* Çalışma saatleri. Haftanın günleri: 0 = Pazar ... 6 = Cumartesi.
     closed: true olan gün randevuya kapalıdır. */
  hours: {
    1: { open: "09:30", close: "20:00" },
    2: { open: "09:30", close: "20:00" },
    3: { open: "09:30", close: "20:00" },
    4: { open: "09:30", close: "20:00" },
    5: { open: "09:30", close: "20:00" },
    6: { open: "09:30", close: "19:00" },
    0: { closed: true },
  },
  hoursLabel: [
    { days: "Pazartesi – Cuma", time: "09:30 – 20:00" },
    { days: "Cumartesi",        time: "09:30 – 19:00" },
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
    { id: "sac-fon",   name: "Saç Kesimi & Fön",        price: 1200,  duration: 60,  icon: "dryer",
      desc: "Yüz hatlarınıza ve yaşam tarzınıza uygun kesim, yıkama ve şekillendirici fön ile tamamlanır." },
    { id: "boya",      name: "Saç Boyama & Balyaj",     price: 4500,  duration: 180, icon: "drop",
      desc: "Dip boya, ombre, balyaj ya da tam renk değişimi. Saçınızı yıpratmayan profesyonel ürünlerle." },
    { id: "keratin",   name: "Keratin & Botoks Bakımı", price: 5000,  duration: 150, icon: "sparkle",
      desc: "Elektriklenmeyi ve kabarmayı önleyen, saça parlaklık ve yumuşaklık kazandıran yoğun bakım." },
    { id: "manikur",   name: "Manikür & Pedikür",       price: 1500,  duration: 90,  icon: "nail",
      desc: "Tırnak bakımı, şekillendirme, nasır ve kütikül temizliği. Dilerseniz kalıcı oje ile tamamlanır." },
    { id: "cilt",      name: "Cilt Bakımı",             price: 2000,  duration: 60,  icon: "spa",
      desc: "Cilt analizi sonrası derin temizlik, peeling, maske ve nemlendirme ile ışıltılı bir cilt." },
    { id: "kas-kirpik",name: "Kaş & Kirpik Tasarımı",   price: 1200,  duration: 60,  icon: "lash",
      desc: "Kaş laminasyon, kaş şekillendirme ve kirpik lifting ile bakışlarınızı belirginleştirin." },
    { id: "makyaj",    name: "Profesyonel Makyaj",      price: 2500,  duration: 60,  icon: "brush",
      desc: "Davet, nişan ve özel günleriniz için cilt tipinize ve kıyafetinize uygun kalıcı makyaj." },
    { id: "gelin",     name: "Gelin Paketi",            price: 25000, duration: 300, icon: "crown", featured: true,
      desc: "Deneme dahil gelin saçı ve makyajı, cilt bakımı, manikür ve kaş tasarımı. En özel gününüz için." },
  ],

  team: [
    { id: "elif",   name: "Elif Yıldız",   role: "Kurucu & Saç Tasarımcısı", exp: "15 yıl",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
      skills: ["Gelin Saçı", "Kesim & Fön"] },
    { id: "selin",  name: "Selin Arslan",  role: "Renk Uzmanı",              exp: "10 yıl",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
      skills: ["Balyaj", "Keratin Bakımı"] },
    { id: "zeynep", name: "Zeynep Kaya",   role: "Cilt Bakım Uzmanı",        exp: "8 yıl",
      photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
      skills: ["Cilt Bakımı", "Peeling"] },
    { id: "merve",  name: "Merve Demir",   role: "Tırnak Tasarımcısı",       exp: "7 yıl",
      photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
      skills: ["Manikür & Pedikür", "Nail Art"] },
    { id: "busra",  name: "Büşra Çelik",   role: "Kaş & Kirpik Uzmanı",      exp: "6 yıl",
      photo: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=600&q=80",
      skills: ["Kaş Laminasyon", "Kirpik Lifting"] },
    { id: "derya",  name: "Derya Aksoy",   role: "Makyaj Artisti",           exp: "9 yıl",
      photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=80",
      skills: ["Gelin Makyajı", "Davet Makyajı"] },
  ],

  gallery: [
    { src: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=900&q=80", alt: "Fön ve şekillendirme" },
    { src: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=900&q=80", alt: "Nail art" },
    { src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80", alt: "Göz makyajı" },
    { src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80", alt: "Cilt bakımı" },
    { src: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=900&q=80", alt: "Kaş tasarımı" },
    { src: "https://images.unsplash.com/photo-1611042553365-9b101441c135?auto=format&fit=crop&w=900&q=80", alt: "Sonuç" },
    { src: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=900&q=80", alt: "Kalıcı oje" },
    { src: "https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=900&q=80", alt: "Makyaj fırçaları" },
  ],

  heroImage:  "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=2000&q=80",
  aboutImage: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80",
  aboutImage2:"https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80",
  experienceImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80",

  reviews: [
    { name: "Ayşe K.", text: "Balyajımı Selin Hanım yaptı, tam istediğim ton. Saçım hiç yıpranmadı, üstelik randevuya zamanında alındım. Artık başka yere gitmiyorum.", rating: 5 },
    { name: "Zeynep T.", text: "Düğünümde gelin paketini aldım; deneme gününden itibaren her şey çok profesyoneldi. Makyajım gece boyunca bozulmadı.", rating: 5 },
    { name: "Elif M.", text: "Cilt bakımından sonra cildim resmen nefes aldı. Salon çok ferah ve temiz, kadınlara özel olması da beni rahat hissettiriyor.", rating: 5 },
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
    pin: "2014",                       // Yönetim paneli giriş PIN'i (yalnızca basit koruma sağlar)
  },
};
