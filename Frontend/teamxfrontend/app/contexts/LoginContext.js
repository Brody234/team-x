import React, { createContext, useState, useContext, useEffect } from 'react';
import newRequest from '../utils/UseRequest';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const savedUser = localStorage.getItem('token');
    return savedUser ? savedUser : "";
 })
  const [localUser, setLocalUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
 })

  useEffect(()=>{
    if(token && token != ""){
      
      localStorage.setItem("token", token)
    }
    if (localUser) {
      localStorage.setItem('user', JSON.stringify(localUser));
   } 

    
  }, [token, localUser])
  return (
    <LoginContext.Provider value={{ token, setToken, localUser, setLocalUser }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);