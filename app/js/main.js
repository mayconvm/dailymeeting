(function(_global) {

  let recordRTC = null;
  // const formData = new FormData();
  let formData = {
    name: 'MAYCON', //Cookie.get('name'),
    email: 'EMAIL@EMAIL.COM', //Cookie.get('email'),
    descricao: null,
    audio: null
  };

  let config = {
    apiKey: "",
    authDomain: "daylingmeet.firebaseapp.com",
    databaseURL: "https://daylingmeet.firebaseio.com",
    projectId: "daylingmeet",
    storageBucket: "daylingmeet.appspot.com",
    messagingSenderId: "",
  };
  firebase.initializeApp(config);

  let voiceRecorder = document.getElementById("voiceRecorder");
  // register click
  voiceRecorder.addEventListener('click', toogleClick);
  startRecord();
  
  /**
   * Iniciando a gravação do áudio
   */
  function startRecord() {
    let session = {
      audio: true,
      video: false
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

    if (voiceRecorder.classList.contains("btn-danger")) {
      recordRTC.stopRecording(function(audioURL) {
        formData.audio = recordRTC.getBlob();
      });
    } else {
      recordRTC.startRecording();
    }
  }

  let sendForm = document.getElementById("sendForm");
  sendForm.addEventListener('click', sendDataForm);

  function sendDataForm() {
    console.log("formData", formData);

    // button
    sendForm.text = "Aguarde";
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
  }

})(window)
