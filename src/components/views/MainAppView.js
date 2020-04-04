import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { MemberDisplay } from '../MemberDisplay';
import { IncomeExpenses } from '../IncomeExpenses';
import { AddTransaction } from '../AddTransaction';
import { TransactionList } from '../TransactionList';
import { GroupSelect } from './GroupSelect';
import { firestore, auth } from '../../config/Firebase';

export const MainAppView = () => {
  const { renderStatus, currentUser, setUser, setGroup, loggedIn } = useContext(GlobalContext);
  const [groupSelect, setGroupSelect] = useState(false);

  // auth.onAuthStateChanged( user => {
  //   if (user) {
  //     setLoggedIn(user.uid);
  //   } else {
  //     setLoggedIn(false);
  //     console.log('Unsubscribed from User changes');
  //   }
  // }); 

  useEffect(() => {     
    let unsubscribeGroup = () => {
      console.log('Never subscribed to group snapshot')
    };

    let unsubscribeUser = firestore.collection("Users").doc(loggedIn).onSnapshot( userData => {
      setUser(userData.data())
      console.log('listening to user data');
    });      

    if (currentUser.selectedGroup !== '') {  
      unsubscribeGroup = firestore.collection("Groups").doc(currentUser.selectedGroup).onSnapshot( groupData => {
        setGroup(groupData.data())
        console.log('Listening to group changes');
      });       
    }

    return () => {
      unsubscribeUser();
      unsubscribeGroup();
      console.log('Unmounted main view: unsubscribed to all!');
    }
  }, [currentUser.selectedGroup]);

  return (
    <>
    {!groupSelect && <MemberDisplay />}      
    <div className="animated fadeIn w-11/12 md:w-8/12 lg:w-4/12 mx-auto mt-8 flex flex-wrap flex-column content-center justify-center">
      {groupSelect && <GroupSelect />}        
      {!groupSelect && <IncomeExpenses />} 
      {!groupSelect && <AddTransaction />} 
      {!groupSelect && <TransactionList />}       
    </div>
    </>
  )
}