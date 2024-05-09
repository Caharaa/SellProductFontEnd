var stage = {};
function clear_object(){
  stage = null;
  stage = {}
}
function create_import_butt(stampid) {
var element = document.getElementById("Det");
var import_button = document.createElement('button');
import_button.style.margin = '5px';
import_button.style.padding = '10px';
import_button.id = stampid;
import_button.innerHTML = 'Import';
import_button.addEventListener('click',extraction);
element.appendChild(import_button);
}
function create_user_info(place,stampid) {
var element = document.getElementById("Det");
var userDiv = document.createElement('div'); // Create a new <div> element
userDiv.innerHTML = '<p>' +'name: '+ place.name + '<p>' +
      '<p>' +'full_address: '+ place.full_address + '<p>' +
      '<p>' +'street: '+ place.street + '<p>' +
      '<p>'+'municipality: ' + place.municipality + '<p>' +
      '<p>'+'categories: ' + place.categories + '<p>' +
      '<p>'+'claimed: ' + place.claimed + '<p>' +
      '<p>'+'review_count: ' + place.review_count + '<p>' +
      '<p>'+'average_rating: ' + place.average_rating + '<p>' +
      `<p>review_url: <a href=${place.review_url} target=_blank>visite review</a></p>`+
      '<p>'+'latitude: ' + place.latitude + '<p>' +
      '<p>'+'longitude: ' + place.longitude + '<p>' +
      '<p>'+'phones: ' + place.phones + '<p>' +
      '<p>'+'domain: ' + place.domain + '<p>' +
      `<p> website: <a href= https:/${place.website} target=_blank>visite website</a></p>`+
      `<p>featured_image: <br> <img src=${place.featured_image}><p>`+
      `<p>google_map_url: <a href=${place.google_maps_url} target=_blank>visite map</a></p>` +
      `<p>google_knowledge_url: <a href=${place.google_knowledge_url} target=_blank>visite knowledge</a><p>`+
      '<p>'+'cid: ' + place.cid + '<p>'+
      '<p>'+'kgmid: ' + place.kgmid + '<p>'+
      '<p>'+'place_id: ' + place.place_id + '<p>';
userDiv.style.backgroundColor = 'lightblue';
userDiv.style.padding = '5px';
userDiv.style.margin = '5px';
userDiv.id = stampid;
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
    if(!(places.data[i].website === undefined)){
      store_data(places.data[i],i);
      create_user_info(places.data[i], i);
      create_import_butt(i);
    }
  }
}
}
function store_data(place,stampid){
stage[stampid] = place;
}
function extraction_all(){
var textes_array = [];
for(let i in stage){
  textes_array.push(stage[i]);
}
google.script.run.display_all_in_row(textes_array);
clear_object();
}

function extraction(event){
var stampId = this.id;
const locationObj = stage[stampId];
console.log(locationObj);
var locationArray = [];
for(let i in locationObj){
  locationArray.push(locationObj[i]);
}
google.script.run.display_in_row(locationArray);
}

function send_request(event){
event.preventDefault();

const query = document.getElementById("q").value
const page = document.getElementById("page").value
const ll = "@23.0875893,112.3725638,11z";
const hl = document.getElementById("hl").value
const gl = document.getElementById("gl").value
google.script.run.withSuccessHandler(replace_info).get_location({query,page,ll,hl,gl})
}