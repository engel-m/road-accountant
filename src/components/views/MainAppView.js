import React from 'react';
import { MemberDisplay } from '../MemberDisplay';
import { IncomeExpenses } from '../IncomeExpenses';
import { AddTransaction } from '../AddTransaction';
import { TransactionList } from '../TransactionList';
import { firestore, auth } from '../../config/Firebase';

export const MainAppView = () => {
  let userId = '';
  let selectedGroup = '';

  if (auth.currentUser.uid) {
    userId = auth.currentUser.uid;    
    firestore.collection("Users").doc(userId).get().then( doc => {
      selectedGroup = doc.data().selectedGroup;
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
  }   

  // var userRef = firestore.collection("Users").doc("9fgcyTHsY8KOHegA3Umr");

    // docRef.get().then(function(doc) {
    //     if (doc.exists) {
    //         console.log("Document data:", doc.data());
    //     } else {
    //         // doc.data() will be undefined in this case
    //         console.log("No such document!");
    //     }
    // }).catch(function(error) {
    //     console.log("Error getting document:", error);
    // });

  return (
    <>
    <MemberDisplay />      
    <div className="animated fadeIn w-11/12 md:w-8/12 lg:w-4/12 mx-auto mt-8 flex flex-wrap flex-column content-center justify-center">
      <IncomeExpenses />
      <AddTransaction /> 
      <TransactionList />      
    </div>
    </>
  )
}