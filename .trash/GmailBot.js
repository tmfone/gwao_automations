/* OBSOLETE */
/*
const botLabelName = 'Bot';

const accountingFolderId = '10balkKoS1rEazbIKFaEFqUcwv1aFbtKW';
const dmarcFolderId = '1Yeg_DsJ0ZYTS85uvBBn46D5NY2Cfxzn3';

const processingMap = {
  'Finance': accountingFolderId,
  'DMARC': dmarcFolderId
};

function processLabels() {
  var botLabel = GmailApp.getUserLabelByName(botLabelName);
  var processedMails = 0;
  Object.keys(processingMap).forEach((label) => {
    var threads = GmailApp.search('label:' + label + ' !label:' + botLabelName);
    threads.forEach((t) => {
      var messageLabels = getLabelArray(t.getLabels());
      var messages = GmailApp.getMessagesForThread(t);
      messages.forEach((m) => {
        // it's not necessary to check again for label "Bot" but just to be sure
        if (!messageLabels.includes(botLabel.getName())) {
          processedMails += storeAttachements(m, processingMap[label]);
        }
      });
    });
  });
  debugInfo(processedMails + ' Mail(s) processed!');
}

function storeAttachements(m, folderId) {
  const botLabel = GmailApp.getUserLabelByName(botLabelName);
  const saveToFolder = DriveApp.getFolderById(folderId);
  const attachments = m.getAttachments();
  attachments.forEach((a) => {
    if (
      (a.getContentType() == 'application/octet-stream' &&
        a.getName().endsWith('.pdf')) ||
      a.getContentType() == 'application/pdf' ||
      a.getContentType() == 'application/gzip' ||
      a.getContentType() == 'application/zip'
    ) {
      // save attachment
      saveToFolder.createFile(a.copyBlob()).setName(a.getName());
    } else {
      // skip attachment
      debugInfo('Skipped unsupported type: ' + a.getContentType());
    }
  });
  m.markRead();
  m.getThread().addLabel(botLabel);
  return 1;
}
*/
