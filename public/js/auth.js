const firebaseConfig = {
  apiKey: "AIzaSyCjKBbUqqwKP8z8dYArvCzWXBREAs40LpQ",
  authDomain: "anki-app-fa752.firebaseapp.com",
  databaseURL: "https://anki-app-fa752-default-rtdb.firebaseio.com",
  projectId: "anki-app-fa752",
  storageBucket: "anki-app-fa752.appspot.com",
  messagingSenderId: "61540602248",
  appId: "1:61540602248:web:cb649284f0a4dca0cdea3d",
  measurementId: "G-D2YSPB710T"
};


firebase.initializeApp(firebaseConfig);
firebase.analytics();
var database = firebase.database();

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      localStorage.setItem('userId', user.uid);
      localStorage.setItem('userName', user.displayName);
      
      let userNameElement = document.getElementById('userName');
      if (userNameElement != null) {
        userNameElement.innerHTML = user.displayName;
      }
    } else {
      localStorage.removeItem('userId');
    }
  });

