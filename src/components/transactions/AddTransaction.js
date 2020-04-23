import React, {useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { GroupListener } from '../../context/GroupListener';
import { firestore, timestamp } from '../../config/Firebase';
import { generatePushID } from "../../helpers/pushIdGenerator.js";
import { SpenderCheckbox } from "./SpenderCheckbox.js";
import { PayerCheckbox } from "./PayerCheckbox.js";

export const AddTransaction = () => {
  const { authUser } = useContext(AuthContext);
  const { currentGroup } = useContext(GroupListener);
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [windowOpen, setWindowOpen] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const members = currentGroup ? currentGroup.groupMembers : null;
  
  const onAdd = e => {
    e.preventDefault();
    setSubmitting(true);    
    let spenders = [];
    let payers = [];
    let dividedAmount = null;
    let transactionId = generatePushID();
    let time = timestamp.fromDate(new Date()).toDate();
    const spendCheckboxes = document.querySelectorAll('.spend-checkbox');
    const payCheckboxes = document.querySelectorAll('.pay-checkbox');

    spendCheckboxes.forEach( (checkbox) => {
      checkbox.checked && spenders.push(checkbox.value);
    });
    payCheckboxes.forEach( (checkbox) => {
      checkbox.checked && payers.push(checkbox.value);
    });

    // Check for incorrect inputs, otherwise move on to update Firestore DB
    if ( (text === '') || (amount === '') ) {
      setError('Please fill in an amount and a description.')
      setSubmitting(false);
      return null;
    } else if (!spenders.length || !payers.length) {
      setError('Please fill in both who paid the expense and who participated.')
      setSubmitting(false);
      return null;
    } else {
      dividedAmount = Math.abs(amount / spenders.length).toFixed(2);

      // Execute firestore send of transaction
      firestore.collection("Groups").doc(currentGroup.groupId).set({
        lastActivity: time,
        transactions: {
          [transactionId]: {
            amount: Math.abs(amount).toFixed(2),
            desc: text,
            dividedAmount: dividedAmount, 
            payers: payers,
            spenders: spenders,
            timestamp: time,
            type: 'expense'
          }
        }      
      }, {merge: true}).then( () => {
        setAmount('');    
        setText('')  
        setSubmitting(false);
        setWindowOpen(false);
        setSuccess('Success! Added "' + text + '"');      
        setTimeout(() => setSuccess(''), 3000);  
      }).catch( (error) => {
        setError(error.message)
        setSubmitting(false);
      });    
    }     
  }

  return (
    <>
    {success !== '' && <div id="transaction-success-bar" 
      className="flex w-full mt-6 h-16 bg-green-100 p-3 border-green-600 border rounded items-center justify-center animated">
      <p className="text-green-600">{success}</p></div>}   

    <div className={((windowOpen && !submitting) ? "" : "hidden ") + "w-full animated fadeIn slow"}>
      <div className="w-full flex justify-between items-end">
        <h3 className="font-bold font-fira text-lg text-indigo-500 w-2/3">Add new group expense</h3>
        <div onClick={(e) => setWindowOpen(false)} className="mb-3 px-3 py-1 bg-red-600 cursor-pointer font-bold text-xl 
          text-white rounded-lg hover:bg-red-500 shadow border border-gray-200">
            X
        </div>
      </div>

      {error !== '' && <div className="flex w-full my-4 h-16 bg-red-100 p-3 border-red-600 border rounded items-center justify-center">
        <p className="text-red-600">{error}</p></div>}   

      <form onSubmit={!submitting ? onAdd : () => {}} id="add-form" className="font-fira">
        <div className="form-control">
          <label htmlFor="amount">Amount</label>
          <input type="number" min="0" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Number amount..." 
            required max="999999" />
        </div>
        <div className="form-control">
          <label htmlFor="text">Description of expense</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Text description here..." 
            required minLength="3" maxLength="150" />
        </div>
        <h1 className="mt-6 italic text-center">Who participated in this expense? Check name(s), expense will be split among those</h1>
        <div className="flex items-center content-center flex-wrap mb-4 justify-center">
          {members && Object.keys(members).map( member => (  
            <SpenderCheckbox key={member} memberId={member} displayName={members[member].displayName} />
          ))}
        </div>        
        <h1 className="mt-3 italic text-center">Who paid for it this time?</h1>
        <div className="flex items-center content-center flex-wrap mb-8 justify-center">
          {members && Object.keys(members).map( member => (  
            <PayerCheckbox key={member} memberId={member} displayName={members[member].displayName} authId={authUser.uid} />
          ))}
        </div>   
        {error !== '' && <div className="flex w-full my-4 h-16 bg-red-100 p-3 border-red-600 border rounded mt-2  items-center justify-center">
          <p className="text-red-600">{error}</p></div>}   
        <button type="submit"
          className="block mx-auto mt-4 w-1/2 px-4 bg-indigo-700 p-3 rounded-lg text-white hover:bg-indigo-600 focus:outline-none shadow border border-gray-200">
          Add it!</button>
      </form>
    </div>

    <div className="w-full font-fira">
      {windowOpen ? null : <button onClick={(e) => {e.preventDefault(); setWindowOpen(true)}} 
        className="block mx-auto mt-8 mb-3 w-1/2 px-4 bg-indigo-700 p-3 rounded-lg text-white hover:bg-indigo-600 focus:outline-none
        shadow border border-gray-200">Add Expense</button>}
      {/* Possibly to add later */}
      {/* <button className="block mx-auto mt-3 mb-6 w-1/2 px-4 bg-blue-500 p-3 rounded-lg text-white hover:bg-blue-400 focus:outline-none
        shadow border border-gray-200"><span role="img" aria-label="fuel-icon">&#9981;</span>  Fuel Cost Tool</button> */}
    </div>
    </>
  )
}
