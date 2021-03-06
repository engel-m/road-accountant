import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const NavLink = (props) => {
  const { setView, setModal } = useContext(GlobalContext);
  
  const linkHandler = (linkType, linkTo, e) => {
    if (linkType === 'Modal') {
      setModal(linkTo, e);
    }
    if (linkType === 'View') {
      setView(linkTo, e);
    }
  };

  return (
    <>
    <span onClick={(e) => linkHandler(props.linkType, props.linkTo, e)}
      className="block cursor-pointer lg:inline-block text-md font-bold text-purple-900 sm:hover:border-indigo-400  hover:text-orange-500 mx-2 
       focus:text-blue-500 p-1 hover:bg-gray-300 sm:hover:bg-transparent rounded-lg">
      {props.linkText}
    </span>
    </>
  )
}