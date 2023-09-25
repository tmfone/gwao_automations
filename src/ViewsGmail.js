/*GMAIL*/
function getGmailCard(context){
  var botLabelName = getUserProperty(botLabelKey);
  let cardHeader1 = CardService.newCardHeader()
      .setTitle(trsl('tConfigureYourActions'))
      .setImageUrl('https://www.gstatic.com/images/icons/material/system/1x/settings_black_48dp.png')
      .setImageStyle(CardService.ImageStyle.CIRCLE);

  
  let cardSection1SelectionAction = CardService.newSelectionInput()
      .setFieldName('actionInput')
      .setTitle(trsl('tActionInput'))
      .setType(CardService.SelectionInputType.DROPDOWN)
      .addItem(trsl('tActionDownloadAttachments'), 'tActionDownloadAttachments', true)
      .setOnChangeAction(CardService.newAction()
        .setFunctionName("actionInputChange"));

  let cardSection1TextParagraphLabel = CardService.newTextParagraph()
      .setText(trsl('tPickLabel'));

  var userLabels = getLabelArray(GmailApp.getUserLabels()).sort((a, b) => a.localeCompare(b, undefined, {sensitivity: 'base'})); 

  let cardSection1SelectionLabel = CardService.newSelectionInput()
      .setFieldName('gmailLabelInput')
      .setTitle(trsl('tGmailLabel'))
      .setType(CardService.SelectionInputType.DROPDOWN)
      .setOnChangeAction(CardService.newAction()
        .setFunctionName("gmailLabelInputChange"));
    
  userLabels.forEach(userLabel => {
    if (userLabel != botLabelName){
      cardSection1SelectionLabel.addItem(userLabel, userLabel, false);
    }
  });


  let cardSection1TextParagraphFolder = CardService.newTextParagraph()
      .setText(trsl('tPickFolder'));

  let cardSection1SelectionFolder = CardService.newTextInput()
      .setFieldName('folderIdInput')
      .setTitle(trsl('tFolderIdInput'))
      .setHint(trsl('tFolderIdInputHint'))
      .setOnChangeAction(CardService.newAction()
        .setFunctionName("folderIdInputChange"));


  let cardSection1SelectionFileType = CardService.newSelectionInput()
      .setFieldName('fileTypeInput')
      .setTitle(trsl('tfileTypeInput'))
      .setType(CardService.SelectionInputType.CHECK_BOX)
      .addItem('pdf', 'pdf', true)
      .addItem('zip', 'zip', true)
      .addItem('gzip', 'gzip', true)
      .setOnChangeAction(CardService.newAction()
        .setFunctionName("fileTypeInputChange"));
    
  let cardSection1ButtonList1Button1Action1 = CardService.newAction()
      .setFunctionName('addAction')
      .setParameters({});

  let cardSection1ButtonList1Button1 = CardService.newTextButton()
      .setText(trsl('tAddAction'))
      .setTextButtonStyle(CardService.TextButtonStyle.TEXT)
      .setOnClickAction(cardSection1ButtonList1Button1Action1);

  let cardSection1ButtonList1 = CardService.newButtonSet()
      .addButton(cardSection1ButtonList1Button1);

  let cardSection1Divider1 = CardService.newDivider();

  let cardSection1 = CardService.newCardSection()
      .addWidget(cardSection1SelectionAction)
      .addWidget(cardSection1TextParagraphLabel)
      .addWidget(cardSection1SelectionLabel)
      .addWidget(cardSection1TextParagraphFolder)
      .addWidget(cardSection1SelectionFolder)
      .addWidget(cardSection1SelectionFileType)
      .addWidget(cardSection1ButtonList1)
      .addWidget(cardSection1Divider1);

  let cardSection2TextParagraph1 = CardService.newTextParagraph()
      .setText(trsl('tConfiguredActions','<b>'));

  let cardSection2 = CardService.newCardSection()
      .addWidget(cardSection2TextParagraph1);

  var labelActions = JSON.parse(getUserProperty(labelActionMapKey));
  if (labelActions){
    Object.keys(labelActions).sort((a, b) => a.localeCompare(b, undefined, {sensitivity: 'base'})).forEach(labelAction => {
      cardSection2 = cardSection2
      .addWidget(CardService.newTextButton()
        .setText(labelAction)
        .setTextButtonStyle(CardService.TextButtonStyle.TEXT)
        .setOnClickAction(CardService.newAction()
          .setFunctionName('viewActionCard')
          .setParameters({labelAction})))
    });
  }

  let card = CardService.newCardBuilder()
      .setHeader(cardHeader1)
      .addSection(cardSection1)
      .addSection(cardSection2)
      .build();
  return card;
}

