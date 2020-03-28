import React from 'react';
import { MemberDisplay } from './MemberDisplay';
import { IncomeExpenses } from './IncomeExpenses';
import { AddTransaction } from './AddTransaction';
import { TransactionList } from './TransactionList';

export const MainAppView = () => {
  return (
    <>
    <MemberDisplay />      
    <div className="w-11/12 md:w-8/12 lg:w-4/12 mx-auto mt-8 flex flex-wrap flex-column content-center justify-center">
      <IncomeExpenses />
      <AddTransaction /> 
      <TransactionList />      
    </div>
    </>
  )
}