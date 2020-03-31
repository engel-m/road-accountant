import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { NavLink } from './NavLink';
import { LoginLogoutButton } from './LoginLogoutButton';
  
export const Navtop = () => {
  const { renderStatus, loggedIn, toggleComponent } = useContext(GlobalContext); 
  const currentView = renderStatus.currentView; 

  const toHomescreen = () => {
    loggedIn ? toggleComponent('MainAppView') : toggleComponent('Landing')
  }

  // Navbar Toggle
  document.addEventListener('DOMContentLoaded', function () {
    // Get all "navbar-burger" elements
    var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    // Add a click event on each navbar burger
    if ($navbarBurgers.length > 0) {
      $navbarBurgers.forEach(function ($el) {
        $el.addEventListener('click', function () {
            // Hide the main-nav
        document.getElementById('main-nav').classList.toggle('hidden');
        });
      });
    }
  });

  return (
  <header>
  <div className="py-4 px-2 lg:mx-4 xl:mx-12 ">
      <div className="">
          <nav className="border-b flex items-center justify-between flex-wrap pb-4">
              <div className="flex items-center flex-no-shrink text-white mr-6 ">
                <img onClick={toHomescreen} className="h-12 w-12 ml-2 mr-2 cursor-pointer" width="64" height="64" viewBox="0 0 64 64" 
                 src="img/road-icon.svg" alt="Road Accountant Logo"/>
                <span onClick={toHomescreen} className="cursor-default text-2xl font-extrabold text-purple-900 mt-2 hover:text-blue-700 font-black cursor-pointer">
                  Road Accountant</span> 
              </div>
              <div className="block lg:hidden">
                  <button
                      className="navbar-burger flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white">
                      <svg className="fill-current h-6 w-6 text-gray-700" viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg">
                          <title>Menu</title>
                          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                      </svg>
                  </button>
              </div>
              <div id="main-nav" className="w-full text-right flex-grow lg:flex items-center lg:w-auto hidden  ">
                  <div className="lg:text-base lg:flex-grow mt-2 animated jackinthebox xl:mx-8">
                    {currentView === 'MainAppView' &&  <NavLink linkText={'+ CREATE GROUP'} linkTo={'CreateGroup'} />}
                    {loggedIn ? <NavLink linkText={'>MY GROUPS'} linkTo={'MainAppView'} /> : <NavLink linkText={'CREATE ACCOUNT'} linkTo={'CreateAccount'} />}
                    <LoginLogoutButton />                  
                    <NavLink linkText={'ABOUT'} linkTo={'About'} />
                  </div>
              </div>
          </nav>
      </div>
  </div>
  </header>

  )
}


