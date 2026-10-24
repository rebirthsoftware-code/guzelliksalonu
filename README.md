# ELARA — Kadınlara Özel Güzellik Salonu Web Sitesi & Randevu Sistemi

Güzellik salonları için tasarlanmış, **GitHub Pages üzerinde ücretsiz çalışan**
web sitesi ve online randevu sistemi. Sunucu, veritabanı ya da hosting gerektirmez;
tüm site statik HTML/CSS/JS dosyalarından oluşur.

## Özellikler

**Web sitesi (`index.html`)**
- Tam ekran hero, istatistikler, kayan bant
- Hizmetler ve fiyat listesi (saç, renk, keratin, manikür & pedikür, cilt bakımı, kaş & kirpik, makyaj, gelin paketi)
- Hakkımızda, deneyim bandı, uzman ekip kartları, galeri, misafir yorumları, çalışma saatleri
- Sabit WhatsApp butonu, mobil uyumlu menü, kaydırma animasyonları

**Randevu sistemi (`randevu.html`)**
- 5 adımlı akış: hizmet(ler) → uzman → tarih & saat → bilgiler → onay
- Çalışma saatlerine, tatil günlerine ve mevcut randevulara göre **gerçek boş saat hesaplama**
- "Fark etmez" seçeneğiyle ilk müsait uzmanın otomatik atanması
- Onay kodu, WhatsApp ile bildirim, Google Takvim ve .ics dosyası

**Yönetim paneli (`yonetim.html`)**
- PIN ile giriş
- Günlük / haftalık liste ve uzman bazlı **zaman çizelgesi** görünümü
- Durum yönetimi (beklemede, onaylandı, tamamlandı, iptal), arama, filtre
- Misafire tek tıkla WhatsApp mesajı, CSV dışa aktarma

## Hızlı Başlangıç

1. Bu depoyu GitHub'a gönderin.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions** seçin.
3. `main` dalına yapılan her push'ta site otomatik yayınlanır:
   `https://<kullanıcı>.github.io/<depo-adı>/`

İsterseniz **Source: Deploy from a branch** → `main` / `(root)` da seçebilirsiniz;
site derleme gerektirmediği için bu da çalışır.

## İçeriği Düzenleme

Tüm içerik tek dosyadan yönetilir: [`assets/js/config.js`](assets/js/config.js)

| Alan | Açıklama |
| --- | --- |
| `brand` | İşletme adı, slogan, kuruluş yılı, açıklama |
| `contact` | Telefon, WhatsApp numarası, e-posta, adres, harita ve sosyal medya linkleri |
| `hours` / `hoursLabel` | Günlük çalışma saatleri (randevu hesabında kullanılır) ve sitede gösterilen metin |
| `holidays` | Randevuya kapalı özel günler |
| `booking` | Saat dilimi aralığı, kaç gün ileriye randevu alınabileceği, en az kaç dakika sonrası |
| `services` | Hizmet adı, fiyat, süre, açıklama, ikon |
| `team` | Uzmanlar, fotoğraf, unvan, deneyim |
| `gallery`, `reviews`, `stats` | Galeri görselleri, yorumlar, sayılar |
| `admin.pin` | Yönetim paneli PIN kodu |
| `api` | Google Sheets arka ucu adresi (aşağıya bakın) |

Kullanılabilir hizmet ikonları: `dryer`, `scissors`, `drop`, `sparkle`, `nail`, `spa`,
`flower`, `lash`, `brush`, `crown`.

Fotoğraflar şu an Unsplash'ten örnek görsellerdir. Kendi fotoğraflarınızı
`assets/img/` klasörüne koyup `config.js` içindeki adresleri değiştirmeniz yeterli.

## Randevu Verileri Nerede Tutulur?

| Mod | Nasıl? | Ne zaman? |
| --- | --- | --- |
| **Yerel** (varsayılan) | Tarayıcının hafızasında (`localStorage`). Misafir randevu alır, WhatsApp ile salona bildirir. | Demo, tanıtım, tek cihaz |
| **Google Sheets** | `api.url` doluysa randevular Google Apps Script üzerinden bir Sheets tablosuna yazılır. Tüm cihazlardan görünür, çakışma kontrolü sunucuda yapılır. | Gerçek kullanım |

Google Sheets kurulumu 5 dakika sürer ve ücretsizdir:
[`backend/google-apps-script/README.md`](backend/google-apps-script/README.md)

## Dosya Yapısı

```
├── index.html                 Ana sayfa
├── randevu.html               Randevu alma
├── yonetim.html               Yönetim paneli
├── assets/
│   ├── css/style.css          Tüm stiller
│   ├── js/config.js           İçerik ve ayarlar  ← burayı düzenleyin
│   ├── js/store.js            Randevu veri katmanı (yerel / uzak)
│   ├── js/main.js             Ortak arayüz, ana sayfa
│   ├── js/booking.js          Randevu akışı
│   └── js/admin.js            Yönetim paneli
├── backend/google-apps-script Google Sheets arka ucu
└── .github/workflows          GitHub Pages dağıtımı
```

## Yerelde Çalıştırma

Herhangi bir statik sunucu yeterlidir:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Güvenlik Notu

Yönetim paneli PIN'i ve API token'ı sitenin kaynak kodunda görünür. Bu, rastgele
ziyaretçileri uzak tutar fakat gerçek bir kimlik doğrulama değildir. Randevu verisi
hassas hale geldiğinde Apps Script tarafında ek kontroller eklenmesi önerilir.
