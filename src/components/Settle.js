import React, { useState, useEffect, useContext } from 'react';
import { settleCalculator } from '../helpers/settleCalculator';
import { generatePushID } from "../helpers/pushIdGenerator.js";
import { AuthContext } from '../context/AuthContext';
import { firestore, timestamp } from '../config/Firebase';

export const Settle = ({ groupId, groupMembers, creatorId, balances }) => {
  const { authUser } = useContext(AuthContext); 
  const [settleOpen, setSettleOpen] = useState(false); 
  const [settles, setSettles] = useState(null); 
  const [settleConfirm, setSettleConfirm] = useState(null); 
  const [error, setError] = useState(null); 
  const [success, setSuccess] = useState(null); 
  const members = typeof groupMembers !== 'undefined' ? groupMembers : null;

  const currentId = authUser ? authUser.uid : null;

  const calcSettles = (balancesObj) => {
    const results = settleCalculator(balancesObj); 
    setSettles(results);
  }

  const doSettle = () => {
    const transactionId = generatePushID();
    const time = timestamp.fromDate(new Date()).toDate();

    // Execute firestore send of settle to transaction list
    firestore.collection("Groups").doc(groupId).set({
      lastActivity: time,
      lastSettled: time,
      transactions: {
        [transactionId]: {
          amount: 0,
          desc: 'Group did settlement!',
          dividedAmount: 0, 
          payers: null,
          spenders: null,
          timestamp: time,
          type: 'settlement'
        }
      }      
    }, {merge: true}).then( () => {
      setSettleOpen(false);
      setSettles(null);
      setSuccess('Success! Settled');   
      console.log('did settle!');  
      setTimeout(() => setSuccess(''), 3000);  
    }).catch( (error) => {
      setError(error.message)
    });    
  }     
 
  useEffect(() => {
    if (balances){
      calcSettles(balances);
    }
  }, [balances, groupMembers]);

  return (
  <>
  {/* When button is pushed and the settling display is open */}
  { settleOpen && 

  <div className="relative flex w-11/12 md:w-8/12 flex-wrap justify-center items-center bg-white rounded-lg shadow py-2 text-center text-xl">
    <span className="w-9/12 text-gray-600 font-bold border-b mb-4">Transfers to settle and set everyone at 0 debts</span>
    <div onClick={(e) => setSettleOpen(false)} className="absolute top-0 right-0 mb-3 px-3 py-1 bg-red-600 cursor-pointer font-bold text-xl 
          text-white rounded-lg hover:bg-red-500 shadow border border-gray-200">
            X
    </div>
    {settles && members && settles.map( (transfer, key) => (
      <div key={key} className="w-full text-gray-700 font-bold">
        <span className={"text-" + groupMembers[transfer.from].color + " "}>{groupMembers[transfer.from].displayName}</span>
        <span className="text-gray-700"> sends to </span>
        <span className={"text-" + groupMembers[transfer.to].color + " "}>{groupMembers[transfer.to].displayName}</span>
        <span className="text-gray-700">: </span>
        <span className="text-gray-700">{transfer.amount.toFixed(2)}</span> 
      </div>
    ))}    
    { (currentId !== creatorId) && <span className="w-9/12 text-base italic text-gray-500 font-bold border-t my-6">
      Your group creator can confirm settlement to reset the balances to 0 but keep the group and expense history.</span> 
    }     
    {/* When creator is viewing the group, can confirm settlement and reset the balances */}
    { (currentId === creatorId) && 
      <>
      <span className="w-9/12 text-base italic text-gray-500 font-bold border-t my-6">
      Confirm settlement has been done by members? This will reset the balances to 0 but keep the group and expense history.</span>
      <div onClick={ () => setSettleConfirm(!settleConfirm) } 
        className="w-4/6 md:w-5/12 text-center py-3 mb-4 bg-green-500 rounded-lg shadow-lg border-2 border-gray-300 
        cursor-pointer hover:bg-green-400 hover:shadow-inner">
        <span className="text-white text-lg md:text-2xl">Confirm Settlement</span>
      </div> 
      { settleConfirm && 
      <div className="flex flex-wrap w-full p-3 w-8/12 bg-red-200 text-bold justify-center items-center text-center rounded-lg text-xl">
        <h1 className={"w-full font-bold text-red-700 text-lg md:text-lg mb-4"}>Are you sure you want to settle and reset?</h1>
        <div onClick={() => setSettleConfirm(false)} 
          className="block mx-2 w-5/12 bg-red-600 p-2 rounded-lg text-white focus:outline-none cursor-pointer shadow hover:shadow-inner 
            border border-transparent hover:border-red-700">Cancel</div>
        <div onClick={() => doSettle()}   
          className="block mx-2 w-2/12 bg-indigo-800 p-2 rounded-lg text-white focus:outline-none cursor-pointer shadow hover:shadow-inner 
            border border-transparent hover:border-indigo-900">&#10003;
        </div>
      </div>
      }
      </>
    }    

  </div>}
    {/* Success alert */}    
    {success && <div id="settle-success-bar" 
      className="flex w-full mt-6 h-16 bg-green-100 p-3 border-green-600 border rounded items-center justify-center animated">
      <p className="text-green-600">{success}</p></div>}   
    {error && <div className="flex w-full my-4 h-16 bg-red-100 p-3 border-red-600 border rounded items-center justify-center">
      <p className="text-red-600">{error}</p></div>}   

    {/* The Big Settle Button */}
  <div className="flex w-full text-center justify-center">
    <div onClick={ (e) => { setSettleOpen(true) } } className="w-3/6 md:w-3/12 items-center justify-center 
      py-3 mt-4 bg-green-500 rounded-lg shadow-lg border-2 border-gray-300 cursor-pointer hover:bg-green-400 hover:shadow-inner">
      <span className="text-white font-fira text-lg md:text-xl">Settle All Differences</span>
    </div>
  </div>
  </>
  )
}
