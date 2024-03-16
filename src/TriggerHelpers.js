/* global debugInfo */

/* exported deleteTrigger */
function deleteTrigger(functionName) {
  const allTriggers = ScriptApp.getProjectTriggers();
  allTriggers.forEach((trigger) => {
    debugInfo(trigger.getHandlerFunction());
    if (trigger.getHandlerFunction() == functionName) {
      ScriptApp.deleteTrigger(trigger);
    }
  });
}

/* exported setTrigger */
function setTrigger(functionName, hours) {
  deleteTrigger(functionName);
  // Trigger every 6 hours.
  ScriptApp.newTrigger(functionName).timeBased().everyHours(hours).create();
}
