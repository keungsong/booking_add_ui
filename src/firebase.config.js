import {getApp,getApps,initializeApp} from "firebase/app";
import {getFirebase, getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA2qHZhyJ6oUNVPRxELHy0rGQN8RpFg1MI",
    authDomain: "servetoyou-deeaf.firebaseapp.com",
    databaseURL: "https://servetoyou-deeaf-default-rtdb.firebaseio.com",
    projectId: "servetoyou-deeaf",
    storageBucket: "servetoyou-deeaf.appspot.com",
    messagingSenderId: "500266416087",
    appId: "1:500266416087:web:487b10ae1dd5dab648fd92"
  };

  const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

  const firestore = getFirestore(app);
  const storage = getStorage(app);

  export {app,firestore,storage};