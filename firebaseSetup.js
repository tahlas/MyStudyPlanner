import { initializeApp } from "firebase/app";
import {getFirestore, doc, setDoc, getDoc} from "firebase/firestore";
import { auth, db, GoogleAuthProvider } from "firebase/auth";
import {firebaseConfig} from "/src/firebaseConfig.js"

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);

export const googleAuthProvider = new GoogleAuthProvider();

window.db = db

window.doc = doc
window.setDOc = setDoc

const COLLECTION = "testUser"
const DOCUMENT = "testUserDocment"
