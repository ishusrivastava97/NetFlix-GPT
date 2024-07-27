// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlQgX5PLle95nCJTtMKN4Gq0OtDiY3ug0",
  authDomain: "netflix-gpt-4c8a2.firebaseapp.com",
  projectId: "netflix-gpt-4c8a2",
  storageBucket: "netflix-gpt-4c8a2.appspot.com",
  messagingSenderId: "824303452796",
  appId: "1:824303452796:web:8dc8f968cdac9e1ccffff9",
  measurementId: "G-JXCGSSS1LG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth();
