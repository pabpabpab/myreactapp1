import React, {createContext} from 'react';

export const AppContext = createContext(null);

// ПОКА НЕ ИСПОЛЬЗУЕТСЯ (ЧЕРНОВИК)
const AppProvider = ({ children }) => {
    return (
        <AppContext.Provider value={}>
            { children }
        </AppContext.Provider>
    );
};

export default AppProvider;