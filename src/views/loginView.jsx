import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import Button from "@mui/material/Button";


export function LoginView(props) {

    function loginACB(){
        props.login();
         window.location.hash="#/overview"
    }
    
    const providers = [ {id: 'google', name: 'Google'} ];

    return (
        <AppProvider>
            <SignInPage providers={providers} signIn={loginACB} />
        </AppProvider>
    );
}