function show_admin_sidebar() {
    var ui = SpreadsheetApp.getUi();
    var html = HtmlService.createHtmlOutputFromFile('Sidebar')
      .setTitle('Sell Support Function 10')
      .setWidth(500);
    ui.showSidebar(html);
  }
  
  function get_user(){
    var response = UrlFetchApp.fetch('https://randomuser.me/api/');
    const data = JSON.parse(response.getContentText());
    return data
  }
