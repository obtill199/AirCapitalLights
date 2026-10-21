/**
 * Air Capital Lights booking endpoint.
 * Receives the website's booking form, adds a row to a Google Sheet, and emails you.
 *
 * 1. Go to script.google.com, click New project, delete the starter code, paste this file.
 * 2. Pick `setup` in the function menu and click Run. Approve the permission prompt
 *    (it's your own Google account). The Execution log prints your Bookings sheet link.
 * 3. Click Deploy > New deployment > gear icon > Web app.
 *    Execute as: Me. Who has access: Anyone. Click Deploy and copy the Web app URL.
 * 4. Paste that URL into BOOKING_ENDPOINT near the bottom of index.html.
 */
const SHEET_NAME = 'Bookings';
const NOTIFY_EMAIL = ''; // blank = the Google account that deploys this script
const FIELDS = ['name', 'phone', 'email', 'address', 'lights', 'height', 'package',
  'extras', 'timing', 'neighbor', 'heard', 'notes', 'estimate'];

function doPost(e) {
  const p = (e && e.parameter) || {};
  if (p.website) return ContentService.createTextOutput('ok'); // spam bot filled the hidden field

  // A leading = + - @ would make Sheets treat the text as a formula.
  const clean = (v) => {
    const s = String(v || '').slice(0, 1000);
    return /^[=+\-@]/.test(s) ? "'" + s : s;
  };

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    getSheet_().appendRow([new Date()].concat(FIELDS.map((f) => clean(p[f]))));
  } finally {
    lock.releaseLock();
  }

  const to = NOTIFY_EMAIL || Session.getEffectiveUser().getEmail();
  MailApp.sendEmail(
    to,
    'New lights booking: ' + clean(p.name || 'no name'),
    FIELDS.map((f) => f + ': ' + clean(p[f])).join('\n')
  );
  return ContentService.createTextOutput('ok');
}

function setup() {
  const sheet = getSheet_();
  Logger.log('Bookings sheet: ' + sheet.getParent().getUrl());
}

function getSheet_() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty('SHEET_ID');
  let ss;
  if (id) {
    ss = SpreadsheetApp.openById(id);
  } else {
    ss = SpreadsheetApp.create('Air Capital Lights Bookings');
    ss.getSheets()[0].setName(SHEET_NAME);
    props.setProperty('SHEET_ID', ss.getId());
  }
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['received'].concat(FIELDS));
    sheet.setFrozenRows(1);
  }
  return sheet;
}
