import axios from "axios";
import { getAuth, signInWithPopup, GoogleAuthProvider,onAuthStateChanged,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from "firebase/auth";
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
                    setuser(res.data)
                    setloading(false)
        })
    };

    

    const register =userdata=>{
        setloading(true)
        createUserWithEmailAndPassword(auth,userdata.email,userdata.password)
        .then((res)=>{
            setuser(res.user)
            setloading(false)
        })
        .catch(err=>alert(err))
        .finally(setloading(false))
    }


    const emailsign =(logindata)=>{
        signInWithEmailAndPassword(auth,logindata.email,logindata.password)
        .then((res)=>{
            setuser(res.user)
            setloading(false)
        })
        .catch(err=>alert(err))
        .finally(setloading(false))
    }

    const signInUsingGoogle=()=>{
        setloading(true)
        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleProvider)
        .then(result=> setuser(result.user))
        .catch(err=>alert(err))
        .finally(setloading(false))
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
        .catch(err=>alert(err))
        .finally(()=>setloading(false))
    }

    return{
        user,
        setloading,
        loading,
        signInUsingGoogle,
        emailsign,
        register,
        logout,
    }
}

export default useFirebase;