import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { fbAuth } from '../config/Firebase';

export const LoginLogoutButton = (props) => {
  const { toggleComponent, setLoginStatus, loggedIn } = useContext(GlobalContext);  

  const logSwitch = () => {
    if (loggedIn) {
      fbAuth.signOut().then( () => {
      setLoginStatus(false);
      toggleComponent('Landing');
      }).catch(function(error) {
        console.log('Error Logging Out')
      });
    }
    else {
      setLoginStatus(true);
      toggleComponent('MainAppView');
    }
  }

  return (
    <>
    <span  onClick={logSwitch}
      className="block cursor-pointer lg:inline-block text-md font-bold  text-purple-900  sm:hover:border-indigo-400  hover:text-orange-500 mx-2 
       focus:text-blue-500  p-1 hover:bg-gray-300 sm:hover:bg-transparent rounded-lg">
      {loggedIn ? 'LOG OUT' : 'LOG IN'}
    </span>
    </>
  )
}












