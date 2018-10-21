var user;
window.onload = function() {
  initApp();
};


// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBRc6ejGT12Jldt7Hbx2ZNiEYSsBr7F7_Q",
    authDomain: "cseismic-3c54e.firebaseapp.com",
    databaseURL: "https://cseismic-3c54e.firebaseio.com",
    projectId: "cseismic-3c54e",
    storageBucket: "cseismic-3c54e.appspot.com",
    messagingSenderId: "883441228888"
  };
  firebase.initializeApp(config);

// Initialize the Firebase google auth.
var provider = new firebase.auth.GoogleAuthProvider();

/**
 * Function called when clicking the Login/Logout button.
 */
// [START buttoncallback]
function toggleSignIn() {
  if (!firebase.auth().currentUser) {
    // [START createprovider]
    var provider = new firebase.auth.GoogleAuthProvider();
    // [END createprovider]
    // [START addscopes]
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    // [END addscopes]
    // [START signin]
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
       user = result.user;
      // [START_EXCLUDE]
      // [END_EXCLUDE]


    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // [START_EXCLUDE]
      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('You have already signed up with a different auth provider for that email.');
        // If you are using multiple auth providers on your app you should handle linking
        // the user's accounts here.
      } else {
        console.error(error);
      }
      // [END_EXCLUDE]
    });
    // [END signin]
  } else {
    // [START signout]
    firebase.auth().signOut();
    // [END signout]
  }
  // [START_EXCLUDE]
  document.getElementById('quickstart-sign-in').disabled = true;
  // [END_EXCLUDE]
}
// [END buttoncallback]
/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
 function initApp() {
   // Listening for auth state changes.
   // [START authstatelistener]
   firebase.auth().onAuthStateChanged(function(user) {
     if (user) {
       // [START_EXCLUDE]
       document.getElementById('quickstart-sign-in').textContent = 'Hi' + ' ' + user.displayName + '(Logout)';
       // [END_EXCLUDE]

       $("#register_btn").attr("onclick","signin_success_redirect()");

       notify();

     } else {
       // User is signed out.
       // [START_EXCLUDE]
       document.getElementById('quickstart-sign-in').textContent = 'Sign in';

       $("#register_btn").attr("onclick","signin_error_popup()");
       // [END_EXCLUDE]
     }
     // [START_EXCLUDE]
     document.getElementById('quickstart-sign-in').disabled = false;
     // [END_EXCLUDE]
   });
   // [END authstatelistener]
   document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
 }

function signin_error_popup(){
    window.alert("please sign-in to register..");
}

function signin_success_redirect() {
window.location = "/cseismic.html";
}

function notify() {
    if ('serviceWorker' in navigator) {
      // sw.js can literally be empty, but must exist
      navigator.serviceWorker.register('/sw.js');
    };
}
