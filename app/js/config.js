(function (_global) {
  
  const user = new User();

  if (user.getName() != "") {
    return window.location.href = "popup.html";
  }

  let sendForm = document.getElementById("sendForm");
  // register click
  sendForm.addEventListener('click', sendDataForm);

  function sendDataForm() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;

    user.setName(name);
    user.setEmail(email);

    window.location.reload();
  }

}) (window);
