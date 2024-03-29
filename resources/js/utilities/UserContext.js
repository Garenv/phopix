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

    const fetchUserData = () => {
        const token = localStorage.getItem('token');

        if(!token) { // No token, no need to fetch user data
            return;
        }

        const headers = {
            "Accept": 'application/json',
            "Authorization": `Bearer ${token}`
        };

        ApiClient.get('get-user-data', {headers})
            .then(res => {
                setUserId(res.data.UserID);
                setName(res.data.name);
            }).catch(err => {
            console.log(err);
        });
    }

    useEffect(fetchUserData,[])

    const contextValue = {
        userId,
        name,
        refreshUserData: fetchUserData // provide this function in context so that it can be called elsewhere
    };

    return (
        <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
    );
};

