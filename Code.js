function show_admin_sidebar() {
  var ui = SpreadsheetApp.getUi();
  var html = HtmlService.createHtmlOutputFromFile('Sidebar')
    .setTitle('Sell Support Function')
    .setWidth(500);
  ui.showSidebar(html);
}

function get_user(keyword) {
  var url = 'https://cloud.gmapsextractor.com/api/v1/search';
  var token = 'gUGwrX9tTYBL4STjvdlAvYZQ8dzzz9M9cPf14PiPfIhRCDsv'; // Replace 'YOUR_TOKEN' with your actual token
  var payload = {
    q: keyword,
    page: 1,
    ll: '@23.0875893,112.3725638,11z',
    hl: 'th',
    gl: 'th'
  };

  var options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + token
    },
    payload: JSON.stringify(payload)
  };

  var response = UrlFetchApp.fetch(url, options);
  var responseData = JSON.parse(response.getContentText());
  return responseData
}
function display_in_row(text_array) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow(text_array);
}
