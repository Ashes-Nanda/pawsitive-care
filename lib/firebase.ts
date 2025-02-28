import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


    const firebaseConfig = {
        apiKey: "AIzaSyAx3c4JLoWJNn70BWaVbsVrV-biv94Mlws",
        authDomain: "epics-pj.firebaseapp.com",
        projectId: "epics-pj",
        storageBucket: "epics-pj.appspot.com",
        messagingSenderId: "769166604098",
        appId: "1:769166604098:web:8f714f5ee145fccf837adb"
      };


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
