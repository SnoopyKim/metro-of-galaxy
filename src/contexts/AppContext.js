import React, { createContext, useState } from 'react'

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [station, setStation] = useState(null);
    const [zodiacIdx, setZodiacIdx] = useState(Math.floor(12*Math.random()));
    const contextValue = { station, setStation, zodiacIdx, setZodiacIdx };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };


