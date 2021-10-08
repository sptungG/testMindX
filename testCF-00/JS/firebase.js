// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApTwpVL_lEwkDrNnp_zdqjUu6IIaRXyFA",
  authDomain: "dishes-221f2.firebaseapp.com",
  projectId: "dishes-221f2",
  storageBucket: "dishes-221f2.appspot.com",
  messagingSenderId: "988128207151",
  appId: "1:988128207151:web:90c6fad749b56a0141c1da",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();

