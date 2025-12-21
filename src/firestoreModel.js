import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { app } from "/src/firebaseConfig.js";

const db = getFirestore(app);

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
            const data = snapshot.data();

            if (!model.isTokenFromLogin && data.accessToken) {
                model.setAccessTokenFromFirestore(data.accessToken);
            }

            model.setCourses(data.courses || []);
            model.setTaskTimeTracking(data.taskTimeTracking || {});
            model.setTaskTimeByDate(data.taskTimeByDate || {});
        } else {
            model.setCourses([]);
            model.setTaskTimeTracking({});
            model.setTaskTimeByDate({});
        }
        model.setReady(true);
    }

    function errorACB(error) {
        console.error("Firestore error:", error);
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
            const user_firestoreDoc = doc(db, COLLECTION, model.user.uid);

            if (model.ready) {
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
            } else if (model.isTokenFromLogin) {
                setDoc(
                    user_firestoreDoc,
                    { accessToken: model.accessToken },
                    { merge: true },
                );
            }
        }
    }
}