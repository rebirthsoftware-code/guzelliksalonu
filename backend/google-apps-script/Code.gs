/**
 * ELARA Randevu Sistemi — Google Apps Script Arka Ucu
 * ------------------------------------------------------------------------
 * Randevuları bir Google Sheets tablosunda saklar. Site GitHub Pages gibi
 * statik bir ortamda çalıştığı için sunucu tarafı kodu burada yaşar.
 *
 * KURULUM
 * 1. https://sheets.new adresinden boş bir tablo açın.
 * 2. Uzantılar > Apps Script menüsüne girin, bu dosyanın içeriğini yapıştırın.
 * 3. Aşağıdaki TOKEN değerini rastgele uzun bir metinle değiştirin.
 * 4. Dağıt > Yeni dağıtım > Tür: Web uygulaması
 *      - Çalıştıran: Ben
 *      - Erişim: Herkes (anonim)
 *    "Dağıt" deyin ve çıkan Web uygulaması URL'sini kopyalayın.
 * 5. Sitedeki assets/js/config.js içinde api.url = URL, api.token = TOKEN yazın.
 *
 * Kodu her değiştirdiğinizde "Dağıtımı yönet > Düzenle > Yeni sürüm" ile
 * yeniden yayınlamanız gerekir.
 */

var TOKEN = "BURAYA-GIZLI-BIR-ANAHTAR-YAZIN";
var SHEET_NAME = "Randevular";
var HEADERS = ["id", "code", "status", "createdAt", "updatedAt", "date", "time", "duration", "price",
               "name", "phone", "note", "services", "serviceNames", "barberId", "barberName", "source"];

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }
  return sh;
}

function out_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function rowToObj_(row) {
  var o = {};
  HEADERS.forEach(function (h, i) { o[h] = row[i]; });
  o.duration = Number(o.duration) || 0;
  o.price = Number(o.price) || 0;
  o.services = o.services ? String(o.services).split("|") : [];
  if (o.date instanceof Date) o.date = Utilities.formatDate(o.date, "Europe/Istanbul", "yyyy-MM-dd");
  if (o.time instanceof Date) o.time = Utilities.formatDate(o.time, "Europe/Istanbul", "HH:mm");
  return o;
}

function objToRow_(o) {
  return HEADERS.map(function (h) {
    if (h === "services") return (o.services || []).join("|");
    var v = o[h];
    return v === undefined || v === null ? "" : v;
  });
}

function readAll_() {
  var sh = sheet_();
  var last = sh.getLastRow();
  if (last < 2) return [];
  var values = sh.getRange(2, 1, last - 1, HEADERS.length).getValues();
  var list = [];
  values.forEach(function (r, i) {
    if (!r[0]) return;
    var o = rowToObj_(r);
    o._row = i + 2;
    list.push(o);
  });
  return list;
}

function doGet(e) {
  var p = (e && e.parameter) || {};
  if (p.token !== TOKEN) return out_({ ok: false, error: "Yetkisiz istek" });
  if (p.action !== "list") return out_({ ok: false, error: "Bilinmeyen işlem" });

  var list = readAll_().filter(function (a) {
    if (p.date && a.date !== p.date) return false;
    if (p.from && a.date < p.from) return false;
    if (p.to && a.date > p.to) return false;
    return true;
  }).map(function (a) { delete a._row; return a; });

  list.sort(function (a, b) { return (a.date + a.time).localeCompare(b.date + b.time); });
  return out_({ ok: true, data: list });
}

function doPost(e) {
  var body;
  try { body = JSON.parse(e.postData.contents); } catch (err) { return out_({ ok: false, error: "Geçersiz istek" }); }
  if (body.token !== TOKEN) return out_({ ok: false, error: "Yetkisiz istek" });

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    if (body.action === "create") {
      var a = body.appointment || {};
      if (!a.id || !a.date || !a.time || !a.barberId) return out_({ ok: false, error: "Eksik alan" });

      // Çakışma kontrolü: aynı uzman, aynı gün, kesişen saat aralığı
      var s1 = toMin_(a.time), e1 = s1 + Number(a.duration || 0);
      var clash = readAll_().some(function (x) {
        if (x.date !== a.date || x.barberId !== a.barberId || x.status === "iptal") return false;
        var s2 = toMin_(x.time), e2 = s2 + x.duration;
        return s1 < e2 && e1 > s2;
      });
      if (clash) return out_({ ok: false, error: "Bu saat az önce dolu. Lütfen başka bir saat seçin." });

      sheet_().appendRow(objToRow_(a));
      return out_({ ok: true, data: a });
    }

    if (body.action === "update") {
      var target = readAll_().filter(function (x) { return x.id === body.id; })[0];
      if (!target) return out_({ ok: false, error: "Randevu bulunamadı" });
      var merged = Object.assign({}, target, body.patch || {}, { updatedAt: new Date().toISOString() });
      var row = merged._row; delete merged._row;
      sheet_().getRange(row, 1, 1, HEADERS.length).setValues([objToRow_(merged)]);
      return out_({ ok: true, data: merged });
    }

    if (body.action === "delete") {
      var t = readAll_().filter(function (x) { return x.id === body.id; })[0];
      if (!t) return out_({ ok: false, error: "Randevu bulunamadı" });
      sheet_().deleteRow(t._row);
      return out_({ ok: true, data: true });
    }

    return out_({ ok: false, error: "Bilinmeyen işlem" });
  } finally {
    lock.releaseLock();
  }
}

function toMin_(t) {
  var p = String(t).split(":");
  return Number(p[0]) * 60 + Number(p[1] || 0);
}
