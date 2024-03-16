/* global buildInfoCard, trsl, constMap, debugInfo */

/* exported getDriveCard */
function getDriveCard(context) {
  debugInfo(context);
  debugInfo(context.drive);
  if (context.drive.selectedItems && context.drive.selectedItems.length > 1) {
    return buildInfoCard({
      text: trsl('tSelectOnlyOne')
    });
  } else if (context.drive.selectedItems) {
    context.tItemSelected = true;
    context.tSelectedItem = context.drive.selectedItems[0];
    context.tSelType =
      context.tSelectedItem.mimeType == 'application/vnd.google-apps.folder'
        ? constMap.selFolder
        : constMap.selFile;
  }
  if (context.tItemSelected && context.tSelType == constMap.selFolder) {
    return getFolderSettingsCard(context);
  } else {
    return buildInfoCard({
      text: trsl('tSelectFolder')
    });
  }
}

function getFolderSettingsCard(context) {
  return buildInfoCard({
    text: trsl('tFolderActionsUnsupported')
  });
}

/* exported folderLabelChange */
function folderLabelChange(e) {
  debugInfo(e);
}
