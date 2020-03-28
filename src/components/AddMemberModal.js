import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const AddMemberModal = () => {
  const { renderToggle } = useContext(GlobalContext);

  const toggleAddModal = e => {
    e.preventDefault();
    renderToggle('addMemberModal');
  }
 
  return (
    <>
    <div className="animated fadeIn modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
      <div className="modal-overlay absolute w-full h-full bg-gray-800 opacity-75"></div>
      
      <div className="modal-container bg-gray-100 w-11/12 md:max-w-md mx-auto rounded-md shadow-lg z-50 overflow-y-auto">
        
        <div onClick={toggleAddModal} className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
          <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
          </svg>
          <span className="text-sm">(Esc)</span>
        </div>

        {/* Add margin if you want to see some of the overlay behind the modal */}
        <div className="modal-content py-4 text-center px-6">

          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl text-indigo-600 font-bold">Add a Member</p>
            <div onClick={toggleAddModal} className="modal-close cursor-pointer z-50">
              <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
            </div>
          </div>

          <p>Modal content can go here</p>
          <p>...</p>
          <p>...</p>

          <div className="flex justify-center pt-6">
            <button className="modal-close px-4 bg-indigo-600 p-3 rounded-lg text-white hover:bg-indigo-400">Add</button>           
          </div>
          
        </div>
      </div>
    </div>
    </>
  );
};




