import React, { useContext, useState, useEffect } from 'react';
import { firestore } from '../../config/Firebase';
import { AuthContext } from '../../context/AuthContext';
import { GlobalContext } from '../../context/GlobalState';
import { LoadingScreen } from "./LoadingScreen.js";
import { GroupCard } from "../GroupCard.js";

export const GroupSelect = () => {
  const { authUser } = useContext(AuthContext);
  const [groupArray, setGroupArray] = useState(null);
  const [loadingGroups, setLoadingGroups] = useState(true);  
  const { setView, setModal } = useContext(GlobalContext);

  const selectGroup = (id, e = '') => {
    if (e !== '') {
      e.preventDefault();
    }
    authUser.selectedGroup ? authUser.selectedGroup !== id ? 
      firestore.collection('Users').doc(authUser.uid).update({
        selectedGroup: id
      }).catch( (error) => {
        console.log(error);
      })       
      : setView('MainAppView')
    : setView('MainAppView')   
  };

  const deleteGroup = (id, e = '') => {
    (e !== '') && e.preventDefault();
    firestore.collection('Groups').doc(id).delete().then( () => {
      getGroups(authUser);
    }).then( () => {
      if (id === authUser.selectedGroup) {
        firestore.collection('Users').doc(authUser.uid).update({ selectedGroup: null })
      }    
    }).catch( (error) => {
      console.log(error);
    })     
  };

  const getGroups = (authUser) => {
    if (authUser) {
      setLoadingGroups(true);
      firestore.collection("Groups").where("groupMembers." + authUser.uid + ".role", ">", "''").get().then( docs => {
        let returned = [];
        docs.forEach(function(doc) {
          let data = doc.data();
          returned.push({ ...data, groupId: doc.id});
        });   
        returned.length >= 1 ? setGroupArray(returned) : setGroupArray(null);
        setLoadingGroups(false);
      }).catch( (error) => {
        console.log(error);
      });
    }
  }

  useEffect(() => {
    authUser && getGroups(authUser);
    console.log('Effect fired')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loadingGroups) {
    return <LoadingScreen />
  }

  return (
    <>
    <div className="animated fadeIn w-11/12 md:w-8/12 lg:w-4/12 mx-auto mt-8 flex flex-wrap flex-column content-center justify-center">
      <h1 className="text-center block w-full text-bold text-indigo-800 text-2xl">{ groupArray ? 'Your Groups' : 'No Groups yet. Create one first!'}</h1> 

    {/* Create a group Button */}
    <div className="relative flex w-8/12 pt-4 pb-5 md:pb-1 my-4 items-center bg-indigo-800 shadow-lg rounded-lg flex-shrink mx-1">
      <div onClick={ (e) => setModal('CreateGroupModal', e)} className="block h-12 w-full text-center cursor-pointer">
        <h1 className="font-bold text-white text-sm md:text-xl mt-1 shadow-lg">CREATE NEW GROUP</h1>            
      </div>
    </div>

    {/* Group Cards */}
    { groupArray && groupArray.map( (group, index) => (
          <GroupCard key={group.groupId} selectGroup={selectGroup} deleteGroup={deleteGroup}
            groupId={group.groupId} userId={authUser.uid} name={group.name} groupMembers={group.groupMembers} />
        ))}
    </div>   
    </>
  )
};

