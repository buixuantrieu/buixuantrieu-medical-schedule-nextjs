import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAb_FPlQJt4Jto0TIre9axfi2fDMxmyxC0",
  authDomain: "sdsd-f6fec.firebaseapp.com",
  projectId: "sdsd-f6fec",
  storageBucket: "sdsd-f6fec.appspot.com",
  messagingSenderId: "293207792431",
  appId: "1:293207792431:web:f96578e5731857c3c31fda",
  measurementId: "G-20708SEFHB",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
