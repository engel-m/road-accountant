import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { GroupListener } from '../context/GroupListener';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../config/Firebase'

export const LoginLogoutButton = () => {
  const { setView } = useContext(GlobalContext); 
  const { authUser, unsubscribeUser } = useContext(AuthContext); 
  const { unsubscribeGroup } = useContext(GroupListener); 
 
  const logSwitch = () => {
    // Log out functionality
    if (authUser) {
      if (unsubscribeUser.current) {
        unsubscribeUser.current();
        unsubscribeUser.current = null;
      }     
      if (unsubscribeGroup.current) {
        unsubscribeGroup.current();
        unsubscribeGroup.current = null;
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
    <button onClick={logSwitch}
      className="cursor-pointer lg:inline-block text-md font-bold  text-purple-900  sm:hover:border-indigo-400  hover:text-orange-500 mx-2 
       focus:text-blue-500  p-1 hover:bg-gray-300 sm:hover:bg-transparent rounded-lg">
      {authUser ? 'LOG OUT' : 'LOG IN'}
    </button>
    </>
  )
}












