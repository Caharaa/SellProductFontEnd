function create_import_butt(stampid) {
  var element = document.getElementById("Det");
  var import_button = document.createElement('button');
  import_button.style.margin = '5px';
  import_button.style.padding = '10px';
  import_button.id = 'ID: ' + stampid;
  import_button.innerHTML = 'Import';
  import_button.addEventListener('click', extration);
  element.appendChild(import_button);
}
function create_user_info(place, stampid) {
  var element = document.getElementById("Det");
  var userDiv = document.createElement('div'); // Create a new <div> element
  userDiv.innerHTML = '<p>' + 'name: ' + place.name + '<p>' +
    '<p>' + 'full_address: ' + place.full_address + '<p>' +
    '<p>' + 'street: ' + place.street + '<p>' +
    '<p>' + 'municipality: ' + place.municipality + '<p>' +
    '<p>' + 'categories: ' + place.categories + '<p>' +
    '<p>' + 'claimed: ' + place.claimed + '<p>' +
    '<p>' + 'review_count: ' + place.review_count + '<p>' +
    '<p>' + 'average_rating: ' + place.average_rating + '<p>' +
    `<p>review_url: <a href=${place.review_url} target=_blank>visite review</a></p>` +
    '<p>' + 'latitude: ' + place.latitude + '<p>' +
    '<p>' + 'longitude: ' + place.longitude + '<p>' +
    '<p>' + 'phones: ' + place.phones + '<p>' +
    '<p>' + 'domain: ' + place.domain + '<p>' +
    `<p> website: <a href= https:/${place.website} target=_blank>visite website</a></p>` +
    `<p>featured_image: <br> <img src=${place.featured_image}><p>` +
    `<p>google_map_url: <a href=${place.google_map_url} target=_blank>visite map</a></p>` +
    `<p>google_knowledge_url: <a href=${place.google_knowledge_url} target=_blank>visite knowledge</a><p>` +
    '<p>' + 'cid: ' + place.cid + '<p>' +
    '<p>' + 'kgmid: ' + place.kgmid + '<p>' +
    '<p>' + 'place_id: ' + place.place_id + '<p>';
  userDiv.style.backgroundColor = 'lightblue';
  userDiv.style.padding = '5px';
  userDiv.style.margin = '5px';
  userDiv.id = 'ID: ' + stampid
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
      if (!(places.data[i].website === undefined)) {
        create_user_info(places.data[i], i);
        create_import_butt(i);
      }
    }
  }
}

function extration(event) {
  var id = this.id;
  var extrac_element = document.getElementById(id);
  var child = extrac_element.childNodes;
  var text_array = []
  for (let i = 0; i < child.length; i++) {
    if (child[i].innerHTML !== "") {
      text_array.push(child[i].innerHTML);
    }
  }
  // upon to the googlemap extraction json
  var url_web = text_array[13];
  var url_review = text_array[8];
  var url_map = text_array[15];
  var url_know = text_array[16];
  text_array[13] = add_hyper_link(url_web);
  text_array[8] = add_hyper_link(url_review);
  text_array[15] = add_hyper_link(url_map);
  text_array[16] = add_hyper_link(url_know);
  google.script.run.display_in_row(text_array);
}
function add_hyper_link(url) {
  var tempElement = document.createElement('div');
  tempElement.innerHTML = `${url}`
  var linkElement = tempElement.querySelector('a');
  var url = linkElement.getAttribute('href');
  return url;
}

function send_request() {
  var keyword = document.getElementById('url').value;
  google.script.run.withSuccessHandler(replace_info).test_data_json();
  //google.script.run.withSuccessHandler(replace_info).get_user(keyword);
}