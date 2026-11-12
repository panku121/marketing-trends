# AI Pulse — Marketing AI Usage Survey

A standalone, responsive HTML/CSS/JavaScript survey. Open `index.html` in a browser to preview it.

## Connect Google Sheets

1. Create a Google Sheet. Its ID is the part between `/d/` and `/edit` in its URL.
2. Open **Extensions → Apps Script** from that Sheet, paste in `google-apps-script.js`, and replace `PASTE_YOUR_GOOGLE_SHEET_ID_HERE` with the sheet ID.
3. Click **Deploy → New deployment → Web app**. Choose **Execute as: Me**. For an internal marketing survey, choose access for your organization (for example, “Anyone in [your organization]”). Authorize when Google asks.
4. Copy the Web App URL ending in `/exec` into `config.js` as `GOOGLE_APPS_SCRIPT_URL`.
5. Deploy the website on your approved internal host or open `index.html` locally for a preview.

The spreadsheet will receive these columns automatically:

`Submitted at` · `AI usage (%)` · `Tools used` · `Other tools` · `Plan type` · `Use cases`

## Notes on browser submission

The frontend sends a `text/plain` POST with `no-cors`. This is deliberate: Apps Script Web Apps commonly redirect requests cross-origin, and `no-cors` avoids a browser preflight failure. The browser therefore cannot read the response, but the success state means the request was handed to the browser. Validation happens both in the form and in Apps Script.

No passwords, API keys, or Sheet IDs beyond the non-secret URL configuration should be placed in frontend files. Restrict Web App access to your organization where possible.
