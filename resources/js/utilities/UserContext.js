import { createContext, useContext, useState, useEffect } from 'react';
import ApiClient from "./ApiClient";

// Create the context
const UserContext = createContext();

// Custom hook to access the context
export const useUserContext = () => useContext(UserContext);

// Provider component to wrap the app and provide the context value
export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState('');
    const [name, setName]     = useState('');

    const headers = {
        "Accept": 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    };

    useEffect(() => {
        ApiClient.get('get-user-data', {headers})
            .then(res => {
                console.log("UserContext.js", res.data);
                setUserId(res.data.UserID);
                setName(res.data.name);
            }).catch(err => {
            console.log(err);
        });
    },[])

    // Value object to be provided by the context
    const contextValue = {
        userId,
        name
    };

    return (
        <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
    );
};
