import * as firebase from "firebase";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyDYKiHwgF86kxO6WnDewX6QNmW2k7-0oXU",
    authDomain: "what-9bfdd.firebaseapp.com",
    projectId: "what-9bfdd",
    storageBucket: "what-9bfdd.appspot.com",
    messagingSenderId: "1031374009124",
    appId: "1:1031374009124:web:1ce5c46099ac518295f9b1"
  };

  let app;
  if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
  } else {
    app = firebase.app()
  }
  
  const auth = firebase.auth()
  
  export { auth };