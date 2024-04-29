function create_import_butt(stemid) {
  var element = document.getElementById("Det");
  var import_button = document.createElement('button');
  import_button.style.margin = '5px';
  import_button.style.padding = '10px';
  import_button.id = 'ID: ' + stemid;
  import_button.innerHTML = 'Import';
  import_button.addEventListener('click', google.script.run.withSuccessHandler(vali_data).searchColumnData("text_search"));
  element.appendChild(import_button);
}
function create_user_info(user, stemid) {
  var element = document.getElementById("Det");
  var userDiv = document.createElement('div'); // Create a new <div> element
  userDiv.innerHTML = '<p>' + 'Gender: ' + user[0].gender + '<p>' +
    '<p>' + 'Age: ' + user[0].dob.age + '<p>' +
    '<p>' + 'Email: ' + user[0].email + '<p>' +
    '<p>' + 'City: ' + user[0].location.city + '<p>' +
    '<p>' + 'Phone: ' + user[0].phone + '<p>';
  userDiv.style.backgroundColor = 'lightblue';
  userDiv.style.padding = '5px';
  userDiv.style.margin = '5px';
  userDiv.style.width = '200px';
  userDiv.style.height = '200px';
  userDiv.id = 'ID: ' + stemid
  element.appendChild(userDiv);
}
function replace_info(user) {
  const stemid = new Date().getTime();
  create_user_info(user.results, stemid);
  create_import_butt(stemid);
  // storge data to local storage   
}
function vali_data(check_value) {
  if (!check_value) {
    extration()
  }
  else {
    console.log("data alredy exist");
  }
}
function extration(event) {
  var id = this.id;
  var extrac_element = document.getElementById(id);
  var child = extrac_element.childNodes;
  var text_array = [child[0].innerHTML, child[2].innerHTML, child[4].innerHTML, child[6].innerHTML, child[8].innerHTML];
  google.script.run.display_in_row(text_array);
}
function send_request() {
  google.script.run.withSuccessHandler(replace_info).get_user();
}