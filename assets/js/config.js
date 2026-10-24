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
      "Salonumuzda saç tasarımından cilt bakımına, " +
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
    { id: "sac-fon",   name: "Saç Kesimi & Fön",        price: 1200,  duration: 60,  icon: "dryer", image: "assets/img/gallery-1.jpg",
      desc: "Yüz hatlarınıza ve yaşam tarzınıza uygun kesim, yıkama ve şekillendirici fön ile tamamlanır." },
    { id: "boya",      name: "Saç Boyama & Balyaj",     price: 4500,  duration: 180, icon: "drop", image: "assets/img/service-boya.jpg",
      desc: "Dip boya, ombre, balyaj ya da tam renk değişimi. Saçınızı yıpratmayan profesyonel ürünlerle." },
    { id: "keratin",   name: "Keratin & Botoks Bakımı", price: 5000,  duration: 150, icon: "sparkle", image: "assets/img/service-keratin.jpg",
      desc: "Elektriklenmeyi ve kabarmayı önleyen, saça parlaklık ve yumuşaklık kazandıran yoğun bakım." },
    { id: "manikur",   name: "Manikür & Pedikür",       price: 1500,  duration: 90,  icon: "nail", image: "assets/img/gallery-2.jpg",
      desc: "Tırnak bakımı, şekillendirme, nasır ve kütikül temizliği. Dilerseniz kalıcı oje ile tamamlanır." },
    { id: "cilt",      name: "Cilt Bakımı",             price: 2000,  duration: 60,  icon: "spa", image: "assets/img/gallery-4.jpg",
      desc: "Cilt analizi sonrası derin temizlik, peeling, maske ve nemlendirme ile ışıltılı bir cilt." },
    { id: "kas-kirpik",name: "Kaş & Kirpik Tasarımı",   price: 1200,  duration: 60,  icon: "lash", image: "assets/img/gallery-5.jpg",
      desc: "Kaş laminasyon, kaş şekillendirme ve kirpik lifting ile bakışlarınızı belirginleştirin." },
    { id: "makyaj",    name: "Profesyonel Makyaj",      price: 2500,  duration: 60,  icon: "brush", image: "assets/img/gallery-3.jpg",
      desc: "Davet, nişan ve özel günleriniz için cilt tipinize ve kıyafetinize uygun kalıcı makyaj." },
    { id: "gelin",     name: "Gelin Paketi",            price: 25000, duration: 300, icon: "crown", image: "assets/img/gallery-6.jpg", featured: true,
      desc: "Deneme dahil gelin saçı ve makyajı, cilt bakımı, manikür ve kaş tasarımı. En özel gününüz için." },
  ],

  team: [
    { id: "elif",   name: "Elif Yıldız",   role: "Kurucu & Saç Tasarımcısı", exp: "15 yıl",
      photo: "assets/img/team-1.jpg",
      skills: ["Gelin Saçı", "Kesim & Fön"] },
    { id: "selin",  name: "Selin Arslan",  role: "Renk Uzmanı",              exp: "10 yıl",
      photo: "assets/img/team-2.jpg",
      skills: ["Balyaj", "Keratin Bakımı"] },
    { id: "zeynep", name: "Zeynep Kaya",   role: "Cilt Bakım Uzmanı",        exp: "8 yıl",
      photo: "assets/img/team-3.jpg",
      skills: ["Cilt Bakımı", "Peeling"] },
    { id: "merve",  name: "Merve Demir",   role: "Tırnak Tasarımcısı",       exp: "7 yıl",
      photo: "assets/img/team-4.jpg",
      skills: ["Manikür & Pedikür", "Nail Art"] },
    { id: "busra",  name: "Büşra Çelik",   role: "Kaş & Kirpik Uzmanı",      exp: "6 yıl",
      photo: "assets/img/team-5.jpg",
      skills: ["Kaş Laminasyon", "Kirpik Lifting"] },
    { id: "derya",  name: "Derya Aksoy",   role: "Makyaj Artisti",           exp: "9 yıl",
      photo: "assets/img/team-6.jpg",
      skills: ["Gelin Makyajı", "Davet Makyajı"] },
  ],

  gallery: [
    { src: "assets/img/gallery-1.jpg", alt: "Fön ve şekillendirme" },
    { src: "assets/img/gallery-2.jpg", alt: "Nail art" },
    { src: "assets/img/gallery-3.jpg", alt: "Göz makyajı" },
    { src: "assets/img/gallery-4.jpg", alt: "Cilt bakımı" },
    { src: "assets/img/gallery-5.jpg", alt: "Kaş tasarımı" },
    { src: "assets/img/gallery-6.jpg", alt: "Sonuç" },
    { src: "assets/img/gallery-7.jpg", alt: "Kalıcı oje" },
    { src: "assets/img/gallery-8.jpg", alt: "Makyaj fırçaları" },
  ],

  heroImage:  "assets/img/gallery-6.jpg",          // Kemerli büyük görsel
  heroCards:  ["assets/img/gallery-1.jpg", "assets/img/gallery-2.jpg"],   // Yüzen küçük kartlar
  heroAvatars:["assets/img/team-1.jpg", "assets/img/team-2.jpg", "assets/img/team-3.jpg", "assets/img/team-5.jpg"],
  aboutImage: "assets/img/about-1.jpg",
  aboutImage2:"assets/img/about-2.jpg",
  experienceImage: "assets/img/experience.jpg",

  reviews: [
    { name: "Ayşe K.", text: "Balyajımı Selin Hanım yaptı, tam istediğim ton. Saçım hiç yıpranmadı, üstelik randevuya zamanında alındım. Artık başka yere gitmiyorum.", rating: 5 },
    { name: "Zeynep T.", text: "Düğünümde gelin paketini aldım; deneme gününden itibaren her şey çok profesyoneldi. Makyajım gece boyunca bozulmadı.", rating: 5 },
    { name: "Elif M.", text: "Cilt bakımından sonra cildim resmen nefes aldı. Salon çok ferah ve temiz, kahve ikramıyla kendimi evimde gibi hissediyorum.", rating: 5 },
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
