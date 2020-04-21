import React, { useContext, useState } from 'react';
import { firestore, timestamp, fieldValue } from "../../config/Firebase.js";
import { AuthContext } from '../../context/AuthContext';
import { NotificationCard } from './NotificationCard';


export const NotificationsModal = (props) => {   
  const setModal = props.setModal;    
  const setView = props.setView;    
  const { authUser, demo, notifications } = useContext(AuthContext); 
  const [error, setError] = useState(''); 
  const invites = notifications ? notifications.invites : null;

  const acceptInvite = (id, e = '') => {
    (e !== '') && e.preventDefault();  
    if (demo) {
      setError('These notifications are for demo purposes. Please make a real account to use these features.');
      return;
    }  
    firestore.collection('Users').doc(authUser.uid).update({
      selectedGroup: id
    }).catch( (error) => {
      console.log(error);
      setError(error.message);
    })       
    firestore.collection('GroupsByUser').doc(authUser.uid).set({
      groups: {
        [id]: {
          createDate: invites[id].createDate,
          creator: invites[id].creatorName,
          creatorId: invites[id].creatorId,
          creatorMail: invites[id].creatorMail,
          groupId: invites[id].groupId,
          lastActivity: timestamp.fromDate(new Date()).toDate(),
          name: invites[id].groupName
        }
      }
    }, { merge: true }).then( 
      firestore.collection("Notifications").doc(authUser.uid).set({ 
        invites: {
          [id]: fieldValue.delete()
        }
      }, { merge: true })
    ).then( () => {
      setView('MainAppView');
      setModal(false); 
    }).catch( (error) => {
      console.log(error);
      setError(error.message);
    })     
  };

  const deleteInvite = (id, e = '') => {
    (e !== '') && e.preventDefault();    
    firestore.collection("Notifications").doc(authUser.uid).set({ 
      invites: {
        [id]: fieldValue.delete()
      }
    }, { merge: true })
    .then( () => {
      setModal(false); 
    }).catch( (error) => {
      console.log(error);
      setError(error.message);
    })      
  };

  return (
    <>
    {/* Modal Header */}
    <div className="modal-content w-full py-4 text-center px-6">

      <div className="flex justify-between items-center pb-3">
        <p className="text-2xl text-indigo-700 font-bold">NOTIFICATIONS</p>
        <div onClick={(e) => setModal(false, e)} className="modal-close cursor-pointer z-50">
          <p className="font-black text-gray-700">X</p>
        </div>
      </div>      

      {/* Notification Cards */}
      <div className="animated fadeIn w-full mx-auto md:mt-2 flex flex-wrap flex-column items-center justify-center">        
      { invites && Object.keys(invites).map( (invite, index) => (
            <NotificationCard key={invites[invite].groupId} acceptInvite={acceptInvite} deleteInvite={deleteInvite}
              invite={invites[invite]} userId={authUser.uid}/>
          ))}
      </div>  

      {error !== '' && <div className="bg-red-100 p-3 border-red-600 border rounded"><p className="text-red-600 text-center">
          {error}</p></div>}  

    </div>  
    </>
  );
};




