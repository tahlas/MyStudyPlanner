import { LoginView } from "../views/loginView";
import { observer } from "mobx-react-lite";
import { auth, googleAuthProvider } from "/src/firestoreModel.js"; 
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"; 

//code structure taken from firebase authentication documentation
const Login = observer(
    function loginRender(props) {
        function loginACB() {
            signInWithPopup(auth, googleAuthProvider)
                .then((result) => {

                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const accessToken = credential.accessToken;
                    props.model.setAccessToken(accessToken);

                })
                .catch((error) => {
                    console.error(error);
                });
        }

        return <LoginView login={loginACB}></LoginView>
    }

)

export { Login };

