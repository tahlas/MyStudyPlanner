import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { app } from "/src/firebaseConfig.js";

const db = getFirestore(app);

window.db = db;
window.doc = doc;
window.setDoc = setDoc;

const COLLECTION = "users";

export function connectToPersistence(model, reaction) {
    reaction(userChangeACB, readFromFirestoreACB);

    function userChangeACB() {
        return model.user;
    }

    function readFromFirestoreACB(user) {
        if (user) {
            const user_firestoreDoc = doc(db, COLLECTION, user.uid);
            getDoc(user_firestoreDoc).then(readDataACB).catch(errorACB);
        }
    }

    function readDataACB(snapshot) {
        if (snapshot.data()) {
            const firestoreToken = snapshot.data().accessToken;
            if (!model.isTokenFromLogin) {
                model.accessToken = firestoreToken;
            }
            snapshot.data().courses
                ? (model.courses = snapshot.data().courses)
                : (model.courses = []);
            snapshot.data().taskTimeTracking
                ? (model.taskTimeTracking = snapshot.data().taskTimeTracking)
                : (model.taskTimeTracking = {});
        } else {
            model.courses = [];
            model.taskTimeTracking = {};
        }
        model.ready = true;
    }

    function errorACB(error) {
        console.log(error);
    }

    reaction(modelChangeACB, writeToPersistenceACB);

    function modelChangeACB() {
        return [
            model.accessToken,
            model.user,
            model.courses.length,
            JSON.stringify(model.taskTimeTracking),
        ];
    }

    function writeToPersistenceACB() {
        if (model.user && model.accessToken) {
            if (model.isTokenFromLogin || model.ready) {
                const user_firestoreDoc = doc(db, COLLECTION, model.user.uid);
                setDoc(
                    user_firestoreDoc,
                    { accessToken: model.accessToken, courses: model.courses, taskTimeTracking: model.taskTimeTracking},
                    { merge: true },    
                );
            }
        }
    }
}
