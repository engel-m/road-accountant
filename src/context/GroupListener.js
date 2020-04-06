import React, { useContext, useEffect, useState } from "react";
import { firestore } from "../config/Firebase.js";
import { GlobalContext } from './GlobalState';
import { AuthContext } from './AuthContext';
import { LoadingScreen } from "../components/LoadingScreen.js";

export const GroupListener = React.createContext();

export const GroupListenerProvider = ({ children }) => {
  const { currentUser } = useContext(GlobalContext);
  const { authUser } = useContext(AuthContext);

  const [currentGroup, setCurrentGroup] = useState({
      name: '',
      creationDate: '',
      groupMembers: '',
      transactions: ''
    });
  const [pendingGroup, setPendingGroup] = useState(false);


  useEffect(() => {
    let unsubscribeGroup = () => {console.log('Not listening to group data')};

    if (authUser && (authUser.selectedGroup !== '')) {
      setPendingGroup(true)
      unsubscribeGroup = firestore.collection("Groups").doc(authUser.selectedGroup).onSnapshot( groupData => {
        setCurrentGroup(groupData.data())
        console.log('Listening to group data')               
      });
      setPendingGroup(false) 
    }

    if (!authUser || (currentGroup.name !== '')){
      return unsubscribeGroup();
    }          
  }, [authUser, currentGroup.name]);

  if(pendingGroup){
    return (
      <LoadingScreen />
    )
  }

  return (
    <GroupListener.Provider
      value={{
        currentGroup
      }}
    >
      {children}
    </GroupListener.Provider>
  );
};