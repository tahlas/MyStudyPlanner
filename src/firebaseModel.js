import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "/src/firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);

export const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.addScope('https://www.googleapis.com/auth/calendar');
googleAuthProvider.addScope('https://www.googleapis.com/auth/tasks');

window.db = db;
window.doc = doc;
window.setDoc = setDoc;

const COLLECTION = "users";

export function connectToPersistence(model, reaction) {
    let user_firestoreDoc = null;

    onAuthStateChanged(auth, (user) => {
        model.authStateKnown = true;
        if (user) {
            model.loggedIn = true;
            model.setUserInfo({
                user_id: user.uid,
                email: user.email,
                name: user.displayName,
                photoURL: user.photoURL,
                token: user.accessToken,
            });

            user_firestoreDoc = doc(db, COLLECTION, user.uid);
            getDoc(user_firestoreDoc).then(readDataACB).catch(errorACB);

        } else {
            model.loggedIn = false;
            model.clearUserInfo();
        }
    })

    function readDataACB(snapshot) {
        if (snapshot.data()) {
            model.accessToken = snapshot.data().accessToken;
        }
        model.ready = true;
    }

    function errorACB(error) {
        console.log(error);
    }

    function modelChangeACB() {
        return [model.accessToken];
    }

    function writeToPersistenceACB() {
        if (user_firestoreDoc && model.ready) {
            setDoc(user_firestoreDoc, { accessToken: model.accessToken }, { merge: true });
        }
    }

    reaction(modelChangeACB, writeToPersistenceACB);
}