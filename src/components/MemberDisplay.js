import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { GroupListener } from '../context/GroupListener';
import { tailwindColors } from '../styles/tailwindColors';

const MemberCard = React.memo(props => {
  const color = tailwindColors[Math.floor(Math.random() * tailwindColors.length)];
  return (      
    <div className="relative flex w-1/3 md:w-1/5 flex-col pt-4 pb-5 md:pb-1 my-2 items-center bg-white shadow-lg rounded flex-shrink mx-1">
      {props.member.role === 'creator' && <p className="absolute top-0 left-0 mt-1 ml-2 text-xs md:text-sm text-green-600 font-bold">Creator</p>}
      <div className={"hidden md:block rounded-full h-12 w-12 bg-" + color + " text-center"}>
        <h1 className="font-bold text-white text-2xl mt-1">{props.member.displayName.slice(0, 1).toUpperCase()}</h1>            
      </div>
      <h1 aria-label={props.member.email} data-balloon-pos="down" className={"tooltip-grey font-bold text-lg md:text-xl my-auto text-" + color + ""}>{props.member.displayName}</h1>
    </div>
  );
});

export const MemberDisplay = () => {
  const { currentGroup } = useContext(GroupListener);
  const { setModal } = useContext(GlobalContext); 

  return (
    <>
    <h4 className="animated fadeIn font-bold text-xl text-center">Group: {currentGroup.name}</h4>
    <h4 className="animated fadeIn italic text-base text-center mt-4">Members:</h4>
    <div className="animated fadeIn w-full max-w-6xl mx-auto flex flex-wrap flex-column justify-center">      
        
        { currentGroup.groupMembers && Object.keys(currentGroup.groupMembers).map( (groupmember, userId) => (
          <MemberCard key={userId} member={currentGroup.groupMembers[groupmember]} />
        ))}

        {/* Add Button */}
        <div onClick={(e) => setModal('AddMemberModal', e)} className="flex cursor-pointer w-1/3 md:w-1/5 flex-col py-2 md:py-4 my-2 
        items-center bg-transparent border-2 border-gray-400 border-dashed rounded flex-shrink mx-1" id="addButton">
          <div aria-label="Add a member" data-balloon-pos="down" className="rounded-full h-12 w-12 bg-purple-400 text-center">
            <h1 className="font-bold text-white text-3xl">+</h1>            
          </div>
          <h1 aria-label="Add a member" data-balloon-pos="down" className="hidden md:inline tooltip-grey font-bold text-gray-600 text-xl md:text-2xl my-auto">Click to add</h1>
        </div>

    </div>
    </>
  )
};