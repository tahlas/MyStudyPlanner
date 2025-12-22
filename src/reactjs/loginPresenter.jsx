import { LoginView } from "../views/loginView";
import { observer } from "mobx-react-lite";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../authModel.js";
import { useEffect } from "react";

//code structure taken from firebase authentication documentation
const Login = observer(function loginRender(props) {

    useEffect(() => {
        if (props.model.user && props.model.accessToken) {
            window.location.hash = "#/overview";
        }
    }, [props.model.user, props.model.accessToken]);

    function loginACB() {

        signInWithPopup(auth, googleAuthProvider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const accessToken = credential?.accessToken;
                props.model.setAccessToken(accessToken);
                window.location.hash = "#/overview";
            })
            .catch((error) => {
                console.error("Login error:", error);

            });
    }


    return <LoginView login={loginACB}></LoginView>;
});

export { Login };
