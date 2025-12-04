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

        } else {
            // User is signed out
            // ...
        }
    })

       function readDataACB(sn) {
        if (sn.data()) {
            // todo read data from firestore if the data exists
        }
        else {
            // If there is no data for the user initialize with default values
        }
        model.ready = true;
    }

    function errorACB(error){
        console.log(error);
    }

    function modelChangeACB(){
        return[/* specify what data changes causes a write to persistance, current is to test*/ model.userInfo.name];
    }

    function writeToPersistanceACB(){
        if(user_firestoreDoc && model.ready){
            setDoc(user_firestoreDoc, {/* specify what data to save */ username: model.user.name}, {merge:true});
        }
    }

    reaction(modelChangeACB, writeToPersistanceACB);


}