# Instagram Story Görseli

`story.html` dosyası 1080×1920 boyutunda tasarlanmış story şablonudur.
Metinleri ya da telefon ekran görüntülerini değiştirdikten sonra yeniden
render etmek için:

```bash
cd marketing/instagram-story
node -e "
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 2 });
  await p.goto('file://' + process.cwd() + '/story.html', { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
  await p.screenshot({ path: 'story-2x.png' });
  await b.close();
})();"
```

- `story-1080x1920.png`: Instagram için standart boyut
- `story-2x.png`: Yüksek çözünürlüklü sürüm (2160×3840)
- `phone-*.png`: Sitenin telefon ekran görüntüleri (mockup içinde kullanılır)
