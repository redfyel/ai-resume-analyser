import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "***************************************",
  authDomain: "ai-powered-talent-platform.firebaseapp.com",
  projectId: "ai-powered-talent-platform",
  storageBucket: "ai-powered-talent-platform.appspot.com",
  messagingSenderId: "898897658404",
  appId: "1:898897658404:web:26cd76968bcc5ba4104eb1",
  measurementId: "G-G2NBSK7K9Z"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); 
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
