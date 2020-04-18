import React, { useState} from 'react';

export const Transaction = ({ transaction, id, deleteTransaction, members, creatorId, authId }) => {
  const [confirmAlert, setConfirmAlert] = useState(false);
  const date = transaction.timestamp.toDate().toLocaleDateString();
  const groupMemberCount = Object.keys(members).length || 0;
  let isCreator = authId ? (creatorId === authId) ? true : false : false;
  let spenderArr = [];

  transaction.spenders.map( spender => { 
    return spenderArr.push(members[spender].displayName || null) 
  }); 
  const spenderNames = spenderArr.join(', ');

  return (
    <>
    <li className={"relative flex w-full flex-wrap justify-between items-center p-2 my-2 bg-white shadow-lg text-gray-800 border-l-4 border-r-4 border-red-600"
        + (confirmAlert && " bg-red-100 shadow-inner ")}>
      {/* Amount & Desc */}
      <div className="flex justify-left w-full md:w-8/12 items-center">
        {transaction.type === 'expense' && <span className="text-red-600 w-1/4 md:w-2/12 p-2 bg-red-100 rounded-lg">{transaction.amount}</span>}
        <span className="w-3/4 ml-3">{transaction.desc}</span>
      </div>
      {/* Date & Spenders */}
      <div className="flex justify-left my-3 md:my-0 md:justify-left w-full md:w-auto items-center">
        <span className="ml-1 text-gray-600">{date} |</span>
        <span className="ml-1 italic"> by: {spenderArr.length === groupMemberCount ? "Group" : spenderNames}</span>
      </div>                 
      {/* Delete button */}
      {isCreator && <span onClick={() => setConfirmAlert(true)} 
        className="max-w-2/12 cursor-pointer bg-red-500 text-white rounded p-2">Delete</span> }
    </li>

    <div className={"flex flex-wrap w-full p-3 w-8/12 bg-red-200 text-bold justify-center items-center text-center rounded-lg text-xl " + ( confirmAlert ? "" : "hidden") + " "}>
      <h1 className={"w-full font-bold text-red-700 text-lg md:text-lg mb-4"}>Are you sure you want to delete this expense? ({transaction.amount})</h1>
      <div onClick={() => setConfirmAlert(false)} 
        className="block mx-2 w-5/12 bg-red-600 p-2 rounded-lg text-white focus:outline-none cursor-pointer shadow hover:shadow-inner 
          border border-transparent hover:border-red-700">Cancel</div>
      <div onClick={() => deleteTransaction(id)}   
        className="block mx-2 w-2/12 bg-indigo-800 p-2 rounded-lg text-white focus:outline-none cursor-pointer shadow hover:shadow-inner 
          border border-transparent hover:border-indigo-900">&#10003;</div>
    </div>
    </>
  )
}
