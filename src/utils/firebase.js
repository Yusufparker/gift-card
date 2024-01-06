import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHTKN1-fRro6z7QHaOQnAjVi3CCPTdMPo",
  authDomain: "gitf-card-dfbae.firebaseapp.com",
  databaseURL: "https://gitf-card-dfbae-default-rtdb.firebaseio.com",
  projectId: "gitf-card-dfbae",
  storageBucket: "gitf-card-dfbae.appspot.com",
  messagingSenderId: "182582740550",
  appId: "1:182582740550:web:de0ce30a8eee626bee2c47",
  measurementId: "G-8C4FF6ZC63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
const database = getDatabase(app)


export {storage, database}
