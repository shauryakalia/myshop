import { createContext, useState } from "react";

// actual value you want to access with default values
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
})

// provider component
export const UserProvider = ({children}) => {
    const [ currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};
    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}