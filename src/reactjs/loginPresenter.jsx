import { LoginView } from "../views/loginView";
import { observer } from "mobx-react-lite";
import { signInWithPopup } from "firebase/auth";
import {GoogleAuthProvider} from "firebase/auth";
import { googleAuthProvider,auth } from "../authModel.js";
import { useEffect } from "react";

//code structure taken from firebase authentication documentation
const Login = observer(function loginRender(props) {

    if(props.model.user)
        console.log(props.model.user);

    function loginACB() {
        signInWithPopup(auth, googleAuthProvider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const accessToken = credential?.accessToken;
                props.model.setAccessToken(accessToken);
                window.location.hash = "#/overview";
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return <LoginView login={loginACB}></LoginView>;
});

export { Login };
