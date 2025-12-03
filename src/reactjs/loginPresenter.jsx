import { LoginView } from "../views/loginView";
import { observer } from "mobx-react-lite";
import { auth, googleAuthProvider } from "/src/firebaseSetup.js";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Login = observer(
    function loginRender(props){
          function loginACB(){
                signInWithPopup(auth, googleAuthProvider)
                    .then((result) => {
                        const user = result.user;
                       props.model.setUserInfo({
                            user_id: user.uid,
                            email: user.email,
                            name: user.displayName
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                    });
        }
        return <LoginView login={loginACB}></LoginView>
    }
)

export{Login};