import { getAuth, signInWithPopup, GoogleAuthProvider,onAuthStateChanged,signOut} from "firebase/auth";
import { useEffect, useState } from "react";
import firebaseinit from "./firebaseinit";

firebaseinit();
const useFirebase=()=>{
    const [user, setuser]= useState({});
    const [loading,setloading] = useState(true);

    const auth = getAuth();


    const signInUsingGoogle=()=>{
        setloading(true)
        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleProvider)
        .then(result=> {
            setuser(result.user)
        })
        .finally(()=>setloading(false))
    };

    useEffect(()=>{
        onAuthStateChanged(auth,user=>{
            if(user){
                setuser(user)
            }
            else{
                setuser({})
            }
            setloading(false)
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