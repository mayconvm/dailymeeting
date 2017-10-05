(function (_global) {
  
  let sendForm = document.getElementById("sendForm");
  // register click
  sendForm.addEventListener('click', sendDataForm);

  function sendDataForm() {
    let name document.getElementById("name").value;
    let email document.getElementById("email").value;

    Cookie.set('name', name);
    Cookie.set('email', email);
  }

}) (window);
