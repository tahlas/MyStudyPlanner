import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import Button from "@mui/material/Button";


export function LoginView(props) {

    function loginACB(){
        props.login();
    }
    
    return (
        <AppProvider>
            {/* TODO: Fix OAuth sign-in */}
            <Button variant="contained">TEST</Button>
            <SignInPage provider={["google"]} signIn={loginACB} />
        </AppProvider>
    );
}