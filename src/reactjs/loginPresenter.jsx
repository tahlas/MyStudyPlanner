import { LoginView } from "../views/loginView";
import { observer } from "mobx-react-lite";
import { auth, googleAuthProvider } from "/src/firebaseSetup.js";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";

//code structure taken from firebase auth documentation
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const user = result.user;
        props.model.setUserInfo({
            user_id: user.uid,
            email: user.email,
            name: user.displayName,
            token: user.accesToken,
        });

    } else {
        // User is signed out
        // ...
    }
})

// //Some of the code is from the firebase authentication documentation
// const Login = observer(
//     function loginRender(props) {
//         function loginACB() {
//             signInWithPopup(auth, googleAuthProvider)
//                 .then((result) => {


//                 })
//                 .catch((error) => {
//                     console.error(error);
//                 });
//         }
//         return <LoginView login={loginACB}></LoginView>
//     }
// )

export { Login };