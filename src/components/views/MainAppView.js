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
  const [totals, setTotals] = useState(null);


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
    const memberCount = Object.keys(memberObject).length;
    let initBalances = {};
    let transactionsByMember = {};
    Object.keys(memberObject).forEach( member => {
      initBalances[member] = 0;
      transactionsByMember[member] = [];
    });  
    let calcedTotals = {
      everything: 0.00,
      average: 0.00,
      everythingAfterSettle: 0.00,
      averageAfterSettle: 0.00
    };

    // Loop through the transactions to calc balances
    (transactionsObject !== null || 'undefined' || '') && Object.keys(transactionsObject).forEach( item => {    
      let transaction = transactions[item]; 
      calcedTotals.everything += Math.abs(-transaction.amount);
      calcedTotals.average += (transaction.amount / memberCount);
      if (transaction.timestamp > lastSettle) {
        calcedTotals.everythingAfterSettle += Math.abs(-transaction.amount);
        calcedTotals.averageAfterSettle += (transaction.amount / memberCount);
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
    setTotals(calcedTotals);
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
    {currentGroup && <MemberDisplay balances={balances} groupTotals={totals} />}      
    <div className="animated fadeIn w-11/12 md:w-9/12 lg:w-6/12 mx-auto flex flex-wrap flex-column content-center justify-center">
      {currentGroup && <Settle balances={balances} groupId={groupId} groupMembers={groupMembers} creatorId={creatorId} />} 
      {currentGroup && <AddTransaction />} 
      {currentGroup && <TransactionList />}       
    </div>
    </>
  )
}