function viewActionCard(e){
  if(debugFlag){
    console.log("function viewActionCard");
    console.log(e);
  }

  var labelAction = {};
  if (e.parameters.labelAction){
    var labelActions = getUserProperty(labelActionMapKey);
    if(labelActions){
      labelActions = JSON.parse(labelActions);
      labelAction = labelActions[e.parameters.labelAction];
    }    
  }

  let cardHeader1 = CardService.newCardHeader()
      .setTitle(e.parameters.labelAction)
      .setImageUrl('https://www.gstatic.com/images/icons/material/system/1x/settings_black_48dp.png')
      .setImageStyle(CardService.ImageStyle.CIRCLE);
  
  var saveToFolder = DriveApp.getFolderById(labelAction.folderId);
  
  let cardSectionFolderTextFolderId = CardService.newTextParagraph()
      .setText(trsl('tId') + ' - ' + labelAction.folderId);
  let cardSectionFolderTextFolderName = CardService.newTextParagraph()
      .setText(trsl('tName') + ' - ' + saveToFolder.getName());
  var cardSectionFolder = CardService.newCardSection()
      .setHeader(trsl('tFolderDetails'))
      .addWidget(cardSectionFolderTextFolderName)
      .addWidget(cardSectionFolderTextFolderId);
  

  let cardSectionFileTypeTextParagraph1 = CardService.newTextParagraph()
      .setText(JSON.stringify(labelAction.fileTypes));
  var cardSectionFileType = CardService.newCardSection()
      .setHeader(trsl('tfileTypes'))
      .addWidget(cardSectionFileTypeTextParagraph1);

  let backAction = CardService.newAction().setFunctionName('closeActionCard');
  let backActionButton = CardService.newTextButton().setText(trsl('tBack')).setOnClickAction(backAction);


  let deleteAction = CardService.newAction()
    .setFunctionName('closeActionCard')
    .setParameters({'deleteLabel': 'true',
                    'label': e.parameters.labelAction});
  let deleteActionButton = CardService.newTextButton()
    .setText(trsl('tDelete'))
    .setBackgroundColor("#FF0000")
    .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
    .setOnClickAction(deleteAction);

  let cardSection2ButtonList1 = CardService.newButtonSet()
      .addButton(backActionButton)
      .addButton(deleteActionButton);

  var cardSection2 = CardService.newCardSection()
      .addWidget(cardSection2ButtonList1);

  let card = CardService.newCardBuilder()
      .setHeader(cardHeader1)
      .addSection(cardSectionFolder)
      .addSection(cardSectionFileType)
      .addSection(cardSection2)
      .build();

  var nav = CardService.newNavigation().pushCard(card);
  return CardService.newActionResponseBuilder()
        .setNavigation(nav)
        .build();
}

function closeActionCard(e) {
  if(debugFlag){
    console.log("function closeActionCard");
    console.log(e);
  }
  if (e.parameters.label){
    var labelActions = getUserProperty(labelActionMapKey);
    if(labelActions){
      labelActions = JSON.parse(labelActions);
      delete labelActions[e.parameters.label];
      setUserProperty(labelActionMapKey, JSON.stringify(labelActions));
    }    
  }
  var nav = CardService.newNavigation().popCard().updateCard(getGmailCard(e));
  return CardService.newActionResponseBuilder()
      .setNavigation(nav)
      .build();
}

function gmailLabelInputChange(e){
  if(debugFlag){
    console.log("function gmailLabelInputChange");
    console.log(e);
  }
}

function folderIdInputChange(e){
  if(debugFlag){
    console.log("function folderIdInputChange");
    console.log(e);
  }
}

function actionInputChange(e){
  if(debugFlag){
    console.log("function actionInputChange");
    console.log(e);
  }
}

function fileTypeInputChange(e){
  if(debugFlag){
    console.log("function fileTypeInputChange");
    console.log(e);
  }
}
function addAction(e){
  if(debugFlag){
    console.log("function addAction");
    console.log(e);
  }
  var labelActions = getUserProperty(labelActionMapKey);
  if(!labelActions){
    labelActions = {};
  }
  else{
    labelActions = JSON.parse(labelActions);
  }
  labelActions[e.formInputs.gmailLabelInput] = {
    folderId: e.formInputs.folderIdInput[0],
    fileTypes: e.formInputs.fileTypeInput
  }
  setUserProperty(labelActionMapKey, JSON.stringify(labelActions));
  var nav = CardService.newNavigation().updateCard(getGmailCard(e));
  return CardService.newActionResponseBuilder()
        .setNavigation(nav)
        .build();
}