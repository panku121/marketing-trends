/**
 * Bound to the marketingAIuses spreadsheet.
 * Open that sheet, then Extensions > Apps Script, paste this file, and deploy as a Web app.
 * Execute as: Me. Who has access: Anyone.
 */
const SHEET_NAME = 'marketingAI';
const HEADERS = ['Submitted at', 'Name', 'Email', 'AI usage (%)', 'Tools used', 'Other tools', 'Plan type', 'Use cases', 'Paid amount', 'Currency'];
const IDENTITY_HEADERS = ['Submitted at', 'Name', 'Email', 'AI usage (%)', 'Tools used', 'Other tools', 'Plan type', 'Use cases'];
const PREVIOUS_HEADERS = ['Submitted at', 'AI usage (%)', 'Tools used', 'Other tools', 'Plan type', 'Use cases'];
const CURRENCIES = ['USD', 'EUR', 'GBP', 'INR', 'AED', 'SGD', 'AUD', 'CAD', 'JPY'];

function doGet() {
  return reply_({ ok: true, sheet: SHEET_NAME });
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData && e.postData.contents ? e.postData.contents : '{}');
    const name = clean_(data.userName, 80);
    const email = clean_(data.userEmail, 120).toLowerCase();
    const otherName = clean_(data.otherTools, 200);
    const plan = clean_(data.planType, 50);
    const paid = plan === 'Paid tools';
    const amountText = clean_(data.paidAmount, 20);
    const amount = Number(amountText);
    const currency = clean_(data.currency, 8).toUpperCase();
    const choseOther = Array.isArray(data.tools) && data.tools.indexOf('Other') !== -1;
    if (!data || !name || !isEmail_(email) || !Array.isArray(data.tools) || !data.tools.length || (choseOther && !otherName) || !String(data.useCases || '').trim()) {
      return reply_({ ok: false, error: 'Invalid submission.' });
    }
    if (paid && (!/^\d+(\.\d+)?$/.test(amountText) || !Number.isFinite(amount) || amount > 99999999 || CURRENCIES.indexOf(currency) === -1)) {
      return reply_({ ok: false, error: 'Invalid amount.' });
    }
    const usage = Number(data.aiUsagePercent);
    if (!Number.isFinite(usage) || usage < 0 || usage > 100) return reply_({ ok: false, error: 'Invalid percentage.' });
    const sheet = getSheet_();
    sheet.appendRow([new Date(), name, email, usage, data.tools.join(', '), otherName, plan, clean_(data.useCases, 700), paid ? amount : '', paid ? currency : '']);
    if (paid) {
      const decimals = amountText.indexOf('.') === -1 ? 0 : amountText.split('.')[1].length;
      sheet.getRange(sheet.getLastRow(), 9).setNumberFormat(decimals ? '0.' + '0'.repeat(decimals) : '0');
    }
    return reply_({ ok: true });
  } catch (error) {
    console.error(error);
    return reply_({ ok: false, error: 'Unable to save submission.' });
  }
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    return sheet;
  }
  const width = Math.max(sheet.getLastColumn(), HEADERS.length, IDENTITY_HEADERS.length, PREVIOUS_HEADERS.length);
  const current = sheet.getRange(1, 1, 1, width).getValues()[0].map(String);
  if (current.slice(0, HEADERS.length).join('|') === HEADERS.join('|')) return sheet;
  if (current.slice(0, PREVIOUS_HEADERS.length).join('|') === PREVIOUS_HEADERS.join('|') && current.slice(0, IDENTITY_HEADERS.length).join('|') !== IDENTITY_HEADERS.join('|')) {
    sheet.insertColumnsAfter(1, 2);
  }
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  return sheet;
}

function isEmail_(value) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); }

function clean_(value, maxLength) { return String(value || '').trim().slice(0, maxLength); }
function reply_(body) { return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON); }
