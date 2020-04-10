import React, { useContext, useEffect, useState, useRef } from "react";
import { auth, firestore } from "../config/Firebase.js";
import { GlobalContext } from './GlobalState';
import { LoadingScreen } from "../components/views/LoadingScreen.js";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const { setView } = useContext(GlobalContext);
  const [authUser, setAuthUser] = useState(auth.currentUser);
  const [pendingAuth, setPendingAuth] = useState(true);
  
  let unsubscribeUser = useRef(null);
  let reroute = useRef(setView);
  
  useEffect(() => {
    auth.onAuthStateChanged( (user) => {
      if (!user) {        
        setAuthUser(null)
        unsubscribeUser.current && unsubscribeUser.current();
        unsubscribeUser.current = null;
        setPendingAuth(false)
      } else if (user) { 
        unsubscribeUser.current = 
          firestore.collection("Users").doc(user.uid).onSnapshot( userData => {
            setAuthUser(userData.data())
          }, function(error) {
            console.log(error)
          });           
        reroute.current('MainAppView')
        setPendingAuth(false)      
      } 
    });
    
    return () => {
      unsubscribeUser.current && unsubscribeUser.current();
      unsubscribeUser.current = null; 
    };

  }, []);

  if(pendingAuth){
    return <LoadingScreen />
  }

  return (
    <AuthContext.Provider
      value={{
        authUser,
        unsubscribeUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};