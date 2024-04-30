function create_import_butt(stampid) {
  var element = document.getElementById("Det");
  var import_button = document.createElement('button');
  import_button.style.margin = '5px';
  import_button.style.padding = '10px';
  import_button.id = 'ID: '+ stampid;
  import_button.innerHTML = 'Import';
  import_button.addEventListener('click',extration);
  element.appendChild(import_button);
}
function create_user_info(place,stampid) {
  var element = document.getElementById("Det");
  var userDiv = document.createElement('div'); // Create a new <div> element
  userDiv.innerHTML = '<p>' +'name: '+ place.name + '<p>' +
        '<p>'+'municipality: ' + place.municipality + '<p>' +
        '<p>'+'categories: ' + place.categories + '<p>' +
        '<p>'+'phones: ' + place.phones + '<p>' +
        '<p>'+'website: ' + place.website + '<p>';
  userDiv.style.backgroundColor = 'lightblue';
  userDiv.style.padding = '5px';
  userDiv.style.margin = '5px';
  userDiv.id = 'ID: '+ stampid
  element.appendChild(userDiv);
}
function replace_info(places) {
var parent = document.getElementById('Det');
 
  if (places.data.length === 0) {
    console.log("not found");
    parent.innerHTML = '<p>' + 'NOT FOUND' + '</p>';
  } else {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
    for (let i = 0; i < places.total; i++) {
      create_user_info(places.data[i], i);
      create_import_butt(i);
    }
  }
}
function extration(event){
  var id = this.id;
  var extrac_element = document.getElementById(id);
  var child = extrac_element.childNodes;
  var text_array = [child[0].innerHTML, child[2].innerHTML, child[4].innerHTML, child[6].innerHTML, child[8].innerHTML];
  google.script.run.display_in_row(text_array);
}

function send_request() {
  var keyword = document.getElementById('url').value;
  google.script.run.withSuccessHandler(replace_info).get_user(keyword);
}