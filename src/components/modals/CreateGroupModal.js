import React, { useContext, useState } from 'react';
import { auth, firestore } from "../../config/Firebase.js";

export const CreateGroupModal = (props) => {  
  const [error, setError] = useState('');  
  const  setModal  = props.setModal; 
  
  const formHandler = (e) => {
    e.preventDefault();
    const form = document.querySelector('#modal-form');
    const groupname = form['groupname'].value;    

    firestore.collection("Groups").add({
      name: groupname,
      groupMembers: {
        [auth.currentUser.uid]: {
          displayName: auth.currentUser.displayName,
          email: auth.currentUser.email,
          role: 'creator'
        }
      }
    }).then ( returned => {
      firestore.collection("Users").doc(auth.currentUser.uid).update({
        selectedGroup: returned.im.path.segments[1]
      })      
    }).then (
      setModal(false)
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
            type="groupname" id="groupname" maxLength="30" required
            className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
            placeholder="Group Name"/>
        </div>

        {/* <div className="relative w-full mb-3">
          <label
            className="block uppercase text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-password">
            Email <span className="text-gray-700 normal-case italic opacity-50">(Required)</span>
          </label>
          <input
            type="email"
            className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
            placeholder="Email"/>
        </div> */}

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




