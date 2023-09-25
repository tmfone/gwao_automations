const botLabelKey = 'BOT_LABEL';
const botTriggerKey = 'BOT_TRIGGER';

function getSettingsCard() {
  var userLabels = getLabelArray(GmailApp.getUserLabels()).sort((a, b) => a.localeCompare(b, undefined, {sensitivity: 'base'}));

  var botLabelName = getUserProperty(botLabelKey);
  var botTriggerFrequency = getUserProperty(botTriggerKey);
  
  var botLabelSet = (botLabelName && userLabels.includes(botLabelName))
  userLabelInput = CardService.newSelectionInput().setType(CardService.SelectionInputType.DROPDOWN)
    .setTitle(trsl('tBotLabel'))
    .setFieldName("botLabel")
    .addItem("", "botLabel_blank", !botLabelSet)
    //.addItem("create new label", "botLabel_new", false)
    .setOnChangeAction(CardService.newAction()
        .setFunctionName("botLabelChange"));
  
  userLabels.forEach(userLabel => {
    userLabelInput.addItem(userLabel, userLabel, (botLabelName == userLabel));
  });
  
  var triggerFrequencyInput = CardService.newSelectionInput().setType(CardService.SelectionInputType.DROPDOWN)
    .setTitle(trsl('tTriggerFrequency'))
    .setFieldName("triggerFrequency")
    .addItem("", "", !botTriggerFrequency ? true : false)
    .addItem("1", 1, botTriggerFrequency == 1 ? true : false)
    .addItem("2", 2, botTriggerFrequency == 2 ? true : false)
    .addItem("4", 4, botTriggerFrequency == 4 ? true : false)
    .addItem("6", 6, botTriggerFrequency == 6 ? true : false)
    .addItem("8", 8, botTriggerFrequency == 8 ? true : false)
    .addItem("12", 12, botTriggerFrequency == 12 ? true : false)
    .setOnChangeAction(CardService.newAction()
        .setFunctionName("triggerFrequencyChange"));

  var returnToRootAction = CardService.newAction().setFunctionName('gotoPreviousCard');
  var returnToRootButton = CardService.newTextButton().setText(trsl('tBack')).setOnClickAction(returnToRootAction);

  var cardSection = CardService.newCardSection()
      .setHeader(trsl('tBasicSettings'))
      .addWidget(userLabelInput)
      .addWidget(triggerFrequencyInput)
      .addWidget(returnToRootButton);

  var triggers = ScriptApp.getProjectTriggers();
  console.log(triggers.length + " - Trigger(s) installed")
  var card = CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader()
    .setTitle(trsl('tBotSettingsTitle'))
    .setImageUrl('https://www.gstatic.com/images/icons/material/system/1x/smart_toy_black_48dp.png'))
    .addSection(cardSection)
    .build();
  return [card];
}

function gotoPreviousCard() {
    var nav = CardService.newNavigation().popCard();
    return CardService.newActionResponseBuilder()
        .setNavigation(nav)
        .build();
  }

function getSettingsRequiredCard() {
  var textParagraph = CardService.newTextParagraph()
    .setText(trsl('tOpenSettingsText'));
  var openSettingsAction = CardService.newAction().setFunctionName('getSettingsCard');
  var openSettingsButton = CardService.newTextButton().setText(trsl('tOpenSettings')).setOnClickAction(openSettingsAction);

  var cardSection = CardService.newCardSection()
      .addWidget(textParagraph)
      .addWidget(openSettingsButton);
  var triggers = ScriptApp.getProjectTriggers();
  console.log(triggers.length + " - Trigger(s) installed")
  var card = CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader()
    .setTitle(trsl('tSetupRequired')))
    .addSection(cardSection)
    .build();
  return [card];
}



function setupGmail() {
  var botLabel = GmailApp.getUserLabelByName(botLabelName);
  if (!botLabel){
    // creating bot label
    console.log("Bot Label doesn't exist - creating now");
    GmailApp.createLabel(botLabelName);
  }
}


function allMandatorySettingsPresent(){
  try {
    // Get the value for the user property 'DISPLAY_UNITS'.
    const userProperties = PropertiesService.getUserProperties().getProperties();
    if (userProperties[botLabelKey] &&
        userProperties[botTriggerKey]){
      return(true);
    }
  }
  catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed with error %s', err.message);
    return(false);
  }
}

function botLabelChange(e){
  if (e.formInput.botLabel != 'botLabel_blank' && e.formInput.botLabel != 'botLabel_new')
  {
    try {
      // Set a property in each of the three property stores.
      const userProperties = PropertiesService.getUserProperties();
      userProperties.setProperty(botLabelKey, e.formInput.botLabel);
    } catch (err) {
      console.log('Failed with error %s', err.message);
    }
  }
}
function triggerFrequencyChange(e){
  if (e.formInput.triggerFrequency)
  {
    setUserProperty(botTriggerKey, e.formInput.triggerFrequency);
    setTrigger("processLabels", parseInt(e.formInput.triggerFrequency));
  }
  else{
    deleteUserProperty(botTriggerKey, e.formInput.triggerFrequency);
    deleteTrigger("processLabels");
  }
}
