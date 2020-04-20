import React, { useState} from 'react';

export const Transaction = ({ transaction, id, deleteTransaction, members, creatorId, authId }) => {
  const [confirmAlert, setConfirmAlert] = useState(false);
  const date = transaction.timestamp.toDate().toLocaleDateString();
  const groupMemberCount = Object.keys(members).length || 0;
  const floatAmount = parseFloat(transaction.amount);
  const amount = Number.isInteger(floatAmount) ? parseInt(floatAmount) : floatAmount.toFixed(2);
  let isCreator = authId ? (creatorId === authId) ? true : false : false;
  let spenderArr = [];
  let payerInfo = {};
  const settlement = transaction && transaction.type === 'settlement' ? true : false;


  transaction && (typeof transaction.spenders !== 'undefined') && transaction.spenders && transaction.spenders.map( spender => { 
    return spenderArr.push(members[spender].displayName || 'Unknown') 
  }); 
  const spenderNames = spenderArr.join(', ');
  
  transaction && (typeof transaction.payers !== 'undefined') && transaction.payers && transaction.payers.forEach( payer => { 
    payerInfo.displayName = members[payer].displayName || 'Unknown';
    payerInfo.color = members[payer].color || 'gray-800';
  });


  return (
    <>
    <li className={"relative rounded-sm flex w-full flex-wrap justify-between items-center p-2 my-2 bg-white shadow text-gray-800 border-l-4 border-r-4 border-red-300 "
        + (confirmAlert && " bg-red-100 shadow-inner ") + (settlement && " bg-green-300 border-green-500 ")}>
      {/* Amount & Desc */}
      <div className="flex justify-left w-full lg:w-2/4 items-center">
        {transaction.type === 'expense' && <span className="text-red-600 w-3/12 lg:w-2/12 p-2 bg-red-100 rounded-lg">{amount}</span>}
        <span className="w-10/12 ml-2">{transaction.desc}</span>
      </div>
      {/* Date & Spenders */}
      <div className="flex flex-wrap justify-center my-3 lg:my-0 lg:justify-end text-center lg:text-right w-full lg:w-2/4 items-center">
        <div className="w-full lg:w-11/12">
          <span className="ml-1 italic">{spenderArr.length === groupMemberCount ? "Group" : spenderNames}</span>
          <span className="ml-1 text-gray-600">| {date} |</span>
          <span className={"text-" + payerInfo.color + " ml-1 text-center"}>{payerInfo.displayName}</span>
          {!settlement && <img className="hidden lg:inline mr-1" width="32" height="32" src="img/wallet-icon.png" alt="Wallet Icon" />}
        </div>
        {/* Delete button on large screens */}
        {isCreator && <span onClick={() => setConfirmAlert(true)} 
        className="w-1/3 md:w-1/5 lg:w-1/12 cursor-pointer bg-red-500 text-white text-center 
          text-lg font-bold rounded p-2 mt-2 lg:mt-0 hover:bg-red-400">X</span> }     
      </div>               
    </li>

    <div className={"flex flex-wrap w-full p-3 w-8/12 bg-red-200 text-bold justify-center items-center text-center rounded-lg text-xl " + ( confirmAlert ? "" : "hidden") + " "}>
      <h1 className={"w-full font-bold text-red-700 text-lg md:text-lg mb-4"}>Are you sure you want to delete this expense? ({transaction.amount})</h1>
      <div onClick={() => setConfirmAlert(false)} 
        className="block mx-2 w-5/12 bg-red-600 p-2 rounded-lg text-white focus:outline-none cursor-pointer shadow hover:shadow-inner 
          border border-transparent hover:border-red-700">Cancel</div>
      <div onClick={() => deleteTransaction(id)}   
        className="block mx-2 w-2/12 bg-indigo-800 p-2 rounded-lg text-white focus:outline-none cursor-pointer shadow hover:shadow-inner 
          border border-transparent hover:border-indigo-900">&#10003;
      </div>
    </div>
    </>
  )
}
