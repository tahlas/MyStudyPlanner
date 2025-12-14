import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

 const firebaseConfig = {
  apiKey: "AIzaSyDEdJApf-CBTcgd6M9ir5eTGhG25EOLlIo",
  authDomain: "mystudyplanner-b49b3.firebaseapp.com",
  projectId: "mystudyplanner-b49b3",
  storageBucket: "mystudyplanner-b49b3.firebasestorage.app",
  messagingSenderId: "607667439358",
  appId: "1:607667439358:web:5462ea54358033646187af",
  measurementId: "G-NLZJJ9SDXS"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);