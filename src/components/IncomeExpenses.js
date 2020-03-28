import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);

  const transactionsArray = transactions.map(transaction => transaction.amount);

  const income = transactionsArray.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
  const expense = (transactionsArray.filter(item => item < 0).reduce((total, item) => (total += item), 0) * -1).toFixed(2);
  const balance = transactionsArray.reduce((acc, item) => (acc += item), 0).toFixed(2);

  return (
    <>
    <div className="inline-block w-2/6 mt-12 mx-1 text-left">
      <h4 className="font-bold text-xl">Balance:</h4>
      <h1 className="font-bold text-xl">${balance}</h1>
    </div>
    <div className="inline-block w-3/6 xl:w-2/6 text-right p-2 mx-1 mt-4 bg-white rounded shadow-md">
      <div>
        <h4>Total Paid</h4>
        <p className="money plus">{income}</p>
      </div>
      <div>
        <h4>Total Spent</h4>
        <p className="money minus">{expense}</p>
      </div>
    </div>
    </>
  )
}
