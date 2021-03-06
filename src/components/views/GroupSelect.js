import React, { useContext, useState, useEffect } from 'react';
import { firestore, fieldValue } from '../../config/Firebase';
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
    if (authUser.selectedGroup !== id) { 
      firestore.collection('Users').doc(authUser.uid).update({
        selectedGroup: id
      }).catch( (error) => {
        console.log(error);
      })       
    } 
    setView('MainAppView') 
  };

  const deleteGroup = (id, e = '') => {
    (e !== '') && e.preventDefault();
    if (id === authUser.selectedGroup) {
      firestore.collection('Users').doc(authUser.uid).update({ selectedGroup: null }).catch( (error) => { console.log(error) })
    }      
    firestore.collection('Groups').doc(id).delete().then( () => {
      firestore.collection("GroupsByUser").doc(authUser.uid).set({ 
        groups: {
          [id]: fieldValue.delete()
        }
      }, { merge: true });
      setGroupArray( groupArray.filter( group => group.groupId !== id) )
    }).catch( (error) => {
      console.log(error)
    });     
  };

  const getGroups = (authUser) => {
    if (authUser) {
      let returned = [];
      let groupIds = [];
      firestore.collection("GroupsByUser").doc(authUser.uid).get().then( doc => {
        let groups = doc.data() ? doc.data().groups : null;
        if (groups) {
          Object.keys(groups).map( (groupId) => {
            returned.push(groups[groupId])
            return groupIds.push([groupId])
          });  
          returned.sort((a, b) => {
            return b.createDate - a.createDate;
          });
        }      
        returned.length >= 1 ? setGroupArray(returned) : setGroupArray(null);
        setLoadingGroups(false);
      }).catch( (error) => {
        console.log(error);
      });
    }
  }

  useEffect(() => {
    authUser && getGroups(authUser);
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
    { groupArray && groupArray.map( (group) => (
        <GroupCard key={group.groupId} selectGroup={selectGroup} deleteGroup={deleteGroup}
          group={group} userId={authUser.uid}/>
    ))}
    </div>   
    </>
  )
};

