import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseconfig";

const firebaseinit = ()=>{
    initializeApp(firebaseConfig);
}

export default firebaseinit;