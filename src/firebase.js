// version 8
// import firebase from "firebase/app";
// import "firebase/firestore";
// import "firebase/auth";

// version 9 compat
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// // version 9
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB-dnMyrcBqCYRdfdGXo7E4-Ga-MYvMWCw",
    authDomain: "instagram-clone-react-8b1f3.firebaseapp.com",
    projectId: "instagram-clone-react-8b1f3",
    storageBucket: "instagram-clone-react-8b1f3.appspot.com",
    messagingSenderId: "288141911641",
    appId: "1:288141911641:web:2e1622c921ce5f2ebcf348",
    measurementId: "G-C62HLC2XZL"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

// const app = initializeApp(firebaseConfig)
// const db = getFirestore(app);
// const auth = getAuth(app);




// export default firebaseConfig;

export { db, auth, storage };
