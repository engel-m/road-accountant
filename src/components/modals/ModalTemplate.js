import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { AddMemberModal } from './AddMemberModal';
import { CreateGroupModal } from './CreateGroupModal';

export const ModalTemplate = () => {
  const { renderStatus, setModal } = useContext(GlobalContext); 
  
  return (
    <>
    <div className="animated fadeIn modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
      <div className="modal-overlay absolute w-full h-full bg-gray-800 opacity-75"></div>
    
        <div className="modal-container bg-gray-100 w-11/12 md:max-w-md lg:max-w-lg xl:mb-32 mx-auto rounded-md shadow-lg z-50 overflow-y-auto">
        
        {/* Close Button in upper right corner of screen */}
        <div onClick={(e) => setModal(false, e)} className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
          <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
          </svg>
          <span className="text-sm">(Esc)</span>
        </div>

        {renderStatus.modalView === 'AddMemberModal' && <AddMemberModal setModal={setModal} />}
        {renderStatus.modalView === 'CreateGroupModal' && <CreateGroupModal setModal={setModal} />}

      </div>
    </div>
    </>
  )
}