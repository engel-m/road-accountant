import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { AddMemberModal } from './AddMemberModal';

export const Modals = () => {
  const { renderStatus } = useContext(GlobalContext);      

  return (
    <>
    {renderStatus.addMemberModal && <AddMemberModal />}
    </>
  )
}