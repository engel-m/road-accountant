import React, { useState } from 'react';

export const GroupCard = React.memo(props => {
  const [confirmAlert, setConfirmAlert] = useState(false);
  let memberNames = [];
  let memberCount = Object.keys(props.groupMembers).length;  

  Object.entries(props.groupMembers).map(([key, value]) => {
    return memberNames.push(value.displayName);
  });
  
  return (   
    <>   
    <div className="relative flex w-full pt-4 pb-5 md:pb-1 my-2 items-center bg-white shadow-md rounded flex-shrink mx-1
      hover:bg-indigo-100 hover:shadow-xl border-2 border-transparent hover:border-indigo-200 focus:bg-indigo-100 focus:shadow-xl">
      <p onClick={(e) => props.selectGroup(props.groupId, e)}
        aria-label={memberNames.map(name => name).join(', ')} data-balloon-length="small" data-balloon-pos="right"
        className="block absolute tooltip-grey cursor-pointer top-0 ml-2 h-full w-1/5 text-xs md:text-sm text-green-600 font-bold tooltip-grey">
        {memberCount} {memberCount > 1 ? 'Members' : 'Member' } </p>

      <div onClick={(e) => props.selectGroup(props.groupId, e)} className="block w-3/5 h-12 -ml-2 text-center cursor-pointer">
        <p className="font-bold text-indigo-800 text-sm md:text-xl">{props.name}</p>            
      </div>
      <div onClick={() => setConfirmAlert(!confirmAlert)} className="absolute right-0 bottom-0 mr-2 mb-6 md:mb-3 rounded-lg bg-red-200 py-2 px-2 mb-3 hover:bg-red-700 text-red-400 hover:text-white">
        <p className={"font-bold text-sm md:text-lg cursor-pointer"}>Delete</p>
      </div>
    </div>

    <div className={"flex flex-column h-auto p-3 w-11/12 bg-red-200 text-bold flex-wrap justify-center text-center rounded-lg text-xl " + ( confirmAlert ? "" : "hidden") + " "}>
      <h1 className={"w-full block font-bold text-red-700 text-lg md:text-lg mb-4"}>Are you sure you want to delete group: {props.name}?</h1>
      <div onClick={() => setConfirmAlert(false)} 
        className="block mx-2 w-5/12 bg-red-600 p-2 rounded-lg text-white focus:outline-none cursor-pointer shadow hover:shadow-inner 
          border border-transparent hover:border-red-700">Cancel</div>
      <div onClick={(e) => props.deleteGroup(props.groupId, e)}  
        className="block mx-2 w-2/12 bg-indigo-800 p-2 rounded-lg text-white focus:outline-none cursor-pointer shadow hover:shadow-inner 
          border border-transparent hover:border-indigo-900">&#10003;</div>
    </div>
    </>
  );
});




