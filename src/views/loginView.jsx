import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";

export function LoginView(props) {

    function loginACB(){
        props.login();
    }
    
    const providers = [ {id: 'google', name: 'Google'} ];

    return (    
        <AppProvider>
            <SignInPage providers={providers} signIn={loginACB} />
        </AppProvider>
    );
}