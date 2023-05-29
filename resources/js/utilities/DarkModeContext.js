import React, { createContext, useState } from 'react';

export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
    const [darkModeChecked, setDarkModeChecked] = useState(true);

    const toggleDarkMode = () => {
        setDarkModeChecked((prev) => !prev);
    };

    return (
        <DarkModeContext.Provider value={{ darkModeChecked, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};
