import React, { useState, useEffect } from 'react';
import { settleCalculator } from '../helpers/settleCalculator';

export const Settle = ({ groupMembers, balances }) => {
  const [settleOpen, setSettleOpen] = useState(false); 
  const [settles, setSettles] = useState(null); 
  const members = typeof groupMembers !== undefined ? groupMembers : null;
  
  const calcSettles = (balancesObj) => {
    let results = settleCalculator(balancesObj); 
    setSettles(results);
  }

  const handleWindow = (e) => {
    e.preventDefault(); 
    setSettleOpen(!settleOpen);    
  }
 
  useEffect(() => {
    if (balances){
      calcSettles(balances);
    }
  }, [balances, groupMembers]);

  return (
  <>
  { settleOpen && 
  <div className="flex w-11/12 md:w-8/12 flex-wrap justify-center items-center bg-white rounded-lg shadow py-2 text-center text-xl">
    <span className="w-9/12 text-gray-600 font-bold border-b mb-4">Suggested transfers to settle and set everyone at 0 debts</span>
    {settles && members && Object.keys(settles).map( (id) => (
      <div key={id} className="w-full text-gray-700 font-bold">
        <span className={"text-" + groupMembers[id].color + " "}>{groupMembers[id].displayName}</span>
        <span className="text-gray-700"> sends to </span>
        <span className={"text-" + groupMembers[settles[id].to].color + " "}>{groupMembers[settles[id].to].displayName}</span>
        <span className="text-gray-700">: </span>
        <span className="text-gray-700">{settles[id].amount.toFixed(2)}</span> 
      </div>
    ))}    
    <span className="w-9/12 text-base italic text-gray-500 font-bold border-t my-6">
      Your group creator can confirm settlement to reset the balances but keep the group and expense history.</span>     
  </div>}


  <div onClick={ (e) => { handleWindow(e) } } 
    className="w-4/6 md:w-5/12 text-center py-3 mt-4 bg-green-500 rounded-lg shadow-lg border-2 border-gray-300 
    cursor-pointer hover:bg-green-400 hover:shadow-inner">
    <span className="text-white text-lg md:text-2xl">Settle All Differences</span>
  </div>
  </>
  )
}
