import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import "/src/style.css"

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
            <img className="h-48 w-96 object-contain" src="src/images/logo.png" alt="MyStudyPlanner Logo"></img>
            <div style={{marginTop: "-50px"}} className="card text-5xl">Welcome to MyStudyPlanner</div>
            <span className="text-2xl mt-5">
                Studying just got{" "}
                <span className="text-2xl italic font-bold">easier</span>
            </span>
            <AppProvider>
                <SignInPage sx={{ marginTop: "-150px", }} providers={providers} signIn={loginACB} />
            </AppProvider>
        </div>
    );
}
