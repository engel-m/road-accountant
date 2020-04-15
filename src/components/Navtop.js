import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { AuthContext } from '../context/AuthContext';
import { NavLink } from './NavLink';
import { LoginLogoutButton } from './LoginLogoutButton';
import { NotificationsLink } from './NotificationsLink';

  
export const Navtop = () => {   
  const { renderStatus, setView } = useContext(GlobalContext); 
  const { authUser } = useContext(AuthContext);
  const currentView = renderStatus.currentView; 
  const [burgerMenuOn, setBurgerMenuOn] = useState(false);

  return (
  <header>
  <div className="py-3 px-2 lg:mx-4 xl:mx-12 ">
    <div className="">
        <nav className="border-b flex items-center justify-between flex-wrap pb-4">
          <div className="flex items-center flex-no-shrink text-white mr-6 ">
            <img onClick={authUser ? (e) => {setView('MainAppView', e)} : (e) => {setView('Landing', e)}} className="h-12 w-12 ml-2 mr-2 cursor-pointer" width="64" height="64" viewBox="0 0 64 64" 
              src="img/road-icon.svg" alt="Road Accountant Logo"/>
            <span onClick={authUser ? (e) => {setView('MainAppView', e)} : (e) => {setView('Landing', e)}} className="text-2xl font-extrabold text-purple-900 mt-2 hover:text-blue-700 font-black cursor-pointer">
              Road Accountant</span> 
            <span className="hidden md:inline-block ml-12 text-sm font-extrabold text-green-700 mt-2 hover:text-green-600 font-black cursor-pointer">
             {authUser ? 'Logged in as ' + authUser.email : ""}</span> 
          </div>
          <div className="block lg:hidden" onClick={ (e) => {
                e.preventDefault() 
                setBurgerMenuOn(!burgerMenuOn)
              }}>
              <button 
                  className="navbar-burger flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white">
                  <svg className="fill-current h-6 w-6 text-gray-700" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <title>Menu</title>
                      <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                  </svg>
              </button>
          </div>
          <div id="main-nav" className={"w-full text-right flex-grow lg:flex items-center lg:w-auto mt-4 md:mt-2 " + (burgerMenuOn ? "" : "hidden") + " "}>
            <div className="text-xl lg:text-base lg:flex-grow mt-2 animated jackinthebox xl:mx-8">
              {authUser && <span className="md:hidden block ml-12 text-sm font-extrabold text-green-700 mt-2 hover:text-green-600 font-black cursor-pointer">
                Logged in as {authUser.email}</span>}
              {authUser && <NotificationsLink />} 
              {authUser && <NavLink linkText={'+ CREATE GROUP'} linkType={'Modal'} linkTo={'CreateGroupModal'} />}
              {authUser && <NavLink linkText={'>MY GROUPS'} linkType={'View'} 
              linkTo={ (currentView === 'GroupSelect' && authUser.selectedGroup) ? 'MainAppView' : 'GroupSelect'}/>}
              {!authUser && <NavLink linkText={'CREATE ACCOUNT'} linkType={'View'} linkTo={'CreateAccount'} />}
              <LoginLogoutButton />            
              {/* <NavLink linkText={'ABOUT'} linkType={'View'} linkTo={'About'} /> */}
            </div>
          </div>
        </nav>
    </div>
  </div>
  </header>

  )
}


