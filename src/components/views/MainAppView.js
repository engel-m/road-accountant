import React, { useContext } from 'react';
import { GroupListener } from '../../context/GroupListener';
import { MemberDisplay } from '../MemberDisplay';
import { IncomeExpenses } from '../IncomeExpenses';
import { AddTransaction } from '../AddTransaction';
import { TransactionList } from '../TransactionList';
import { GroupSelect } from './GroupSelect';

export const MainAppView = () => {
  const { currentGroup, pendingGroup } = useContext(GroupListener);

  return (
    <>
    {currentGroup && <MemberDisplay />}      
    <div className="animated fadeIn w-11/12 md:w-8/12 lg:w-4/12 mx-auto mt-8 flex flex-wrap flex-column content-center justify-center">
      {!currentGroup && !pendingGroup && <GroupSelect />}        
      {currentGroup && <IncomeExpenses />} 
      {currentGroup && <AddTransaction />} 
      {currentGroup && <TransactionList />}       
    </div>
    </>
  )
}