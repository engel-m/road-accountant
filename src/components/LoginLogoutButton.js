import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { GroupListener } from '../context/GroupListener';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../config/Firebase'

export const LoginLogoutButton = () => {
  const { setView } = useContext(GlobalContext); 
  const { authUser, unsubscribeUser, setUnsubscribeUser } = useContext(AuthContext); 
  const { unsubscribeGroup, setUnsubscribeGroup} = useContext(GroupListener); 
 
  const logSwitch = () => {
    // Log out functionality
    if (authUser) {
      if (unsubscribeUser) {
        unsubscribeUser();
        setUnsubscribeUser(null);
      }     
      if (unsubscribeGroup) {
        unsubscribeGroup();
        setUnsubscribeGroup(null);
      } 

      auth.signOut()
      .then( () => {
        setView('Landing');
      }).catch( (error) => {
        console.log('Error Logging Out:' + error)
      });          
    }
    // Log in functionality
    else {
      setView('Landing');
    }
  }

  return (
    <>
    <span  onClick={logSwitch}
      className="block cursor-pointer lg:inline-block text-md font-bold  text-purple-900  sm:hover:border-indigo-400  hover:text-orange-500 mx-2 
       focus:text-blue-500  p-1 hover:bg-gray-300 sm:hover:bg-transparent rounded-lg">
      {authUser ? 'LOG OUT' : 'LOG IN'}
    </span>
    </>
  )
}












