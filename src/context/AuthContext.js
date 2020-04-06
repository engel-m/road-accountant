import React, { useContext, useEffect, useState } from "react";
import { auth, firestore } from "../config/Firebase.js";
import { GlobalContext } from './GlobalState';
import { LoadingScreen } from "../components/LoadingScreen.js";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const { setUser } = useContext(GlobalContext);

  const [authUser, setAuthUser] = useState(auth.currentUser);
  const [pendingAuth, setPendingAuth] = useState(true);

  useEffect(() => {
    let unsubscribeUser = () => console.log('Not listening to user subscription');
        
    auth.onAuthStateChanged((user) => {
      if (user) {
        unsubscribeUser = firestore.collection("Users").doc(user.uid).onSnapshot( userData => {
          setAuthUser(userData.data())
          console.log('listening to user data after auth');
        });     
        // setAuthUser(user)
        setPendingAuth(false)
      } else if (!user) {
        unsubscribeUser();
        setPendingAuth(false)
      }
    });
    
    return unsubscribeUser();
  }, []);

  if(pendingAuth){
    return <LoadingScreen />
  }

  return (
    <AuthContext.Provider
      value={{
        authUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};