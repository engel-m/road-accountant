import React, { useContext } from 'react';
import { Transaction } from './Transaction';
import { GroupListener } from '../context/GroupListener';
import { AuthContext } from '../context/AuthContext';
import { firestore, fieldValue } from '../config/Firebase';

export const TransactionList = () => {
  const { currentGroup } = useContext(GroupListener);
  const { authUser } = useContext(AuthContext);
  const members = currentGroup.groupMembers || null;
  const creatorId = currentGroup.creator.id;
  const transactionsObj = currentGroup.transactions || null;
  let transactions = [];
  Object.keys(transactionsObj).map( transaction => (
    transactions.push({
      ...transactionsObj[transaction], 
      id: transaction
    })
  ));   
  let sorted = transactions.length ? transactions.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds) : [];

  const deleteTransaction = (id, e = '') => {
    (e !== '') && e.preventDefault();
    firestore.collection('Groups').doc(currentGroup.groupId).set({ 
      transactions: {
        [id]: fieldValue.delete()
      }
    }, { merge: true }).catch( (error) => {
      console.log(error)
    });     
  };
  
  return (
    <div className="w-screen mb-12 px-10 font-fira overflow-x-hidden overflow-y-auto scrollable border-b border-gray-400" id="transactionlist">
      <h3>History</h3>
      <ul className="list-none">
        {sorted.length ? sorted.map((transaction) => (
          <Transaction key={transaction.id} id={transaction.id} transaction={transaction} 
            members={members} creatorId={creatorId} authId={authUser.uid} deleteTransaction={deleteTransaction}/> 
         )) : <li className="p-2 my-2 bg-white shadow-md text-gray-800">No Transactions yet!</li>}
      </ul>
    </div>
  )
}
