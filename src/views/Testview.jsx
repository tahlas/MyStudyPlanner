import {auth, googleAuthProvider } from "/src/firebaseSetup.js"

export function TestView(props){

//code from firebase documentation
function loginACB(){
const auth = getAuth();
signInWithPopup(auth, googleAuthProvider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = googleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = googleAuthProvider.credentialFromError(error);
    // ...
  })
  };

  return <div>
     <button onClick={loginACB}>!Log in with Google</button>
  </div>

  }