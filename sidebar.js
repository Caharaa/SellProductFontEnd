function create_import_butt() {
    var element = document.getElementById("Det");
    var import_button = document.createElement('button');
    import_button.innerHTML = 'Import';
    import_button.id = 'Import';
    import_button.style.margin = '5px';
    import_button.style.padding = '10px';
    import_button.onclick = () => { console.log("start here") }
    element.appendChild(import_button);
  }
  function create_user_info(user) {
    var element = document.getElementById("Det");
    var userDiv = document.createElement('div'); // Create a new <div> element
    userDiv.innerHTML = '<p>' +'Gender: '+ user[0].gender + '<p>' +
          '<p>'+'Age: ' + user[0].dob.age + '<p>' +
          '<p>'+'Email: ' + user[0].email + '<p>' +
          '<p>'+'City: ' + user[0].location.city + '<p>' +
          '<p>'+'Phone: ' + user[0].phone + '<p>';
    userDiv.style.backgroundColor = 'lightblue';
    userDiv.style.padding = '10px';
    userDiv.style.margin = '10px';
    userDiv.style.width = '300px';
    userDiv.style.height = '200px';
    element.appendChild(userDiv);
  }
  function replace_info(user) {
    create_user_info(user.results);
    create_import_butt();
  }
  function send_request() {
    google.script.run.withSuccessHandler(replace_info).get_user();
  }