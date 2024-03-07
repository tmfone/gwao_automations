/* exported getUserProperty, setUserProperty, deleteUserProperty, getUserProperties, deleteLabelActions */

function getUserProperty(key) {
  try {
    var value = PropertiesService.getUserProperties().getProperties()[key];
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed with error %s', err.message);
  }
  return value;
}
function setUserProperty(key, value) {
  try {
    // Set a property in each of the three property stores.
    const userProperties = PropertiesService.getUserProperties();
    userProperties.setProperty(key, value);
  } catch (err) {
    console.log('Failed with error %s', err.message);
  }
}
function deleteUserProperty(key) {
  try {
    // Set a property in each of the three property stores.
    const userProperties = PropertiesService.getUserProperties();
    userProperties.deleteProperty(key);
  } catch (err) {
    console.log('Failed with error %s', err.message);
  }
}

/* FOR DEBUGGING*/
function getUserProperties() {
  try {
    var value = PropertiesService.getUserProperties().getProperties();
    console.log(value);
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed with error %s', err.message);
  }
  return value;
}
function deleteLabelActions(key) {
  key = 'labelActions';
  try {
    // Set a property in each of the three property stores.
    const userProperties = PropertiesService.getUserProperties();
    userProperties.deleteProperty(key);
  } catch (err) {
    console.log('Failed with error %s', err.message);
  }
}
