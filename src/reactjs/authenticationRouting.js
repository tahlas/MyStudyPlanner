import { reaction } from "mobx";


export function reactToLogin(model){

function modelChangeACB() {
    return model.loggedIn;
}

function onLoggedInChangeACB(loggedIn) {
    if (model.loggedIn) {
        window.location.hash = "#/overview";
    } else {
        window.location.hash = "#/login";
    }
}

reaction(modelChangeACB, onLoggedInChangeACB);

}