import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCA6sFk_9q-z9NhsrlsE5D1o_FfFweDtrY",
  authDomain: "sos-miau-app.firebaseapp.com",
  projectId: "sos-miau-app",
  storageBucket: "sos-miau-app.firebasestorage.app",
  messagingSenderId: "795745556836",
  appId: "1:795745556836:web:815a58e15c1b61c52ec271",
  measurementId: "G-BS622408ZC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
