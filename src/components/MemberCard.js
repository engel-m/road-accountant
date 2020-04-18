import React from 'react';
import { MemberBalance } from './MemberBalance';

export const MemberCard = React.memo(props => {
  return (    
    <>  
    <div className="relative flex w-5/12 md:w-1/5 flex-col py-1 md:py-4 md:pb-1 my-2 items-center bg-white shadow-lg rounded flex-shrink mx-1">
      {props.member.role === 'creator' && <span className="absolute top-0 left-0 mt-1 ml-2 text-xs md:text-sm text-white md:text-green-600 font-bold">Creator</span>}
      <div className={"hidden md:block rounded-full h-12 w-12 bg-" + props.member.color + " text-center"}>
        <h1 className="font-bold text-white text-2xl mt-1">{props.member.displayName.slice(0, 1).toUpperCase()}</h1>            
      </div>
      <h1 aria-label={props.member.email} data-balloon-pos="down" className={"tooltip-grey font-bold text-lg md:text-xl my-auto text-" + props.member.color + ""}>
        {props.member.displayName}</h1>

        <MemberBalance balance={60} />
    </div>      
    </>
  );
});