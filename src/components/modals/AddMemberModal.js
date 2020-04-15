import React, { useContext, useState } from 'react';
import { GroupListener } from '../../context/GroupListener';
import { firestore, timestamp } from "../../config/Firebase.js";

export const AddMemberModal = (props) => {   
  const setModal = props.setModal;    
  const { currentGroup } = useContext(GroupListener);
  const [error, setError] = useState(''); 

  const addByName = (e) => {
    e.preventDefault();
    const form = document.querySelector('#name-form');
    const nickname = form['nickname'].value;    
    
    if (currentGroup) {
      // Generate ID for dummy user
      const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      let generatedId = ''    
      for (let i = 0; i < 20; i++) {
        generatedId += CHARS.charAt(
          Math.floor(Math.random() * CHARS.length)
        )
      }
      firestore.collection("Groups").doc(currentGroup.groupId).set({
        groupMembers: {
          [generatedId]: {
            displayName: nickname,
            email: 'User not registered',
            role: 'npc'
          }
        },
      }, {merge: true}).then (
        !error && setModal(false)
      ).catch( (error) => {
        setError(error.message)
      });    
    }
  }

  const addByEmail = (e) => {
    e.preventDefault();
    const form = document.querySelector('#email-form');
    const email = form['email'].value; 
    let notifDocId = null;
    let invitedName = null;   
    
    if (currentGroup) {
      const emailQuery = firestore.collection("Notifications").where("email", "==", email);
      emailQuery.get().then( (result) => {
        if (result.empty) {
          setError('No user found with email ' + email)
        } else {
          result.forEach( (doc) => {                        
            notifDocId = doc.id;
            invitedName = doc.data().displayName;
            let exists = (typeof currentGroup.groupMembers[notifDocId] !== 'undefined') ? true : false;
            if (exists) {
              throw new Error('User is already in group!');
            }                
            !exists && firestore.collection("Groups").doc(currentGroup.groupId).set({
              groupMembers: {
                [notifDocId]: {
                  displayName: invitedName,
                  email: email,
                  role: 'member'
                }
              },
            }, {merge: true}).then (
              firestore.collection("Notifications").doc(notifDocId).set({
                invites: {
                  [currentGroup.groupId]: {
                    groupName: currentGroup.name,
                    creatorName: currentGroup.creator.name,
                    creatorMail: currentGroup.creator.email,
                    creatorId: currentGroup.creator.id,
                    createDate: currentGroup.createDate,
                    groupId: currentGroup.groupId,
                    inviteDate: timestamp.fromDate(new Date()).toDate()
                  }
                },
              }, {merge: true})).then (
                (error === '') && setModal(false)
              ).catch( (error) => {
                console.log(error)
                setError(error.message)
              }); 
          });          
        }
      }).catch( (error) => {
        console.log(error)
        setError(error.message)
      });     
    }
  }

  return (
    <>
    {/* Modal Header */}
    <div className="modal-content py-4 text-center px-6">

      <div className="flex justify-between items-center pb-3">
        <p className="text-2xl text-indigo-700 font-bold">ADD GROUP MEMBER</p>
        <div onClick={(e) => setModal(false, e)} className="modal-close cursor-pointer z-50">
          <p className="font-black text-gray-700">X</p>
        </div>
      </div>      

      {/* Add a non-registered member by name */}
      <p className="text-lg mt-2 text-gray-800">Add a person in your group that you will manage expenses for:</p>
      <form id="name-form">        
        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-gray-700 text-xs font-bold mb-2"
            htmlFor="nickname">
            Nickname <span className="text-gray-700 normal-case italic opacity-50"></span>
          </label>
          <input
            type="nickname" id="nickname" required
            className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
            placeholder="Nickname"/>
        </div>

        <div className="text-center mt-6">
          <button
            className="modal-close px-4 bg-indigo-600 p-3 rounded-lg text-white hover:bg-indigo-400"
            type="submit" onClick={addByName}>
            Add to Group
          </button>
        </div>     
      </form>   

        <div className="w-full rounded-lg bg-gray-300 mt-6 mb-5">
          <p className="text-2xl text-indigo-700 font-bold">OR</p>
        </div>

      {/* Invite existing user by email + add to group form */}
      <p className="text-lg text-gray-800">Invite a user to see and use this group, by the e-mail they registered with:</p>
      <form id="email-form" className="mt-4">        
        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-gray-700 text-xs font-bold mb-2"
            htmlFor="email">
            User E-mail <span className="text-gray-700 normal-case italic opacity-50"></span>
          </label>
          <input
            type="email" id="email" required
            className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
            placeholder="E-mail"/>
        </div>

        <div className="text-center mt-6 mb-5">
          <button
            className="modal-close px-4 bg-indigo-600 p-3 rounded-lg text-white hover:bg-indigo-400"
            type="submit" onClick={addByEmail}>
            Invite to Group
          </button>
        </div>     
      </form>   

      {error !== '' && <div className="bg-red-100 p-3 border-red-600 border rounded"><p className="text-red-600 text-center">
          {error}</p></div>}   

    </div>    
    </>
  );
};




