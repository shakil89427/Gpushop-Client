import axios from "axios";
import { getAuth, signInWithPopup, GoogleAuthProvider,onAuthStateChanged,signOut} from "firebase/auth";
import { useEffect, useState } from "react";
import firebaseinit from "./firebaseinit";

firebaseinit();
const useFirebase=()=>{
    const [user, setuser]= useState({});
    const [loading,setloading] = useState(true);

    const auth = getAuth();

    const loadData =newData=>{
        axios.post('https://salty-spire-32816.herokuapp.com/adduser',newData)
        .then(res=>{
            if(res.data){
                setuser(res.data)
                setloading(false)
            }
        })
    };

    const signInUsingGoogle=()=>{
        setloading(true)
        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleProvider)
        .then(result=> setuser(result.user))
        .finally(()=>setloading(false))
    };

    useEffect(()=>{
        onAuthStateChanged(auth,user=>{
            if(user){
                loadData(user)
            }
            else{
                setuser({})
                setloading(false)
            }
        })
    },[])

    const logout=()=>{
        setloading(true)
        signOut(auth)
        .then(()=>setuser({}))
        .finally(()=>setloading(false))
    }

    return{
        user,
        loading,
        signInUsingGoogle,
        logout,
    }
}

export default useFirebase;