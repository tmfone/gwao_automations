/* global getUserProperty, getLabelArray, botLabelKey */
/* exported processLabels */
const labelActionMapKey = 'labelActions';

function processLabels() {
  const botLabelName = getUserProperty(botLabelKey);
  const botLabel = GmailApp.getUserLabelByName(botLabelName);
  if (!botLabel) {
    console.log('No botLabel set');
  }
  const processingMap = JSON.parse(getUserProperty(labelActionMapKey));
  if (!processingMap) {
    console.log('No processingMap set');
  }
  let processedMails = 0;
  Object.keys(processingMap).forEach((label) => {
    const threads = GmailApp.search(
      'label:' + label + ' !label:' + botLabelName
    );
    threads.forEach((t) => {
      const messageLabels = getLabelArray(t.getLabels());
      const messages = GmailApp.getMessagesForThread(t);
      messages.forEach((m) => {
        // it's not necessary to check again for label "Bot" but just to be sure
        if (!messageLabels.includes(botLabel.getName())) {
          processedMails += storeAttachements(
            m,
            botLabel,
            processingMap[label].folderId,
            processingMap[label].fileTypes
          );
        }
      });
    });
  });
  console.log(processedMails + ' Mail(s) processed!');
}

function storeAttachements(m, botLabel, folderId, fileTypes) {
  const saveToFolder = DriveApp.getFolderById(folderId);
  const attachments = m.getAttachments();
  attachments.forEach((a) => {
    if (fileTypes.includes(a.getName().split('.').pop())) {
      // save attachment
      saveToFolder.createFile(a.copyBlob()).setName(a.getName());
    } else {
      // skip attachment
      console.log('Skipped unsupported type: ' + a.getContentType());
    }
  });
  m.markRead();
  m.getThread().addLabel(botLabel);
  return 1;
}
