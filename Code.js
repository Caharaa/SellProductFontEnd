function show_admin_sidebar() {
  var ui = SpreadsheetApp.getUi();
  var html = HtmlService.createHtmlOutputFromFile('Sidebar')
    .setTitle('Sell Support Function')
    .setWidth(500);
  ui.showSidebar(html);
}

function get_location(searchBody) {
  var url = 'https://cloud.gmapsextractor.com/api/v1/search';
  var token = 'gUGwrX9tTYBL4STjvdlAvYZQ8dzzz9M9cPf14PiPfIhRCDsv'; // Replace 'YOUR_TOKEN' with your actual token
  var keyword = searchBody.query;
  var page = searchBody.page;
  var ll = searchBody.ll;
  var hl = searchBody.hl;
  var gl = searchBody.gl;

  var payload = {
    q: keyword,
    page: page,
    ll:ll,
    hl: hl,
    gl: gl,
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
  sheet.appendRow(text_array)
}
function display_all_in_row(text_array) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var row = 2;
  var i = 0;
  while (true) {
    if (sheet.getRange(row, 1).getValue() === "") {
      sheet.getRange(row, 1).setValue("name: "+text_array[i].name);
      sheet.getRange(row, 2).setValue("fulladdress: "+text_array[i].full_address)
      sheet.getRange(row, 3).setValue("street: "+text_array[i].street)
      sheet.getRange(row, 4).setValue("municioality: "+text_array[i].municipality)
      sheet.getRange(row, 5).setValue("categories: "+text_array[i].categories)
      sheet.getRange(row, 6).setValue("phone: "+text_array[i].phone)
      sheet.getRange(row, 7).setValue("phones: "+text_array[i].phones)
      sheet.getRange(row, 8).setValue("claimed: "+text_array[i].claimed)
      sheet.getRange(row, 9).setValue("reviewcount: "+text_array[i].review_count)
      sheet.getRange(row, 10).setValue("averagerating: "+text_array[i].average_rating)
      sheet.getRange(row, 11).setValue(text_array[i].review_url)
      sheet.getRange(row, 12).setValue("latitude: "+text_array[i].latitude)
      sheet.getRange(row, 13).setValue("longitude: "+text_array[i].longitude)
      sheet.getRange(row, 14).setValue(text_array[i].website)
      sheet.getRange(row, 15).setValue("domain: "+text_array[i].domain)
      sheet.getRange(row, 16).setValue("openinghours: "+text_array[i].opening_hours)
      sheet.getRange(row, 17).setValue("featuredimage: "+text_array[i].featured_image)
      sheet.getRange(row, 18).setValue(text_array[i].google_maps_url)
      sheet.getRange(row, 19).setValue(text_array[i].google_knowledge_url)
      sheet.getRange(row, 20).setValue("cid: "+text_array[i].cid)
      sheet.getRange(row, 21).setValue("kgmid: "+text_array[i].kgmid)
      sheet.getRange(row,22).setValue("placeid: "+text_array[i].place_id)
      i++;
      row++;
    } else {
      row++;
    }
    if (i === text_array.length) {
      break;
    }
  }
}