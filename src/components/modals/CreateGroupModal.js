import React, { useState, useContext } from 'react';
import { auth, firestore, timestamp } from "../../config/Firebase.js";
import { AuthContext } from '../../context/AuthContext';


export const CreateGroupModal = (props) => {  
  const { demo } = useContext(AuthContext); 
  const [error, setError] = useState('');  
  const setModal = props.setModal; 
  
  const formHandler = (e) => {
    e.preventDefault();
    if (demo) {
      setError('Please make a real account to create new groups!');
      return;
    }  
    const form = document.querySelector('#modal-form');
    const groupname = form['groupname'].value;       
    const time = timestamp.fromDate(new Date()).toDate();
    let createdGroupId = null;

    firestore.collection("Groups").add({
      groupMembers: {
        [auth.currentUser.uid]: {
          color: 'green-500',
          displayName: auth.currentUser.displayName,
          email: auth.currentUser.email,
          role: 'creator'
        }
      },
      creator: {
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
        id: auth.currentUser.uid
      },
      createDate: time,
      demo: false,
      lastActivity: time,
      lastSettled: null,
      name: groupname,
      transactions: null
    }).then ( returned => {
      createdGroupId = returned.im.path.segments[1];
      firestore.collection("GroupsByUser").doc(auth.currentUser.uid).set({
        demo: false,
        groups: {
          [createdGroupId]: {
            groupId: createdGroupId,
            name: groupname,
            creator: auth.currentUser.displayName,
            creatorId: auth.currentUser.uid,
            creatorMail: auth.currentUser.email,
            createDate: timestamp.fromDate(new Date()).toDate(),
            lastActivity: timestamp.fromDate(new Date()).toDate()
          }
        }        
      }, {merge: true})   
    }).then ( () => {
      firestore.collection("Users").doc(auth.currentUser.uid).update({
        selectedGroup: createdGroupId
      })      
    }).then (
      () => setModal(false)
    ).catch( (error) => {
      setError(error.message)
    });    
  }

  return (
    <>
    {/* Modal Header */}
    <div className="modal-content py-4 text-center px-6">

      <div className="flex justify-between items-center pb-3">
        <p className="text-2xl text-indigo-600 font-bold">CREATE A GROUP</p>
        <div onClick={(e) => setModal(false, e)} className="modal-close cursor-pointer z-50">
          <p className="font-black text-gray-700">X</p>
        </div>
      </div>

      {/* Content */}
      <form id="modal-form">
        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-gray-700 text-xs font-bold mb-2"
            htmlFor="groupname">
            Group Name <span className="text-gray-700 normal-case italic opacity-50">(Required)</span>
          </label>
          <input
            type="text" id="groupname" minLength="3" maxLength="40" required
            className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
            placeholder="Group Name"/>
        </div>

        {error !== '' && <div className="bg-red-100 p-3 border-red-600 border rounded"><p className="text-red-600 text-center">
          {error}</p></div>}   

        <div className="text-center mt-6">
          <button
            className="modal-close px-4 bg-indigo-600 p-3 rounded-lg text-white hover:bg-indigo-400"
            type="submit" onClick={formHandler}>
            Create Group
          </button>
        </div>
      </form>   

    </div>    
    </>
  );
};




