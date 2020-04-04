import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { auth } from '../config/Firebase';

export const LoginLogoutButton = (props) => {
  const { setView, setLoggedIn } = useContext(GlobalContext);  

  const logSwitch = () => {
    if (auth.currentUser) {
      auth.signOut().then( () => {
      setLoggedIn(false);
      setView('Landing');
      }).catch(function(error) {
        console.log('Error Logging Out')
      });
    }
    else {
      setLoggedIn('VZ6bAHajMMeu7H1YFuTSYElqVQ32');
      setView('MainAppView');
    }
  }

  return (
    <>
    <span  onClick={logSwitch}
      className="block cursor-pointer lg:inline-block text-md font-bold  text-purple-900  sm:hover:border-indigo-400  hover:text-orange-500 mx-2 
       focus:text-blue-500  p-1 hover:bg-gray-300 sm:hover:bg-transparent rounded-lg">
      {auth.currentUser ? 'LOG OUT' : 'LOG IN'}
    </span>
    </>
  )
}












