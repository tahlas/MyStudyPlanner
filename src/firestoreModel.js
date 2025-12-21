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
                model.setAccessToken(firestoreToken);
            }
            model.setCourses(snapshot.data().courses || []);
            model.setTaskTimeTracking(snapshot.data().taskTimeTracking || {});
            model.setTaskTimeByDate(snapshot.data().taskTimeByDate || {});
        } else {
            model.setCourses([]);
            model.setTaskTimeTracking({});
            model.setTaskTimeByDate({});
        }
        model.setReady(true);
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
            JSON.stringify(model.taskTimeByDate),
        ];
    }

    function writeToPersistenceACB() {
        if (model.user && model.accessToken) {
            if (model.isTokenFromLogin || model.ready) {
                const user_firestoreDoc = doc(db, COLLECTION, model.user.uid);
                setDoc(
                    user_firestoreDoc,
                    {
                        accessToken: model.accessToken,
                        courses: model.courses,
                        taskTimeTracking: model.taskTimeTracking,
                        taskTimeByDate: model.taskTimeByDate,
                    },
                    { merge: true },
                );
            }
        }
    }
}
