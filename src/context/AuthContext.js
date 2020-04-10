import React, { useContext, useEffect, useState } from "react";
import { auth, firestore } from "../config/Firebase.js";
import { GlobalContext } from './GlobalState';
import { LoadingScreen } from "../components/LoadingScreen.js";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const { setView } = useContext(GlobalContext);
  const [authUser, setAuthUser] = useState(auth.currentUser);
  const [pendingAuth, setPendingAuth] = useState(true);
  const [unsubscribeUser, setUnsubscribeUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {        
        setAuthUser(null)
        unsubscribeUser && unsubscribeUser();
        setUnsubscribeUser(null);
        console.log("User is logged Out")     
        setPendingAuth(false)
      } else if (user) { 
        setUnsubscribeUser( () => {
          firestore.collection("Users").doc(user.uid).onSnapshot( userData => {
            setAuthUser(userData.data())
            console.log('Listening to user data after auth');
          }, function(error) {
            console.log(error)
          })
        });           
        setView('MainAppView')
        setPendingAuth(false)      
      } 
    });
    
    return () => {
      setPendingAuth(true) 
      unsubscribeUser && unsubscribeUser();
      setUnsubscribeUser(null);
    };

  }, []);

  if(pendingAuth){
    return <LoadingScreen />
  }

  return (
    <AuthContext.Provider
      value={{
        authUser,
        unsubscribeUser,
        setUnsubscribeUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};