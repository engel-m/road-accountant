import React from 'react';

export const PayerCheckbox = ({ memberId, displayName, authId }) => {
  
  return (
    <>
    <div className="mx-4 text-lg flex items-center content-center">      
      <input type="radio" value={memberId} name="payers" id={"payer-" + memberId} className="h-6 w-6 pay-checkbox"
        defaultChecked={ (authId === memberId) ? true : false }/> 
      <label className="ml-2">{displayName}</label>    
    </div>
    </>
  )
}




