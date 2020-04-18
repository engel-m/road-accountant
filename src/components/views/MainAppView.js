import React, { useContext, useEffect, useState } from 'react';
import { GroupListener } from '../../context/GroupListener';
import { MemberDisplay } from '../MemberDisplay';
import { IncomeExpenses } from '../IncomeExpenses';
import { AddTransaction } from '../transactions/AddTransaction';
import { TransactionList } from '../transactions/TransactionList';

export const MainAppView = () => {
  const { currentGroup } = useContext(GroupListener);
  const groupMembers = currentGroup ? currentGroup.groupMembers : null;
  const transactions = currentGroup ? currentGroup.transactions : null;
  const [balances, setBalances] = useState(null);

  const calcBalances = ( memberObject, transactionsObject ) => {
    if (!memberObject || !transactionsObject) return
    let initBalances = {};
    let transactionsByMember = {};
    // initialize balances obj: for each member Id zero balance
    Object.keys(memberObject).forEach( member => {
      initBalances[member] = 0;
      transactionsByMember[member] = [];
    });  
    transactions && Object.keys(transactions).forEach( item => {
      let transaction = transactions[item];    
      let spenders = transaction.spenders;    
      let payers = transaction.payers;   
      spenders.forEach( spender => {
        transactionsByMember[spender].push(-transaction.dividedAmount);
      });
      payers.forEach( payer => {
        transactionsByMember[payer].push(+transaction.amount);
      });
    });

    Object.keys(transactionsByMember).forEach( memberId => {
      let individualArr = transactionsByMember[memberId];
      let total = individualArr.reduce( (acc, current) => acc + current );
      initBalances[memberId] = total;
      return null;
    });
    setBalances(initBalances);
    return;
  };

  useEffect(() => {
    if (transactions && groupMembers) {      
      calcBalances(currentGroup.groupMembers, transactions);
    };          
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions, groupMembers]);

  return (
    <>
    {currentGroup && <MemberDisplay balances={balances} />}      
    <div className="animated fadeIn w-11/12 md:w-9/12 lg:w-6/12 mx-auto mt-8 flex flex-wrap flex-column content-center justify-center">
      {currentGroup && <IncomeExpenses />} 
      {currentGroup && <AddTransaction />} 
      {currentGroup && <TransactionList />}       
    </div>
    </>
  )
}