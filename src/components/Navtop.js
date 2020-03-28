import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Navtop = () => {
  const { renderToggle } = useContext(GlobalContext);

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

  const toggleTest = e => {
    e.preventDefault();
    renderToggle('addMemberModal');
  }

  return (
  <header>
  <div className="py-4 px-2 lg:mx-4 xl:mx-12 ">
      <div className="">
          <nav className="flex items-center justify-between flex-wrap  ">
              <div className="flex items-center flex-no-shrink text-white mr-6 ">
                <img className="h-12 w-12 ml-2 mr-2" width="64" height="64" viewBox="0 0 64 64" src="img/road-icon.svg" alt="Road Accountant Logo"/>
                <span className="cursor-default text-2xl font-extrabold text-purple-900 mt-2 hover:text-blue-700 font-black">Road Accountant</span> 
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
                  <div className="text-sm lg:flex-grow mt-2 animated jackinthebox xl:mx-8">
                      <a href="#home"
                          className="block lg:inline-block text-md font-bold  text-purple-900  sm:hover:border-indigo-400  hover:text-orange-500 mx-2 focus:text-blue-500  p-1 hover:bg-gray-300 sm:hover:bg-transparent rounded-lg">
                          HOME
                      </a>
                      <a href="#home"
                          className="block lg:inline-block text-md font-bold  text-gray-900  sm:hover:border-indigo-400  hover:text-orange-500 mx-2 focus:text-blue-500  p-1 hover:bg-gray-300 sm:hover:bg-transparent rounded-lg">
                          LOGIN
                      </a>
                      <a href="#home"
                          className="block lg:inline-block text-md font-bold  text-gray-900  sm:hover:border-indigo-400  hover:text-orange-500 mx-2 focus:text-blue-500  p-1 hover:bg-gray-300 sm:hover:bg-transparent rounded-lg">
                          ABOUT
                      </a>
                      <button onClick={toggleTest} className="modal-close px-4 bg-indigo-600 p-3 rounded-lg text-white hover:bg-indigo-400">Add</button>
                  </div>
                  <div className="text-2xl my-1 mx-3">
                      <img src="img/shopping.png" className="h-6" alt=""/>
                  </div>

              </div>
          </nav>
      </div>
  </div>
  </header>

  )
}


