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


export function connectToPersistance(model, reaction) {

    let user_firestoreDoc = null;
    model.ready = false;

    onAuthStateChanged(auth, (user) => {
        if (user) {
            model.setUserInfo({
                user_id: user.uid,
                email: user.email,
                name: user.displayName,
                photoURL: user.photoURL,
                token: user.accessToken,
            });

            user_firestoreDoc = doc(db, COLLECTION, user.uid);

            getDoc(user_firestoreDoc).then(readDataACB).catch(errorACB);

               window.location.hash="#/overview"

        } else {
            // User is signed out
              window.location.hash="#/login"
        }
    })

    function readDataACB(snapshot) {
        if (snapshot.data()) {
            model.tasks = snapshot.data().tasks || [];
            model.events = snapshot.data().events || [];
        }
        else {
            // If there is no data for the user initialize with default values
        }
        model.ready = true;
    }

    function errorACB(error) {
        console.log(error);
    }

    function modelChangeACB() {
        return [/* specify what data changes causes a write to persistance, current data is to test*/ model.tasks, model.events];
    }

    function writeToPersistanceACB() {
        if (user_firestoreDoc && model.ready) {
            setDoc(user_firestoreDoc, {/* specify what data to save */  tasks: model.tasks, events: model.events }, { merge: true });
        }
    }

    reaction(modelChangeACB, writeToPersistanceACB);


}