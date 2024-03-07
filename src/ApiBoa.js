/* exported pingMiddleware */
/* global debugInfo */
const baseURL = 'https://tmf-s-gcrs-apiboa-fplowllkzq-ey.a.run.app';
const token =
  '7z29IaxbsYQ40SDQUkuigyJF21VCnKoxRyoDmZRAESle1hVjzJNviVKMbYWUAnRinZsMDUhc0vErzKI95nem6A==';

function pingMiddleware() {
  debugInfo('Start');
  debugInfo('Token = ' + token);
  var headers = { 'Authorization': 'Bearer ' + token };
  var options = {
    'headers': headers,
    'contentType': 'application/json',
    'muteHttpExceptions': true
  };
  var url = baseURL + '/v1/healthcheck';
  var response = UrlFetchApp.fetch(encodeURI(url), options);
  var responseObj = JSON.parse(response.getContentText());
  debugInfo(response.getResponseCode());
  debugInfo(response.getContentText());
  if (response.getResponseCode() != 200) {
    return '';
  }
  debugInfo(responseObj.message);
  return responseObj.message;
}
