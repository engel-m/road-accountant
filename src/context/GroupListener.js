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
          firestore.collection("Groups").doc(authUser.selectedGroup).onSnapshot( data => {
            setCurrentGroup(data.data()) 
            console.log('Updated currentGroup state from new snapshot')           
          }, (error) => {
            console.log(error)
          });   
        console.log('New group listener started, groupId: ' + authUser.selectedGroup)  
        setView('MainAppView')   
      } else {
        setCurrentGroup(null) 
        setView('GroupSelect')
      }
      setPendingGroup(false); 
    }

    return () => {
      console.log('Returned Grouplistener useEffect, unsubscribing')
      unsubscribeGroup.current && unsubscribeGroup.current();
      unsubscribeGroup.current = null;      
    };   
  }, [authUser]);

      // eslint-disable-next-line react-hooks/exhaustive-deps

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