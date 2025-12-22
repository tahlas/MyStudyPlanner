import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";

export function LoginView(props) {
    function loginACB() {
        props.login();
    }

    const providers = [{ id: "google", name: "Google" }];

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <img class="h-48 w-96 object-contain" src="src/images/logo.png" alt="MyStudyPlanner Logo"></img>
            <div class="text-5xl">Welcome to MyStudyPlanner</div>
            <span class="text-2xl mt-5">
                Studying just got{" "}
                <span class="text-2xl italic font-bold">easier</span>
            </span>
            <AppProvider>
                <SignInPage providers={providers} signIn={loginACB} />
            </AppProvider>
        </div>
    );
}
