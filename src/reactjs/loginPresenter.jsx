import { LoginView } from "../views/loginView";
import { observer } from "mobx-react-lite";
import { googleAuthProvider } from "/src/firebaseSetup.js";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";

//code structure taken from firebase auth documentation
const Login = observer(
    function loginRender(props) {
        function loginACB() {
            signInWithPopup(auth, googleAuthProvider)
                .then((result) => {
                })
                .catch((error) => {
                    console.error(error);
                });
        }


        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                props.model.setUserInfo({
                    user_id: user.uid,
                    email: user.email,
                    name: user.displayName,
                    photoURL: user.photoURL,
                    token: user.accessToken,
                });

            } else {
                // User is signed out
                // ...
            }
        })

        return <LoginView login={loginACB}></LoginView>
    }

)

export { Login };