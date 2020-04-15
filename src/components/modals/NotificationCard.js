import React, { useState } from 'react';

export const NotificationCard = React.memo(props => {
  const [confirmAlert, setConfirmAlert] = useState(false);
  const invite = props.invite;

  return (   
    <>   
    <div className="relative flex w-full pt-4 pb-5 md:pb-1 my-2 justify-between bg-white shadow-md flex-shrink flex-wrap rounded mx-1
      hover:bg-indigo-100 hover:shadow-xl border-2 border-transparent hover:border-indigo-200 focus:bg-indigo-100 focus:shadow-xl">

      <div className="inline-block max-w-2/12 ml-3">
        <span 
          className="cursor-default text-xs md:text-sm text-blue-800 font-bold">
          { invite.inviteDate.toDate().toLocaleDateString() } </span>
      </div>

      <div className="md:inline-block w-full lg:w-8/12 mt-1 text-center text-xs md:text-sm lg:text-xl cursor-default">
        <span className="font-bold text-indigo-800">You were invited to join group </span>
        <span className="font-bold text-green-600">{invite.groupName}</span>
        <span className="font-bold text-indigo-800"> by </span>
        <span className="font-bold text-green-900">{ invite.creatorName }</span>
        <span className="font-bold text-indigo-800">!</span>            
      </div>

      <div className="flex flex-shrink w-full lg:w-2/12 mt-3 lg:mt-0 justify-center">      
        <div onClick={(e) => props.acceptInvite(invite.groupId, e)} className="rounded-lg bg-green-200 py-2 px-2 mb-3 hover:bg-green-700 text-green-400 hover:text-white">
          <p className="font-bold text-sm md:text-lg cursor-pointer">Accept</p>
        </div>
        <div onClick={() => setConfirmAlert(!confirmAlert)} className="rounded-lg bg-red-200 py-2 px-2 mb-3 hover:bg-red-700 text-red-400 hover:text-white ml-2">
          <p className="font-bold text-sm md:text-lg cursor-pointer">Decline</p>
        </div>
      </div>
    </div>       

    <div className={"flex p-3 w-full md:w-8/12 bg-red-200 text-bold flex-wrap justify-center text-center rounded-lg text-sm md:text-lg " + ( confirmAlert ? "" : "hidden") + " "}>
      <h1 className={"w-full block font-bold text-red-700 mb-4"}>Are you sure you want to delete this invitation to group {invite.groupName}?</h1>
      <h1 className={"w-full block font-bold text-red-700 mb-4"}>(This will remove your option to join this group.)</h1>
      <div onClick={() => setConfirmAlert(false)} 
        className="inline-block mx-2 w-4/12 bg-red-600 p-2 rounded-lg text-white focus:outline-none cursor-pointer shadow hover:shadow-inner 
          border border-transparent hover:border-red-700">Cancel</div>
      <div onClick={(e) => props.deleteInvite(invite.groupId, e)}  
        className="inline-block mx-2 w-4/12 bg-indigo-800 p-2 rounded-lg text-white focus:outline-none cursor-pointer shadow hover:shadow-inner 
          border border-transparent hover:border-indigo-900">&#10003;</div>
    </div>

    </>
  );

});




