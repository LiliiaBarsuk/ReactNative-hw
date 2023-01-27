import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTwfVOvMxaWp4YXMJqlKd_vsli0kvNRAQ",
  authDomain: "rn-study-1ce9f.firebaseapp.com",
  projectId: "rn-study-1ce9f",
  storageBucket: "rn-study-1ce9f.appspot.com",
  messagingSenderId: "800887187126",
  appId: "1:800887187126:web:f4e0fbd2ea3210b865a817"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);