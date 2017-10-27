(function(_global) {

  const user = new User();
  let recordRTC = null;

  let config = {
    apiKey: "AIzaSyDC34SjHixyMbukGTQMrfxH_z9TVy748l0",
    authDomain: "daylingmeet.firebaseapp.com",
    databaseURL: "https://daylingmeet.firebaseio.com",
    projectId: "daylingmeet",
    storageBucket: "daylingmeet.appspot.com",
    messagingSenderId: "687279960672",
  };
  firebase.initializeApp(config);

  let elementForm = document.querySelector("form");
  let elementAudio = document.querySelector("audio");
  let voiceRecorder = document.getElementById("voiceRecorder");
  let alertSuccess = document.getElementById("alert-success");
  // register click
  voiceRecorder.addEventListener('click', toogleClick);
  startRecord();
  
  /**
   * Iniciando a gravação do áudio
   */
  function startRecord() {
    // let session = {
    //   audio: true,
    //   video: false
    // }; 

    let session = {
      audio: true
    };

    let options = {
        recorderType: MediaStreamRecorder,
  
        mimeType: 'audio/webm' // Firefox also supports: "audio/ogg"
    };
  	
  	navigator.getUserMedia(
      session,
      function (mediaStream) {
    	  recordRTC = RecordRTC(mediaStream, options);
  	  }
    ,
    function (error) {
      throw error;
    });
  }

  /**
   * Gravar e pause gravação do áudio
   */
  function toogleClick() {
    voiceRecorder.classList.toggle("btn-danger");

      let formData = {
        name: user.getName(),
        email: user.getEmail(),
        descricao: null,
        audio: null
      };

    if (voiceRecorder.classList.contains("btn-danger")) {
      recordRTC.stopRecording(function(audioURL) {
        formData.audio = recordRTC.getBlob();

        // set src
        elementAudio.src = URL.createObjectURL(formData.audio);
      });
    } else {
      recordRTC.startRecording();
    }
  }

  let sendForm = document.getElementById("sendForm");
  sendForm.addEventListener('click', sendDataForm);

  function sendDataForm() {
    // button
    sendForm.classList.replace('btn-success', 'btn-warning');
    sendForm.innerText = "Aguarde..."
    sendForm.disabled = true;

    // upload
    if (formData.audio) {
      let storage = firebase.storage();
      let ref = storage.ref();

      ref.child(name(5) + '.webm')
        .put(formData.audio)
        .then(writeData)
        .catch((error) => { throw error; });
    } else {
      writeData({
        downloadURL: null
      });
    }


    function writeData(data) {
      // update data
      formData.audio = data.downloadURL;
      formData.descricao = document.getElementById("descricao").value;

      console.log("formData", formData);

      // Initialize Cloud Firestore through Firebase
      var db = firebase.firestore();

      db.collection("dayling")
      .add(formData)
      .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          reset();
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
          reset();
      });
    }

  }

  function name(length) {

    let result = '';

    for (let i=0; i<length; i++) {
      result += rand();
    }

    function rand() {
      let i = parseInt(Math.random() * 4);
      let letter = "abcdefghijlmnopqrstuvxzABCDEFGHIJLMNOPQRSTUVXZ1234567890";

      return letter[i];
    }

    return result;
  }

  function reset() {
    formData = {};
    elementForm.innerHTML = '';
    alertSuccess.classList.remove("d-none");
  }

})(window)
