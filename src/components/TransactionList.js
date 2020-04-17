import React, { useContext } from 'react';
import { Transaction } from './Transaction';

import { GlobalContext } from '../context/GlobalState';

export const TransactionList = () => {
  const { transactions } = useContext(GlobalContext);

  return (
    <div className="w-screen mb-12 px-10 font-fira overflow-x-hidden overflow-y-auto scrollable border-b border-gray-400" id="transactionlist">
      <h3>History</h3>
      <ul className="list">
        {transactions.map(transaction => (<Transaction key={transaction.id} transaction={transaction} />))}
      </ul>
    </div>
  )
}
