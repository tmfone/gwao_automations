/* exported listFilters */
function listFilters() {
  var userId = 'me';
  var response = UrlFetchApp.fetch(
    'https://www.googleapis.com/gmail/v1/users/' + userId + '/settings/filters',
    {
      headers: {
        'Authorization': 'Bearer ' + ScriptApp.getOAuthToken()
      },
      'muteHttpExceptions': true // Optional, prevents exceptions from being thrown for 4xx and 5xx responses
    }
  );
  var filters = JSON.parse(response.getContentText());
  Logger.log(filters);
}
function test(){
  console.log("do something")
}
