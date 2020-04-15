import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { AuthContext } from '../context/AuthContext';

export const NotificationsLink = () => {
  const { setModal } = useContext(GlobalContext); 
  const { notifications } = useContext(AuthContext); 

  const invites = notifications ? notifications.invites : null;
  const amount = invites ? Object.keys(invites).length : null; 

  return (
    <>
    {/* <span onClick={(e) => setModal('Notifications', e)} */}
    { amount ? <span onClick={(e) => setModal('NotificationsModal', e)}
        className="cursor-pointer lg:inline-block text-sm font-bold bg-green-500 text-white sm:hover:border-indigo-400 mx-2 
          p-1 hover:bg-green-600 hover:shadow-lg rounded-lg">
        {amount}  NEW INVITES!</span> 
      : null }
    </>
  )
}
