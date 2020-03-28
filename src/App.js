import React, { useContext } from 'react';
import { Navtop } from './components/Navtop';
import { IncomeExpenses } from './components/IncomeExpenses';
import { TransactionList } from './components/TransactionList';
import { AddTransaction } from './components/AddTransaction';
import { MemberDisplay } from './components/MemberDisplay';
import { Modals } from './components/Modals';
import { AddMemberModal } from './components/AddMemberModal';

import { GlobalProvider, GlobalContext } from './context/GlobalState';

function App() {
  const { renderStatus } = useContext(GlobalContext);
  return (
    <GlobalProvider>      
      <Navtop />             
      <MemberDisplay />
      
      <Modals />
            
      <div className="w-11/12 md:w-8/12 lg:w-4/12 mx-auto mt-8 flex flex-wrap flex-column content-center justify-center">              
        <IncomeExpenses />
        <TransactionList />
        <AddTransaction />
      </div>
    </GlobalProvider>
  );
}

export default App;
