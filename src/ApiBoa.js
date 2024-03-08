/* exported pingMiddleware uploadFileMiddleware*/
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

function uploadFileMiddleware(fileName, fileType, fileContentBase64) {
  debugInfo('Start');
  debugInfo('Token = ' + token);
  const headers = { 'Authorization': 'Bearer ' + token };
  const data = JSON.stringify({
    'file_name': fileName,
    'document_description': fileName,
    'content_type': fileType,
    'skip_ocr': true,
    'content': fileContentBase64
  });
  const options = {
    'method': 'POST',
    'headers': headers,
    'contentType': 'application/json',
    'payload': data,
    'muteHttpExceptions': true
  };
  const url = baseURL + '/v1/finance/documents/stage_fin_document';
  const response = UrlFetchApp.fetch(encodeURI(url), options);
  const responseObj = JSON.parse(response.getContentText());
  debugInfo(response.getResponseCode());
  debugInfo(response.getContentText());
  if (response.getResponseCode() != 201) {
    return false;
  }
  debugInfo(responseObj.message);
  return true;
}
