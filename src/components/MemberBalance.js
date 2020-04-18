import React from 'react';

export const MemberBalance = ({ balance }) => {

  return (
    <>
    <div className="relative flex w-3/4 md:w-3/5 my-2 flex-col items-center flex-shrink mx-1 border-t">
      <div className="flex justify-center bg-indigo-100 w-3/4 mt-2 shadow-md rounded text-center border border-gray-300">
        { (balance <0 ) && <span className="text-red-600 font-bold text-lg">{balance}</span> }
        { (balance >0 || balance === 0)  && <span className="text-green-600 font-bold text-lg">+{balance}</span> }
      </div>
    </div>
    </>
  )
};