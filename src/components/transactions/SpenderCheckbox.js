import React from 'react';

export const SpenderCheckbox = ({ memberId, displayName }) => {
  
  return (
    <>
    <div className="mx-4 text-lg flex items-center content-center">
      <input type="checkbox" className="h-6 w-6 spend-checkbox" defaultChecked={true} 
        value={memberId} name="spenders" id={"spender-" + memberId} />  
      <label className="ml-2">{displayName}</label>         
    </div>
    </>
  )
}





