import React, { useContext } from 'react';
import { GroupListener } from '../../context/GroupListener';
import { MemberDisplay } from '../MemberDisplay';
import { IncomeExpenses } from '../IncomeExpenses';
import { AddTransaction } from '../AddTransaction';
import { TransactionList } from '../TransactionList';

export const MainAppView = () => {
  const { currentGroup } = useContext(GroupListener);
  const members = currentGroup ? currentGroup.groupMembers : null;
  const transactions = currentGroup ? currentGroup.transactions : null;

  const getMemberIds = (members) => {
    let arr = [];
    if (members) {
      members && Object.keys(members).map( (groupmember) => (
        arr.push(groupmember)
      ));      
    }
    return arr;
  };

  const calcBalances = () => {
    console.log(getMemberIds(members))
    console.log(transactions)
  };

  calcBalances();

  return (
    <>
    {currentGroup && <MemberDisplay />}      
    <div className="animated fadeIn w-11/12 md:w-9/12 lg:w-6/12 mx-auto mt-8 flex flex-wrap flex-column content-center justify-center">
      {currentGroup && <IncomeExpenses />} 
      {currentGroup && <AddTransaction />} 
      {currentGroup && <TransactionList />}       
    </div>
    </>
  )
}