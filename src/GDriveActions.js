/* exported processAccountingInboxFolder */
/* global   botAcctInboxKey 
            botAcctInboxArchiveKey
            getUserProperty
            uploadFileMiddleware
*/

function processAccountingInboxFolder() {
  const botAcctInbox = getUserProperty(botAcctInboxKey);
  const botAcctInboxArchive = getUserProperty(botAcctInboxArchiveKey);
  const folder = DriveApp.getFolderById(botAcctInbox);
  if (!folder) {
    console.log('No botAcctInbox set');
    return;
  }
  if (!botAcctInboxArchive) {
    console.log('No botAcctInboxArchive set');
    return;
  }
  const files = folder.getFiles();

  while (files.hasNext()) {
    const file = files.next();
    const fileName = file.getName();

    if (!isValidDate(fileName.substring(0, 8))) {
      var creationDate = Utilities.formatDate(
        file.getDateCreated(),
        'GMT',
        'yyyyMMdd'
      );
      file.setName(creationDate + '_' + fileName);
    }
    // Upload to Accounting Software
    const fileContentBase64 = Utilities.base64Encode(file.getBlob().getBytes());
    if (uploadFileMiddleware(fileName, file.getMimeType(), fileContentBase64)) {
      file.moveTo(botAcctInboxArchive);
    }
  }
}

function isValidDate(dateString) {
  const regEx = /^\d{4}\d{2}\d{2}$/;
  if (!dateString.match(regEx)) return false; // Invalid format
  const d = new Date(
    dateString.substring(0, 4),
    dateString.substring(4, 6) - 1,
    dateString.substring(6, 8),
    8,
    0,
    0
  );
  var dNum = d.getTime();
  if (!dNum || isNaN(dNum)) return false; // NaN value, Invalid date
  return d.toISOString().slice(0, 10).replace(/-/g, '') == dateString;
}
