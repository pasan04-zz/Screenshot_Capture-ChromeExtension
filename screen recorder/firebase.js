var firebaseConfig = {
    apiKey: "AIzaSyDGHw19cC3NG9L0fiYn8ZCDSv50KEdQHfo",
    authDomain: "screenrecorder-73c46.firebaseapp.com",
    projectId: "screenrecorder-73c46",
    storageBucket: "screenrecorder-73c46.appspot.com",
    messagingSenderId: "375984897590",
    appId: "1:375984897590:web:75d0746fa73a527dad2297",
    measurementId: "G-Q8NWB6DH7M"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  
  
  console.log(firebase);
  
  var db = firebase.firestore();
  

  
  chrome.runtime.onMessage.addListener((msg, sender, resp) => {
  
    if(msg.command == "post"){
      db.collection("cities").doc("test-doc").set({
          data: msg.data
      })
      .then(function() {
          console.log("Document successfully written!");
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });
    }


    
    if(msg.command == "fetch"){
      var docRef = db.collection("cities").doc("LA");
      docRef.get().then(function(doc) {
          if (doc.exists) {
            //doc.data()
            resp({type: "result", status: "success", data: doc.data(), request: msg});
          } else {
              //No such document!
              resp({type: "result", status: "error", data: 'No such document!', request: msg});
          }
      }).catch(function(error) {
        //Error getting document:",error
        resp({type: "result", status: "error", data: error, request: msg});
      });
    }
  
    //submit  data..
    if(msg.command == "post"){
     //...
    }
  
    return true;
  
  
  })