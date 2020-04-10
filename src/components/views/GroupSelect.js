import React, { useContext } from 'react';
import { firestore } from '../../config/Firebase';
import { GroupListener } from '../../context/GroupListener';
import { LoadingScreen } from "../LoadingScreen.js";

export const GroupSelect = () => {
  const { pendingGroup } = useContext(GroupListener);

  if (pendingGroup) {
    return <LoadingScreen />
  }

  if (!pendingGroup) {
    return (
    <>
    <div className="animated fadeIn w-11/12 md:w-8/12 lg:w-4/12 mx-auto mt-8 flex flex-wrap flex-column content-center justify-center">
      <p> GROUP SELECT SCREEN!!!!!!!!! </p> 
    </div>   
    </>
  )
  }
}