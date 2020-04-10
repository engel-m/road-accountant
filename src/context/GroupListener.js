import React, { useContext, useEffect, useState, useRef } from "react";
import { firestore } from "../config/Firebase.js";
import { AuthContext } from './AuthContext';
import { LoadingScreen } from "../components/views/LoadingScreen.js";

export const GroupListener = React.createContext();

export const GroupListenerProvider = ({ children }) => {
  const { authUser } = useContext(AuthContext);

  const [currentGroup, setCurrentGroup] = useState(null);
  const [pendingGroup, setPendingGroup] = useState(true);

  let unsubscribeGroup = useRef(null);

  useEffect(() => {    
    if (!authUser) {
      setCurrentGroup(null);
      unsubscribeGroup.current && unsubscribeGroup.current();
      unsubscribeGroup.current = null;
      setPendingGroup(false);        
    }

    if (authUser && (authUser.selectedGroup !== '')) {      
      unsubscribeGroup.current && unsubscribeGroup.current();

      unsubscribeGroup.current =
        firestore.collection("Groups").doc(authUser.selectedGroup).onSnapshot( groupData => {
          setCurrentGroup(groupData.data())    
        }, function(error) {
          console.log(error)
        });
      
      setPendingGroup(false); 
    }

    return () => {
      unsubscribeGroup.current && unsubscribeGroup.current();
      unsubscribeGroup.current = null;      
    };   

  }, [authUser]);

  if(pendingGroup){
    return (
      <LoadingScreen />
    )
  }

  return (
    <GroupListener.Provider
      value={{
        currentGroup,
        pendingGroup,
        unsubscribeGroup
      }}
    >
      {children}
    </GroupListener.Provider>
  );
};