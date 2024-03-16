/* global 
      botLabelKey
      getUserProperty
      labelActionMapKey
      trsl
      getLabelArray
      setUserProperty 
      debugInfo
*/

/* exported getGmailCard */
function getGmailCard(context) {
  debugInfo(context);
  const botLabelName = getUserProperty(botLabelKey);
  const cardHeader1 = CardService.newCardHeader()
    .setTitle(trsl('tConfigureYourActions'))
    .setImageUrl(
      'https://www.gstatic.com/images/icons/material/system/1x/settings_black_48dp.png'
    )
    .setImageStyle(CardService.ImageStyle.CIRCLE);

  const cardSection1SelectionAction = CardService.newSelectionInput()
    .setFieldName('actionInput')
    .setTitle(trsl('tActionInput'))
    .setType(CardService.SelectionInputType.DROPDOWN)
    .addItem(
      trsl('tActionDownloadAttachments'),
      'tActionDownloadAttachments',
      true
    )
    .setOnChangeAction(
      CardService.newAction().setFunctionName('actionInputChange')
    );

  const cardSection1TextParagraphLabel = CardService.newTextParagraph().setText(
    trsl('tPickLabel')
  );

  const userLabels = getLabelArray(GmailApp.getUserLabels()).sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: 'base' })
  );

  const cardSection1SelectionLabel = CardService.newSelectionInput()
    .setFieldName('gmailLabelInput')
    .setTitle(trsl('tGmailLabel'))
    .setType(CardService.SelectionInputType.DROPDOWN)
    .setOnChangeAction(
      CardService.newAction().setFunctionName('gmailLabelInputChange')
    );

  userLabels.forEach((userLabel) => {
    if (userLabel != botLabelName) {
      cardSection1SelectionLabel.addItem(userLabel, userLabel, false);
    }
  });

  const cardSection1TextParagraphFolder =
    CardService.newTextParagraph().setText(trsl('tPickFolder'));

  const cardSection1SelectionFolder = CardService.newTextInput()
    .setFieldName('folderIdInput')
    .setTitle(trsl('tFolderIdInput'))
    .setHint(trsl('tFolderIdInputHint'))
    .setOnChangeAction(
      CardService.newAction().setFunctionName('folderIdInputChange')
    );

  const cardSection1SelectionFileType = CardService.newSelectionInput()
    .setFieldName('fileTypeInput')
    .setTitle(trsl('tfileTypeInput'))
    .setType(CardService.SelectionInputType.CHECK_BOX)
    .addItem('pdf', 'pdf', true)
    .addItem('zip', 'zip', true)
    .addItem('gzip', 'gzip', true)
    .setOnChangeAction(
      CardService.newAction().setFunctionName('fileTypeInputChange')
    );

  const cardSection1ButtonList1Button1Action1 = CardService.newAction()
    .setFunctionName('addAction')
    .setParameters({});

  const cardSection1ButtonList1Button1 = CardService.newTextButton()
    .setText(trsl('tAddAction'))
    .setTextButtonStyle(CardService.TextButtonStyle.TEXT)
    .setOnClickAction(cardSection1ButtonList1Button1Action1);

  const cardSection1ButtonList1 = CardService.newButtonSet().addButton(
    cardSection1ButtonList1Button1
  );

  const cardSection1Divider1 = CardService.newDivider();

  const cardSection1 = CardService.newCardSection()
    .addWidget(cardSection1SelectionAction)
    .addWidget(cardSection1TextParagraphLabel)
    .addWidget(cardSection1SelectionLabel)
    .addWidget(cardSection1TextParagraphFolder)
    .addWidget(cardSection1SelectionFolder)
    .addWidget(cardSection1SelectionFileType)
    .addWidget(cardSection1ButtonList1)
    .addWidget(cardSection1Divider1);

  const cardSection2TextParagraph1 = CardService.newTextParagraph().setText(
    trsl('tConfiguredActions', '<b>')
  );

  let cardSection2 = CardService.newCardSection().addWidget(
    cardSection2TextParagraph1
  );

  const labelActions = JSON.parse(getUserProperty(labelActionMapKey));
  if (labelActions) {
    Object.keys(labelActions)
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
      .forEach((labelAction) => {
        cardSection2 = cardSection2.addWidget(
          CardService.newTextButton()
            .setText(labelAction)
            .setTextButtonStyle(CardService.TextButtonStyle.TEXT)
            .setOnClickAction(
              CardService.newAction()
                .setFunctionName('getActionCard')
                .setParameters({ labelAction })
            )
        );
      });
  }

  const card = CardService.newCardBuilder()
    .setHeader(cardHeader1)
    .addSection(cardSection1)
    .addSection(cardSection2)
    .build();
  return card;
}

