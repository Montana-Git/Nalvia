/**
 * Google Apps Script to handle form submissions from Nalvia website.
 * 
 * INSTRUCTIONS:
 * 1. Open your Google Sheet.
 * 2. Copy the ID from the URL (the long string between /d/ and /edit).
 * 3. Paste it below where it says "PASTE_YOUR_SHEET_ID_HERE".
 * 4. Go to "Extensions" -> "Apps Script".
 * 5. Paste this entire code there.
 * 6. Click "Deploy" -> "New deployment".
 * 7. Select type: "Web app".
 * 8. Description: "Contact Form v2".
 * 9. Execute as: "Me".
 * 10. Who has access: "Anyone" (CRITICAL!).
 * 11. Click "Deploy".
 * 12. Copy the "Web app URL" and update it in your ContactForm.js file.
 */

// REPLACE THIS WITH YOUR ACTUAL GOOGLE SHEET ID
var SHEET_ID = "PASTE_YOUR_SHEET_ID_HERE";

function doPost(e) {
    var lock = LockService.getScriptLock();
    lock.tryLock(10000);

    try {
        // Open the spreadsheet by ID
        var doc = SpreadsheetApp.openById(SHEET_ID);
        var sheet = doc.getSheets()[0]; // Gets the first sheet

        var lastCol = sheet.getLastColumn();
        var headers = [];

        // Only try to get headers if there are columns
        if (lastCol > 0) {
            headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
        }

        var nextRow = sheet.getLastRow() + 1;
        var newRow = [];

        if (headers.length > 0) {
            newRow = headers.map(function (header) {
                if (header === 'Timestamp') return new Date();

                var key = header.toLowerCase();
                if (e.parameter[key]) return e.parameter[key];
                return '';
            });
        }

        if (headers.length === 0 || headers[0] === "") {
            // Fallback if no headers: Add headers first if empty, or just append data
            if (sheet.getLastRow() === 0) {
                sheet.appendRow(["Timestamp", "Name", "Email", "Phone", "Message"]);
                sheet.appendRow([new Date(), e.parameter.name, e.parameter.email, e.parameter.phone, e.parameter.message]);
            } else {
                sheet.appendRow([new Date(), e.parameter.name, e.parameter.email, e.parameter.phone, e.parameter.message]);
            }
        } else {
            sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);
        }

        return ContentService
            .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
            .setMimeType(ContentService.MimeType.JSON);
    }

    catch (e) {
        return ContentService
            .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }

    finally {
        lock.releaseLock();
    }
}
