import React, { useState} from 'react';

export const Transaction = ({ transaction, id, deleteTransaction, members, creatorId, authId }) => {
  const [confirmAlert, setConfirmAlert] = useState(false);
  let isCreator = authId ? (creatorId === authId) ? true : false : false;
  let spenderNames = [];

  transaction.spenders.map( spender => { 
    return spenderNames.push(members[spender].displayName || null) 
  }); 
  spenderNames = spenderNames.join(', ');

  return (
    <li className="relative flex justify-between items-center p-2 my-2 bg-white shadow-lg text-gray-800 border-l-4 border-r-4 border-red-600">
      <div className="flex justify-left w-8/12 items-center">
        <span className="w-2/12 p-2 bg-red-100 rounded-lg">{transaction.amount}</span> 
        <span className="ml-3">{transaction.desc}</span>
        <span className="ml-3">/  by: {spenderNames}</span>
      </div>                 
      {isCreator && <span onClick={() => deleteTransaction(id)} className="cursor-pointer bg-red-500 text-white rounded p-2">Delete</span> }
    </li>
  )
}
