/* global buildInfoCard, trsl, constMap, debugInfo */

/* exported getDriveCard */
function getDriveCard(context) {
  debugInfo(context);
  debugInfo(context.drive);
  const processAction = CardService.newAction().setFunctionName(
    'processFolderActions'
  );
  const driveCardButton = CardService.newTextButton()
    .setText(trsl('tExecuteFolderActions'))
    .setOnClickAction(processAction);

  const driveCardHeader = CardService.newCardHeader()
    .setTitle(trsl('tDriveActions'))
    .setImageUrl(
      'https://www.gstatic.com/images/icons/material/system/1x/settings_black_48dp.png'
    )
    .setImageStyle(CardService.ImageStyle.CIRCLE);

  const driveCardSection1 =
    CardService.newCardSection().addWidget(driveCardButton);

  const card = CardService.newCardBuilder()
    .setHeader(driveCardHeader)
    .addSection(driveCardSection1)
    .build();
  return card;

  /*
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
  */
}

/* exported getFolderSettingsCard */
function getFolderSettingsCard(context) {
  return buildInfoCard({
    text: trsl('tFolderActionsUnsupported')
  });
}

/* exported folderLabelChange */
function folderLabelChange(e) {
  debugInfo(e);
}
