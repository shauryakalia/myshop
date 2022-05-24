import { createContext, useState, useEffect, useReducer } from "react";
import {onAuthStateChangedListener, createUserDocumentFromAuth} from '../utils/firebase/firebase.utils';

// actual value you want to access with default values
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
})

export const USER_ACTION_TYPES = {
    'SET_CURRENT_USER': 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
    const { type, payload } = action;
    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            throw new Error(`unhandled type ${type}`)
    }
}

const initialState = {
    currentUser: null
}
// provider component
export const UserProvider = ({children}) => {
    // const [ currentUser, setCurrentUser] = useState(null);
    const [ state, dispatch] = useReducer(userReducer, initialState);
    const { currentUser } = state;
    const setCurrentUser = (user) => {
        dispatch({
            type: USER_ACTION_TYPES.SET_CURRENT_USER,
            payload: user
        })
    }
    const value = {currentUser, setCurrentUser};

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            setCurrentUser(user);
            if (user) {
                createUserDocumentFromAuth(user);
            }
        });

        // this will run when component unmounts
        return unsubscribe;
    }, []);

    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}