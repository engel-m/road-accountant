import React from 'react';
import { firestore } from '../config/Firebase';

export const GroupCard = React.memo(props => {

  let memberNames = [];
  let memberCount = Object.keys(props.groupMembers).length;  

  Object.entries(props.groupMembers).map(([key, value]) => {
    return memberNames.push(value.displayName);
  });
  
  return (      
    <div className="relative flex w-full pt-4 pb-5 md:pb-1 my-2 items-center bg-white shadow-md rounded flex-shrink mx-1 
      hover:bg-indigo-100 hover:shadow-xl border-2 border-transparent hover:border-indigo-200 focus:bg-indigo-100 focus:shadow-xl">
      <h1 onClick={(e) => props.selectGroup(props.groupId, e)}
        aria-label={memberNames.map(name => name).join(' ')} data-balloon-length="small" data-balloon-pos="right"
        className="absolute tooltip-grey cursor-pointer top-0 left-0 h-full w-1/6 mt-1 ml-2 text-xs md:text-sm text-green-600 font-bold tooltip-grey">
        {memberCount} {memberCount > 1 ? 'Members' : 'Member' } </h1>

      <div onClick={(e) => props.selectGroup(props.groupId, e)} className="block h-12 w-2/3 text-center cursor-pointer">
        <h1 className="font-bold text-indigo-800 text-sm md:text-xl mt-1">{props.name}</h1>            
      </div>
      <h1 className={"tooltip-grey font-bold text-lg md:text-xl my-auto"}>TEST</h1>
    </div>
  );
});

  // return (
  //   <>
  //   <div className="animated fadeIn w-11/12 md:w-8/12 lg:w-4/12 mx-auto mt-8 flex flex-wrap flex-column content-center justify-center">   
        
  //       {/* Add Button */}
  //       <div onClick={(e) => setModal('AddMemberModal', e)} className="flex cursor-pointer w-1/3 md:w-1/5 flex-col py-2 md:py-4 my-2 
  //       items-center bg-transparent border-2 border-gray-400 border-dashed rounded flex-shrink mx-1" id="addButton">
  //         <div aria-label="Add a member" data-balloon-pos="down" className="rounded-full h-12 w-12 bg-purple-400 text-center">
  //           <h1 className="font-bold text-white text-3xl">+</h1>            
  //         </div>
  //         <h1 aria-label="Add a member" data-balloon-pos="down" className="hidden md:inline tooltip-grey font-bold text-gray-600 text-xl md:text-2xl my-auto">Click to add</h1>
  //       </div>

  //   </div>
  //   </>
  // )


