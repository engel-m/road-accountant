import React, {useState, useContext} from 'react'
import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = e => {
    e.preventDefault();

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount
    }

    addTransaction(newTransaction);
  }

  return (
    <div className="w-full">
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
        </div>
        <div className="form-control">
          <label htmlFor="amount">Amount</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
        </div>
        <button className="block mx-auto mt-5 mb-3 w-1/2 px-4 bg-purple-600 p-3 rounded-lg text-white hover:bg-purple-500 focus:outline-none">Add Transaction</button>
        <button className="block mx-auto mb-6 w-1/2 px-4 bg-orange-500 p-3 rounded-lg text-white hover:bg-orange-400 focus:outline-none">Fuel Cost Tool</button>
      </form>
    </div>
  )
}
