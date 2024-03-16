/* exported debugFlag */
const debugFlag = true;

/* exported debugInfo */
function debugInfo(debugMessage) {
  if (!debugFlag) {
    return;
  }
  if (typeof debugMessage === 'object') {
    debugMessage = JSON.stringify(debugMessage, 0, 2);
  }
  // eslint-disable-next-line no-caller
  console.log(arguments.callee.caller.name + ': ' + debugMessage);
}