/* exported getActionCard */
function getActionCard(e) {
  debugInfo(e);

  let labelAction = {};
  if (e.parameters.labelAction) {
    let labelActions = getUserProperty(labelActionMapKey);
    if (labelActions) {
      labelActions = JSON.parse(labelActions);
      labelAction = labelActions[e.parameters.labelAction];
    }
  }

  const cardHeader1 = CardService.newCardHeader()
    .setTitle(e.parameters.labelAction)
    .setImageUrl(
      'https://www.gstatic.com/images/icons/material/system/1x/settings_black_48dp.png'
    )
    .setImageStyle(CardService.ImageStyle.CIRCLE);

  let cardSectionFolderTextFolderName;
  try {
    const saveToFolder = DriveApp.getFolderById(labelAction.folderId);
    cardSectionFolderTextFolderName = CardService.newDecoratedText()
      .setText(saveToFolder.getName())
      .setBottomLabel(labelAction.folderId);
  } catch (e) {
    cardSectionFolderTextFolderName = CardService.newDecoratedText().setText(
      trsl('tFolderNotFound')
    );
  }

  const cardSectionFolder = CardService.newCardSection()
    .setHeader(trsl('tLabelActionFolderDesc'))
    .addWidget(cardSectionFolderTextFolderName);

  const cardSectionFileTypeTextParagraph1 =
    CardService.newTextParagraph().setText(
      JSON.stringify(labelAction.fileTypes)
    );
  const cardSectionFileType = CardService.newCardSection()
    .setHeader(trsl('tfileTypes'))
    .addWidget(cardSectionFileTypeTextParagraph1);

  const backAction = CardService.newAction().setFunctionName('closeActionCard');
  const backActionButton = CardService.newTextButton()
    .setText(trsl('tBack'))
    .setOnClickAction(backAction);

  const deleteAction = CardService.newAction()
    .setFunctionName('closeActionCard')
    .setParameters({
      'deleteLabel': 'true',
      'label': e.parameters.labelAction
    });
  const deleteActionButton = CardService.newTextButton()
    .setText(trsl('tDelete'))
    .setBackgroundColor('#FF0000')
    .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
    .setOnClickAction(deleteAction);

  const cardSection2ButtonList1 = CardService.newButtonSet()
    .addButton(backActionButton)
    .addButton(deleteActionButton);

  const cardSection2 = CardService.newCardSection().addWidget(
    cardSection2ButtonList1
  );

  const card = CardService.newCardBuilder()
    .setHeader(cardHeader1)
    .addSection(cardSectionFolder)
    .addSection(cardSectionFileType)
    .addSection(cardSection2)
    .build();

  const nav = CardService.newNavigation().pushCard(card);
  return CardService.newActionResponseBuilder().setNavigation(nav).build();
}
/* exported closeActionCard */
function closeActionCard(e) {
  debugInfo(e);
  if (e.parameters.label) {
    let labelActions = getUserProperty(labelActionMapKey);
    if (labelActions) {
      labelActions = JSON.parse(labelActions);
      delete labelActions[e.parameters.label];
      setUserProperty(labelActionMapKey, JSON.stringify(labelActions));
    }
  }
  const nav = CardService.newNavigation()
    .updateCard(getGmailCard(e))
    .popToRoot();
  return CardService.newActionResponseBuilder().setNavigation(nav).build();
}
/* exported gmailLabelInputChange */
function gmailLabelInputChange(e) {
  debugInfo(e);
}

/* exported folderIdInputChange */
function folderIdInputChange(e) {
  debugInfo(e);
}

/* exported actionInputChange */
function actionInputChange(e) {
  debugInfo(e);
}

/* exported fileTypeInputChange */
function fileTypeInputChange(e) {
  debugInfo(e);
}

/* exported addAction */
function addAction(e) {
  debugInfo(e);
  let labelActions = getUserProperty(labelActionMapKey);
  if (!labelActions) {
    labelActions = {};
  } else {
    labelActions = JSON.parse(labelActions);
  }
  labelActions[e.formInputs.gmailLabelInput] = {
    folderId: e.formInputs.folderIdInput[0],
    fileTypes: e.formInputs.fileTypeInput
  };
  setUserProperty(labelActionMapKey, JSON.stringify(labelActions));
  const nav = CardService.newNavigation().updateCard(getGmailCard(e));
  return CardService.newActionResponseBuilder().setNavigation(nav).build();
}
