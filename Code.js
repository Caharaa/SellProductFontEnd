function show_admin_sidebar() {
  var ui = SpreadsheetApp.getUi();
  var html = HtmlService.createHtmlOutputFromFile('Sidebar')
    .setTitle('Sell Support Function')
    .setWidth(500);
  ui.showSidebar(html);
}

function get_user(){
  var response = UrlFetchApp.fetch('https://randomuser.me/api/');
  const data = JSON.parse(response.getContentText());
  return data
}

function display_in_row(text_array){
  var sheet  = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow(text_array)

}