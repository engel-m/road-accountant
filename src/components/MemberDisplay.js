import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { GroupListener } from '../context/GroupListener';
import { MemberCard } from './MemberCard';

export const MemberDisplay = ({ balances, groupTotals }) => {
  const { currentGroup } = useContext(GroupListener);
  const { setModal } = useContext(GlobalContext); 
  const members = currentGroup ? currentGroup.groupMembers : null;

  return (
    <>
    <h4 className="animated fadeIn font-bold text-2xl text-center text-indigo-800 font-fira">{currentGroup.name}</h4>
    <h4 className="animated fadeIn italic font-bold text-gray-600 text-base text-center mt-4 font-fira">Members and their pay balance</h4>
    <div className="animated fadeIn w-full max-w-6xl mx-auto flex flex-wrap flex-column justify-center">      

      { members && Object.keys(members).map( (groupmember) => (
        <MemberCard key={groupmember} id={groupmember} member={members[groupmember]} balance={balances ? balances[groupmember] : 0} />
      ))}

      {/* Add Button */}
      <div onClick={(e) => setModal('AddMemberModal', e)} className="flex cursor-pointer w-5/12 md:w-1/5 flex-col py-2 md:py-4 my-2 
      items-center bg-transparent border-2 border-gray-400 border-dashed rounded flex-shrink mx-1 hover:bg-indigo-200" 
        aria-label="Add a member" data-balloon-pos="down" id="addButton">
        <div className="rounded md:rounded-full w-full h-full md:h-12 md:w-12 bg-purple-100 md:bg-purple-400 text-center">
          <h1 className="hidden md:block font-bold text-white text-3xl">+</h1> 
          <h1 className="md:hidden font-bold text-purple-700 text-xl">Add Member</h1>            
        </div>
        <h1 className="hidden md:inline tooltip-grey font-bold text-gray-600 text-xl md:text-2xl my-auto">Click to add</h1>
      </div>

    </div>

    <div className="w-full text-center my-2 pb-2 border-b">

      <div className="w-full">
        <span className="font-bold text-gray-600 text-xl italic">Total expenses: Group | Average:  
          <span className="text-red-300 not-italic">{groupTotals && `  ${Math.floor(groupTotals.everything)}  |  ${Math.floor(groupTotals.average)} p.p.`}</span>
        </span>
      </div>

      <div className="w-full">
        <span className="font-bold text-gray-600 text-xl italic">Total since last settle: Group | Average:   
          <span className="text-red-300 not-italic">{groupTotals && `  ${Math.floor(groupTotals.everythingAfterSettle)} 
             |  ${Math.floor(groupTotals.averageAfterSettle)} p.p.`}</span>
        </span>
      </div>

    </div>
    </>
  )
};