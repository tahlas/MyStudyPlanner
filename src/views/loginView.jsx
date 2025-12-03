import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";


export function LoginView(props) {

    function loginACB(){
        props.login();
    }
    
    return (
        <AppProvider>
            <button onClick={loginACB}></button>
            <SignInPage provider={["google"]} signIn={loginACB} />
        </AppProvider>
    );
}


