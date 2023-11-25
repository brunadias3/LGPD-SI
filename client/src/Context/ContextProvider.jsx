import React, { createContext, useState } from 'react';


export const GlobalContext = createContext();



const GlobalProvider =  ({ children }) => {
  const [isLoggedIn, setLogIn] = useState(false);
  const [user, setUser] = useState({});

  return (
    <GlobalContext.Provider
      value={{ isLoggedIn, setLogIn, user, setUser }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
