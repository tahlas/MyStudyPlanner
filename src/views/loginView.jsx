import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";


export function LoginView(props) {

    function loginACB(){
        props.login();
    }
    
    return (
        <AppProvider>
            {/* TODO: Fix OAuth sign-in */}
            <SignInPage provider={["google"]} signIn={loginACB} />
        </AppProvider>
    );
}


