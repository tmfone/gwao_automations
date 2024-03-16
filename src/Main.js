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

/* exported getMain */
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
