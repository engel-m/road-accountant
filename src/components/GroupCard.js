import React, { useState } from 'react';

export const GroupCard = React.memo(props => {
  const [confirmAlert, setConfirmAlert] = useState(false);
  const group = props.group;
  const userId = props.userId || null; 
  let isCreator = userId ? (group.creatorId === userId) ? true : false : false;
 
  return (   
    <>   
    <div className="relative flex w-full pt-4 pb-5 md:pb-1 my-2 justify-between bg-white shadow-md rounded flex-shrink mx-1
      hover:bg-indigo-100 hover:shadow-xl border-2 border-transparent hover:border-indigo-200 focus:bg-indigo-100 focus:shadow-xl">

      <div className="absolute top-0 mx-auto h-full w-1/5">

        <span onClick={(e) => props.selectGroup(group.groupId, e)}
          className="block cursor-pointer text-xs md:text-sm text-green-600 font-bold">
          Creator: { (group.creatorId === userId) ? 'You' : group.creator } </span>

        <span onClick={(e) => props.selectGroup(group.groupId, e)}
          className="block cursor-pointer text-xs text-blue-800 font-bold">
          Created on: </span>

        <span onClick={(e) => props.selectGroup(group.groupId, e)}
          className="block cursor-pointer text-xs text-blue-800 font-bold">
          { group.createDate.toDate().toLocaleDateString() } </span>

      </div>


      <div onClick={(e) => props.selectGroup(group.groupId, e)} className="mx-auto w-4/5 h-12 text-center cursor-pointer">
        <p className="font-bold text-indigo-800 text-sm md:text-xl">{group.name}</p>            
      </div>
      {isCreator && 
      <div onClick={() => setConfirmAlert(!confirmAlert)} className="absolute right-0 bottom-0 mr-2 mb-6 md:mb-3 rounded-lg bg-red-200 py-2 px-2 mb-3 hover:bg-red-700 text-red-400 hover:text-white">
        <p className={"font-bold text-sm md:text-lg cursor-pointer"}>Delete</p>
      </div>}
    </div>

    <div className={"flex flex-column h-auto p-3 w-11/12 bg-red-200 text-bold flex-wrap justify-center text-center rounded-lg text-xl " + ( confirmAlert ? "" : "hidden") + " "}>
      <h1 className={"w-full block font-bold text-red-700 text-lg md:text-lg mb-4"}>Are you sure you want to delete group: {group.name}?</h1>
      <h1 className={"w-full block font-bold text-red-700 text-lg md:text-lg mb-4"}>(Warning: This deletes it for all group members)</h1>
      <div onClick={() => setConfirmAlert(false)} 
        className="block mx-2 w-5/12 bg-red-600 p-2 rounded-lg text-white focus:outline-none cursor-pointer shadow hover:shadow-inner 
          border border-transparent hover:border-red-700">Cancel</div>
      <div onClick={(e) => props.deleteGroup(group.groupId, e)}  
        className="block mx-2 w-2/12 bg-indigo-800 p-2 rounded-lg text-white focus:outline-none cursor-pointer shadow hover:shadow-inner 
          border border-transparent hover:border-indigo-900">&#10003;</div>
    </div>
    </>
  );
});




