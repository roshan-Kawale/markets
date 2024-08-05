import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyBsHiGaUAqTjMgvU1duzUDbp08MHh1klAA",
  authDomain: "market-ec667.firebaseapp.com",
  projectId: "market-ec667",
  storageBucket: "market-ec667.appspot.com",
  messagingSenderId: "746269166137",
  appId: "1:746269166137:web:07d074eb801df4b1f8dbe8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);