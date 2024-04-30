import React, { createContext, useState, useContext, useEffect } from 'react';
import newRequest from '../utils/UseRequest';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [token, setToken] = useState("")
  const [localUser, setLocalUser] = useState(null)
  
  return (
    <LoginContext.Provider value={{ token, setToken, localUser, setLocalUser }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);