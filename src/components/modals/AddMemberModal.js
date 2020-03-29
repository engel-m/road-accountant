import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

export const AddMemberModal = (props) => {  
  return (
    <>
        <div className="modal-content py-4 text-center px-6">

          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl text-indigo-600 font-bold">Add a Member</p>
            <div onClick={(e) => props.toggleModal('addMemberModal', e)} className="modal-close cursor-pointer z-50">
              <p className="font-black text-gray-700">X</p>
            </div>
          </div>

          <p>Modal content can go here</p>
          <p>...</p>
          <p>...</p>

          <div className="flex justify-center pt-6">
            <button className="modal-close px-4 bg-indigo-600 p-3 rounded-lg text-white hover:bg-indigo-400">Add to Group</button>           
          </div>
          
        </div>
    </>
  );
};




