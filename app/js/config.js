(function (_global) {
  
  const user = new User();
  const sendData = new SendData();

  if (user.getName()) {
    return console.log("Logado", user);
    // return window.location.href = "popup.html";
  }

  // flow
  let areaStep1 = document.getElementById("step1");
  let areaStep2 = document.getElementById("step2");

  ///////////
  // STEP1 //
  ///////////

  let sendFormStep1 = document.getElementById("sendFormStep1");
  sendFormStep1.addEventListener('click', function() {
    // notify user that loading
    changeButton(this);
    user.setEmail(getValueInput("email"));
    user.setPassword(getValueInput("password"));

    sendData.setEntity(user);
    sendData.send().then((data) => {
      // case success
      // hide area #step1
      areaStep1.classList.add("d-none");
      
      // show area #step2
      areaStep2.classList.remove("d-none");

      // token
      user.setToken(data.token);
    })
    .catch((dataError) => {
      // case email not found
      // show message error
      alert(JSON.stringify(dataError));
    });
      
  });

  ////////////
  // STEP 2 //
  ////////////

  let sendFormStep2 = document.getElementById("sendFormStep2");
  sendFormStep2.addEventListener('click', function() {
    // notify uset that loading
    changeButton(this);
    user.setName(getValueInput("name"));
    user.setTeam(getValueInput("email"));
    user.setPassword(getValueInput("password"));

    sendData.setEntity(user);
    sendData.send().then((data) => {
      // case success
      // registre new password
      // persist data about user
      // redirect user to popup.html
      window.location.reload();
    })
    .catch((dataError) => {
      // case error
      // show message error
      alert(JSON.stringify(dataError));
    });
  });

  function changeButton(el) {
    if (!el && !('innerHTML' in el)) {
      return;
    }

    let dataText = el.innerHTML;
    let image = '<img class="loader" src="img/tail-spin.svg" alt="Loader"> ';

    if (dataText.indexOf(image) === -1) {
      dataText = image + dataText;
      el.disabled = true;
    } else {
      dataText = dataText.replace(image, '');
      el.disabled = false;
    }
    
    el.innerHTML =  dataText;
  }

  function getValueInput(name) {
    return document.getElementById(name).value;
  }

}) (window);
