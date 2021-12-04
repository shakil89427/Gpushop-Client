import axios from "axios";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import firebaseinit from "./firebaseinit";

firebaseinit();

const useFirebase = () => {
  const [user, setuser] = useState({});
  const [loading, setloading] = useState(true);
  const [issue, setIssue] = useState(false);

  const auth = getAuth();

  /* Update or get data from database */
  const updateData = (newData) => {
    axios.post("https://gpushop.herokuapp.com/adduser", newData).then((res) => {
      setuser(res.data);
      setloading(false);
    });
  };

  /* Email and password register function */
  const registerWithEmail = (userdata) => {
    createUserWithEmailAndPassword(auth, userdata.email, userdata.password)
      .then((res) => {})
      .catch((err) => {
        setIssue(err.message);
        setloading(false);
      });
  };

  /* Email and password login function */
  const loginWithEmail = (userdata) => {
    signInWithEmailAndPassword(auth, userdata.email, userdata.password)
      .then((res) => {})
      .catch((err) => {
        setIssue(err.message);
        setloading(false);
      });
  };

  /* Google Signin Function */
  const signInUsingGoogle = () => {
    setloading(true);
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((result) => {})
      .catch((err) => {
        setIssue(err.message);
        setloading(false);
      });
  };

  /* Checkup on Auth */
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        updateData(user);
      } else {
        setuser({});
        setloading(false);
      }
    });
  }, [auth]);

  /* Logout Function */
  const logout = () => {
    setloading(true);
    signOut(auth)
      .then(() => setuser({}))
      .catch((err) => {
        setIssue(err.message);
        setloading(false);
      });
  };

  /* Returned Values */
  return {
    user,
    loading,
    setloading,
    issue,
    setIssue,
    registerWithEmail,
    loginWithEmail,
    signInUsingGoogle,
    logout,
  };
};

export default useFirebase;
