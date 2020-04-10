import React, { useContext, useEffect, useState } from "react";
import { firestore } from "../config/Firebase.js";
import { GlobalContext } from './GlobalState';
import { AuthContext } from './AuthContext';
import { LoadingScreen } from "../components/LoadingScreen.js";

export const GroupListener = React.createContext();

export const GroupListenerProvider = ({ children }) => {
  const { authUser } = useContext(AuthContext);

  const [currentGroup, setCurrentGroup] = useState(null);
  const [pendingGroup, setPendingGroup] = useState(true);
  const [unsubscribeGroup, setUnsubscribeGroup] = useState(null);

  useEffect(() => {    
    if (!authUser) {
      setCurrentGroup(null);
      unsubscribeGroup && unsubscribeGroup();
      setUnsubscribeGroup(null);
      setPendingGroup(false);        
    }

    if (authUser && (authUser.selectedGroup !== '')) {      
      unsubscribeGroup && unsubscribeGroup();

      setUnsubscribeGroup( () => {
        firestore.collection("Groups").doc(authUser.selectedGroup).onSnapshot( groupData => {
          setCurrentGroup(groupData.data())
          console.log('Listening to group data')               
        }, function(error) {
          console.log(error)
        })
      });
      
      setTimeout( () => {setPendingGroup(false)}, 400); 
    }

    return () => {
      setPendingGroup(true);  
      unsubscribeGroup && unsubscribeGroup();
      setUnsubscribeGroup(null);       
    };

    // if (authUser.selectedGroup === null || authUser.selectedGroup === '' ){      
    //   return () => {
    //     unsubscribeGroup && unsubscribeGroup(); 
    //     setUnsubscribeGroup(null);     
    //   };
    // }          

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
        unsubscribeGroup,
        setUnsubscribeGroup
      }}
    >
      {children}
    </GroupListener.Provider>
  );
};