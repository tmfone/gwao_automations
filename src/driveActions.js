/* global   APIBOA
            debugInfo
*/

const folderProcessingMap = {
  '10balkKoS1rEazbIKFaEFqUcwv1aFbtKW': {
    'executingFolderId': '10balkKoS1rEazbIKFaEFqUcwv1aFbtKW',
    'archivingFolderId': '14VglHG-LGnIEYL5iViDnUhr82CIzxO-e',
    'actions': ['stageFinDocument']
  }
};

/* exported processFolderActions */
function processFolderActions() {
  if (!folderProcessingMap) {
    debugInfo('No folderProcessingMap set');
  }
  Object.keys(folderProcessingMap).forEach((folder) => {
    debugInfo(folder);
    folderProcessingMap[folder].actions.forEach((action) => {
      if (action === 'stageFinDocument') {
        processAccountingInboxFolderStageFinDocument(
          folderProcessingMap[folder]
        );
      }
    });
  });
}
function processAccountingInboxFolderStageFinDocument(folderToProcess) {
  const botAcctInbox = folderToProcess.executingFolderId;
  const botAcctInboxArchive = folderToProcess.archivingFolderId;
  const folder = DriveApp.getFolderById(botAcctInbox);
  const archiveFolder = DriveApp.getFolderById(botAcctInboxArchive);
  if (!folder) {
    debugInfo('No botAcctInbox set');
    return;
  }
  if (!archiveFolder) {
    debugInfo('No botAcctInboxArchive set');
    return;
  }
  const files = folder.getFiles();

  while (files.hasNext()) {
    const file = files.next();
    let fileName = file.getName();

    if (!isValidDate(fileName.substring(0, 8))) {
      var creationDate = Utilities.formatDate(
        file.getDateCreated(),
        'GMT',
        'yyyyMMdd'
      );
      file.setName(creationDate + '_' + fileName);
      fileName = file.getName();
    }
    // Upload to Accounting Software
    const fileContentBase64 = Utilities.base64Encode(file.getBlob().getBytes());
    if (
      APIBOA.v1FinanceDocumentsStageFinDocument(
        fileName,
        file.getMimeType(),
        fileContentBase64
      )
    ) {
      file.moveTo(archiveFolder);
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
