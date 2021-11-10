import React, { createContext } from 'react';
import useFirebase from '../Firebase/useFirebase';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const useContext = useFirebase();
    return (
        <AuthContext.Provider value={useContext}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;