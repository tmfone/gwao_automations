/* global getUserProperty
          getLabelArray
          botLabelKey 
          debugInfo
*/

const labelActionMapKey = 'labelActions';

/* exported processLabelActions */
function processLabelActions() {
  const botLabelName = getUserProperty(botLabelKey);
  const botLabel = GmailApp.getUserLabelByName(botLabelName);
  if (!botLabel) {
    debugInfo('No botLabel set');
  }
  const labelProcessingMap = JSON.parse(getUserProperty(labelActionMapKey));
  if (!labelProcessingMap) {
    debugInfo('No labelProcessingMap set');
  }
  let processedMails = 0;
  Object.keys(labelProcessingMap).forEach((label) => {
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
            labelProcessingMap[label].folderId,
            labelProcessingMap[label].fileTypes
          );
        }
      });
    });
  });
  debugInfo(processedMails + ' Mail(s) processed!');
}

function storeAttachements(m, botLabel, folderId, fileTypes) {
  const date = m.getDate();
  const formattedDate =
    date.getFullYear().toString() +
    (date.getMonth() + 1).toString().padStart(2, '0') +
    date.getDate().toString().padStart(2, '0');
  let senderDomain = '';
  if (m.getReplyTo()) {
    senderDomain = String(m.getReplyTo())
      .split('@')[1]
      .split('.')
      .slice(-2, -1)[0];
  } else {
    senderDomain = String(m.getFrom())
      .split('@')[1]
      .split('.')
      .slice(-2, -1)[0];
  }
  const saveToFolder = DriveApp.getFolderById(folderId);
  const attachments = m.getAttachments();
  attachments.forEach((a) => {
    if (fileTypes.includes(a.getName().split('.').pop())) {
      // save attachment
      // filename format: <date>_<senderDomain>_<originalFilename>
      saveToFolder
        .createFile(a.copyBlob())
        .setName(formattedDate + '_' + senderDomain + '_' + a.getName());
      // saveToFolder.createFile(a.copyBlob()).setName(a.getName());
    } else {
      // skip attachment
      debugInfo('Skipped unsupported type: ' + a.getContentType());
    }
  });
  m.markRead();
  m.getThread().addLabel(botLabel);
  return 1;
}
