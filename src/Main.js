/* exported getMain */
/* global allMandatorySettingsPresent
          getSettingsRequiredCard
          getDriveCard
          getGmailCard
          buildErrorCard
          trsl 
*/

const constMap = {
  gmail: 'gmail',
  drive: 'drive',
  selMessage: 'MESSAGE',
  selFile: 'FILE',
  selFolder: 'FOLDER'
};

const defaultError = {
  errorText: trsl('tSorry')
};

function getMain(e) {
  if (!allMandatorySettingsPresent()) {
    return getSettingsRequiredCard();
  }
  switch (e.hostApp) {
    case constMap.drive:
      return getDriveCard(e);
    case constMap.gmail:
      return getGmailCard(e);
    default:
      return buildErrorCard(defaultError);
  }
}
