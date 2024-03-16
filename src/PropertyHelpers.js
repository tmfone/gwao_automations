/* global debugInfo */

/* exported getUserProperty */
function getUserProperty(key) {
  let value;
  try {
    value = PropertiesService.getUserProperties().getProperties()[key];
  } catch (err) {
    // TODO (developer) - Handle exception
    debugInfo('Failed with error %s', err.message);
  }
  return value;
}

/* exported setUserProperty */
function setUserProperty(key, value) {
  try {
    // Set a property in each of the three property stores.
    const userProperties = PropertiesService.getUserProperties();
    userProperties.setProperty(key, value);
  } catch (err) {
    debugInfo('Failed with error %s', err.message);
  }
}

/* exported deleteUserProperty */
function deleteUserProperty(key) {
  try {
    // Set a property in each of the three property stores.
    const userProperties = PropertiesService.getUserProperties();
    userProperties.deleteProperty(key);
  } catch (err) {
    debugInfo('Failed with error %s', err.message);
  }
}

/* exported getScriptProperty */
function getScriptProperty(key) {
  let value;
  try {
    value = PropertiesService.getScriptProperties().getProperties()[key];
  } catch (err) {
    // TODO (developer) - Handle exception
    debugInfo('Failed with error %s', err.message);
  }
  return value;
}

/* FOR DEBUGGING*/
/* exported getUserProperties */
function getUserProperties() {
  let value;
  try {
    value = PropertiesService.getUserProperties().getProperties();
    debugInfo(value);
  } catch (err) {
    // TODO (developer) - Handle exception
    debugInfo('Failed with error %s', err.message);
  }
  return value;
}

/* exported deleteLabelActions */
function deleteLabelActions(key) {
  key = 'labelActions';
  try {
    // Set a property in each of the three property stores.
    const userProperties = PropertiesService.getUserProperties();
    userProperties.deleteProperty(key);
  } catch (err) {
    debugInfo('Failed with error %s', err.message);
  }
}
