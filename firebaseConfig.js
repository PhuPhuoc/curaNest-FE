import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC9U9ePtQMT_LwD2QGGgI44OryXEIPAEjs",
  authDomain: "testingfirebase-e987b.firebaseapp.com",
  databaseURL: "https://testingfirebase-e987b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "testingfirebase-e987b",
  storageBucket: "testingfirebase-e987b.appspot.com",
  messagingSenderId: "1060318515107",
  appId: "1:1060318515107:web:59b009842353c714f1d416",
  measurementId: "G-NDFR4VG8HZ"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
