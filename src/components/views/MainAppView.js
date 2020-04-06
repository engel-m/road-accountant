import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { MemberDisplay } from '../MemberDisplay';
import { IncomeExpenses } from '../IncomeExpenses';
import { AddTransaction } from '../AddTransaction';
import { TransactionList } from '../TransactionList';
import { GroupSelect } from './GroupSelect';

export const MainAppView = () => {
  const { renderStatus } = useContext(GlobalContext);
  const [groupSelect, setGroupSelect] = useState(false);

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