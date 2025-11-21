/**
 * Google Apps Script to handle form submissions from Nalvia website.
 * 
 * INSTRUCTIONS:
 * 1. Go to https://script.google.com/
 * 2. Click "New Project"
 * 3. Paste this code into the editor (Code.gs)
 * 4. Save the project (e.g., "Nalvia Form Handler")
 * 5. Click "Deploy" -> "New deployment"
 * 6. Select type: "Web app"
 * 7. Description: "Contact Form"
 * 8. Execute as: "Me"
 * 9. Who has access: "Anyone" (Important!)
 * 10. Click "Deploy"
 * 11. Copy the "Web app URL"
 * 12. Paste the URL into `components/ContactForm.js` in the `GOOGLE_SCRIPT_URL` variable.
 * 
 * SETUP SHEET:
 * 1. Create a new Google Sheet.
 * 2. Rename the first sheet (tab) to "Leads" (optional, script uses active sheet by default).
 * 3. Add headers in the first row: Timestamp, Name, Email, Phone, Message.
 */

function doPost(e) {
    var lock = LockService.getScriptLock();
    lock.tryLock(10000);

    try {
        var doc = SpreadsheetApp.openById("YOUR_SPREADSHEET_ID_HERE"); // Optional: Specify ID if not bound to container
        // OR just use the active spreadsheet if you create the script FROM the sheet (Extensions > Apps Script)
        // For standalone script, use openById. For bound script, use getActiveSpreadsheet().

        // Let's assume the user creates the script from the sheet or we just use a standalone script that creates a new sheet?
        // Simplest is: User creates a Sheet, then Extensions > Apps Script.

        var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

        var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
        var nextRow = sheet.getLastRow() + 1;

        var newRow = headers.map(function (header) {
            if (header === 'Timestamp') return new Date();
            // Map form fields to headers (case insensitive matching or direct mapping)
            // Our form sends: name, email, phone, message
            var key = header.toLowerCase();
            if (e.parameter[key]) return e.parameter[key];
            return '';
        });

        // If headers aren't set up, just append what we have
        if (headers.length === 0 || headers[0] === "") {
            sheet.appendRow([new Date(), e.parameter.name, e.parameter.email, e.parameter.phone, e.parameter.message]);
        } else {
            sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);
        }

        return ContentService
            .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
            .setMimeType(ContentService.MimeType.JSON);
    }

    catch (e) {
        return ContentService
            .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
            .setMimeType(ContentService.MimeType.JSON);
    }

    finally {
        lock.releaseLock();
    }
}
