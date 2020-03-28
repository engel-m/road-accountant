import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { AddMemberModal } from './AddMemberModal';

export const Modals = () => {
  const { renderStatus, renderToggle } = useContext(GlobalContext);  
  
  const clickToToggle = (componentName, e) => {
    e.preventDefault();
    renderToggle(componentName);
  }

  return (
    <>
    {renderStatus.addMemberModal && <AddMemberModal clickToToggle={clickToToggle} componentName={'addMemberModal'} />}
    </>
  )
}