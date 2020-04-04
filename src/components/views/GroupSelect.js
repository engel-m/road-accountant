import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { firestore } from '../../config/Firebase';

export const GroupSelect = () => {
  const { currentUser, setUser } = useContext(GlobalContext);


  return (
    <>
    <div className="animated fadeIn w-11/12 md:w-8/12 lg:w-4/12 mx-auto mt-8 flex flex-wrap flex-column content-center justify-center">
      <p> GROUP SELECT SCREEN!!!!!!!!! </p> 
    </div>   
    </>
  )
}