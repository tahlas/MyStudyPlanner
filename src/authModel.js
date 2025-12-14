import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import {app} from "./firebaseConfig.js";


export const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.addScope('https://www.googleapis.com/auth/calendar');
googleAuthProvider.addScope('https://www.googleapis.com/auth/tasks');

export const auth = getAuth(app);

export function connectToAuthentication(model) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            model.setUser(user);
        } else {
        }
    });
}

