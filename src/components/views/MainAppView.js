import React, { useContext, useEffect, useState } from 'react';
import { GroupListener } from '../../context/GroupListener';
import { MemberDisplay } from '../MemberDisplay';
import { Settle } from '../Settle';
import { AddTransaction } from '../transactions/AddTransaction';
import { TransactionList } from '../transactions/TransactionList';

export const MainAppView = () => {
  const { currentGroup } = useContext(GroupListener);
  const groupId = currentGroup ? currentGroup.groupId : null;
  const groupMembers = currentGroup ? currentGroup.groupMembers : null;
  const creatorId =  currentGroup ? currentGroup.creator.id : null;
  const transactions = currentGroup ? currentGroup.transactions : null;
  const lastSettle = currentGroup ? currentGroup.lastSettled : null;
  const [balances, setBalances] = useState(null);

  const calcBalances = ( memberObject, transactionsObject, lastSettle ) => {
    if (!memberObject || !transactionsObject) {
      setBalances(null)
      return
    }          
    // See if last transaction is a settlement, then skip all calcs. 
    const lastKey = Object.keys(transactionsObject).length-1;
    const last = Object.values(transactionsObject)[lastKey];
    const settledUp = last.type === 'settlement' ? true : false;
    if (settledUp) {
      setBalances(null)
      return
    }
    // initialize balances obj: for each member Id zero balance
    let initBalances = {};
    let transactionsByMember = {};
    Object.keys(memberObject).forEach( member => {
      initBalances[member] = 0;
      transactionsByMember[member] = [];
    });  

    // Loop through the transactions to calc balances
    (transactionsObject !== null || 'undefined' || '') && Object.keys(transactionsObject).forEach( item => {    
      let transaction = transactions[item]; 
      if (transaction.timestamp > lastSettle) {
        let spenders = typeof transaction.spenders !== 'undefined' ? transaction.spenders : null;    
        let payers = typeof transaction.payers !== 'undefined' ? transaction.payers : null;   
        spenders && spenders.forEach( spender => {
          transactionsByMember[spender].push(-transaction.dividedAmount);
        });
        payers && payers.forEach( payer => {
          transactionsByMember[payer].push(+transaction.amount);
        });
      }
    });
    Object.keys(transactionsByMember).forEach( memberId => {
      let individualArr = transactionsByMember[memberId];
      let total = individualArr.reduce( (acc, current) => (acc += current), 0 );
      initBalances[memberId] = total;
    });
    setBalances(initBalances);
    return;
  };

  useEffect(() => {
    if (groupMembers) {      
      calcBalances(currentGroup.groupMembers, transactions, lastSettle);  
    };          
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions, groupMembers]);

  return (
    <>
    {currentGroup && <MemberDisplay balances={balances} groupTotal={400} />}      
    <div className="animated fadeIn w-11/12 md:w-9/12 lg:w-6/12 mx-auto flex flex-wrap flex-column content-center justify-center">
      {currentGroup && <Settle balances={balances} groupId={groupId} groupMembers={groupMembers} creatorId={creatorId} />} 
      {currentGroup && <AddTransaction />} 
      {currentGroup && <TransactionList />}       
    </div>
    </>
  )
}