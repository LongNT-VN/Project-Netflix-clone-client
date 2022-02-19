import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyBU_v69dHKSqqGMt3r3dRTAaF30rWirDFs",
    authDomain: "netflix-36196.firebaseapp.com",
    projectId: "netflix-36196",
    storageBucket: "netflix-36196.appspot.com",
    messagingSenderId: "510115844536",
    appId: "1:510115844536:web:676a3569a6757707b63f4d",
    measurementId: "G-7H57SNH4W7"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);