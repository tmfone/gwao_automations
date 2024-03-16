/* global languageMap */

/* exported trsl */
function trsl(key, formatting) {
  let retValue = '';
  const locale = Session.getActiveUserLocale();
  if (!languageMap[key]) {
    retValue = key;
  } else if (languageMap[key][locale]) {
    retValue = languageMap[key][locale];
  } else if (languageMap[key]['en']) {
    retValue = languageMap[key]['en'];
  } else {
    retValue = key + '_en';
  }
  if (formatting) {
    retValue = formatting + retValue + formatting.replace('<', '</');
  }
  return retValue;
}
