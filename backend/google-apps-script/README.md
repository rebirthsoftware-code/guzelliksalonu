# Google Sheets Arka Ucu

Site tamamen statik (GitHub Pages) çalıştığı için randevular varsayılan olarak
tarayıcının yerel hafızasında tutulur. Bu, demo ve tek cihaz kullanımı için
yeterlidir; fakat salon bilgisayarı ile müşterilerin telefonları arasında veri
paylaşılmaz.

Gerçek kullanım için `Code.gs` dosyasını Google Apps Script olarak yayınlayın.
Randevular bir Google Sheets tablosuna yazılır, tüm cihazlardan görünür ve
çakışma kontrolü sunucu tarafında yapılır. Ücretsizdir, sunucu gerektirmez.

## Adımlar

1. [sheets.new](https://sheets.new) adresinden boş bir tablo oluşturun.
2. **Uzantılar → Apps Script** menüsünü açın, açılan editördeki içeriği silip
   `Code.gs` dosyasının içeriğini yapıştırın.
3. En üstteki `TOKEN` değerini rastgele, uzun bir metinle değiştirin.
4. **Dağıt → Yeni dağıtım** → Tür: **Web uygulaması**
   - Çalıştıran: **Ben**
   - Erişimi olanlar: **Herkes**
5. İzinleri onaylayın ve çıkan **Web uygulaması URL**'sini kopyalayın.
6. Sitede `assets/js/config.js` dosyasını açın:

   ```js
   api: {
     url: "https://script.google.com/macros/s/....../exec",
     token: "TOKEN ile aynı metin",
   },
   ```

7. Değişikliği GitHub'a gönderin. Site yeniden yayınlandığında yönetim panelinde
   "Google Sheets bağlı" etiketi görünür.

## Notlar

- `Code.gs` içinde değişiklik yaparsanız **Dağıtımı yönet → Düzenle → Sürüm: Yeni**
  diyerek yeniden yayınlamanız gerekir; aksi halde eski kod çalışmaya devam eder.
- `TOKEN`, sitenin kaynak kodunda görünür. Bu, rastgele botların tabloya yazmasını
  engeller fakat kararlı birini durdurmaz. Daha güçlü koruma gerekirse Apps Script
  tarafında istek sayısı sınırı eklenebilir veya randevu oluşturma e-posta
  doğrulamasına bağlanabilir.
- Tabloyu elle de düzenleyebilirsiniz; `status` sütununa `beklemede`, `onaylandi`,
  `tamamlandi` veya `iptal` yazın.
