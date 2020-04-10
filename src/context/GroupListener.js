import React, { useContext, useEffect, useState, useRef } from "react";
import { firestore } from "../config/Firebase.js";
import { GlobalContext } from './GlobalState';
import { AuthContext } from './AuthContext';
import { LoadingScreen } from "../components/views/LoadingScreen.js";

export const GroupListener = React.createContext();

export const GroupListenerProvider = ({ children }) => {
  const { authUser } = useContext(AuthContext);  
  const { setView } = useContext(GlobalContext);

  const [currentGroup, setCurrentGroup] = useState(null);
  const [pendingGroup, setPendingGroup] = useState(true);

  let unsubscribeGroup = useRef(null);
  let reroute = useRef(setView);

  useEffect(() => {    
    if (!authUser) {
      setCurrentGroup(null);
      unsubscribeGroup.current && unsubscribeGroup.current();
      unsubscribeGroup.current = null;
      setPendingGroup(false);        
    }

    if (authUser) {      
      if (authUser.selectedGroup) {
        unsubscribeGroup.current && unsubscribeGroup.current();

        unsubscribeGroup.current =
          firestore.collection("Groups").doc(authUser.selectedGroup).onSnapshot( groupData => {
            setCurrentGroup(groupData.data())    
          }, function(error) {
            console.log(error)
          });

        reroute.current('MainAppView')
      } else if (!authUser.selectedGroup) {        
        reroute.current('GroupSelect');
        
      }
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