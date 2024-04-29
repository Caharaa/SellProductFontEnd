function show_admin_sidebar() {
  var ui = SpreadsheetApp.getUi();
  var html = HtmlService.createHtmlOutputFromFile('Sidebar')
    .setTitle('Sell Support Function')
    .setWidth(500);
  ui.showSidebar(html);
}

function get_user() {
  var response = UrlFetchApp.fetch('https://randomuser.me/api/');
  const data = JSON.parse(response.getContentText());
  return data
}
function generating_id(message) {
  var key = "saleKey";
  var cipher = Utilities.base64Encode(Utilities.computeHmacSha256Signature(message, key));
  return cipher;
}

function searchColumnData(searchValue) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var columnToSearch = 1; // Change 1 to the column number you want to search (A=1, B=2, etc.)
  var data = sheet.getRange(1, columnToSearch, sheet.getLastRow(), 1).getValues(); // Get values in the specified column
  for (var i = 0; i < data.length; i++) {
    if (data[i][0] == searchValue) {
      return true
    }
  }
  return false
}

function display_in_row(text_array) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var recordId = generating_id(text_array[2] + text_array[4]);
  text_array.push(recordId);
  sheet.appendRow(text_array);

}
