import { createContext, useState, useEffect } from "react";
import {onAuthStateChangedListener, createUserDocumentFromAuth} from '../utils/firebase/firebase.utils';

// actual value you want to access with default values
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
})

// provider component
export const UserProvider = ({children}) => {
    const [ currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            setCurrentUser(user);
            if (user) {
                await createUserDocumentFromAuth(user);
            }
        });

        // this will run when component unmounts
        return unsubscribe;
    }, []);

    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}