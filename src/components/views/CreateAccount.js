import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { auth } from '../../config/Firebase';

export const CreateAccount = () => {
  const { setView } = useContext(GlobalContext); 
  const [error, setError] = useState('');

  const formHandler = (e) => {
    e.preventDefault();
    setError('');
    const form = document.querySelector('#create-account-form');
    const nickname = form['nickname'].value || '';  
    const email = form['email'].value || ''; 
    const password = form['password'].value || '';   

    auth.createUserWithEmailAndPassword(email, password).then(returned => {
      if(returned.user && returned.additionalUserInfo.isNewUser === true){
        returned.user.updateProfile({
          displayName: nickname
        }).then(
          setView('CreateGroup')
        )
      }
    }).catch(error => {
      setError(error.message)
    })    
  };

  return (
    <>
    <div className="flex content-center items-center justify-center h-full animated fadeIn mb-10">
      <div className="w-full md:w-8/12 lg:w-3/12 px-4 pt-6 md:pt-32">

        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0">

          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div className="text-gray-600 text-center mb-3 font-bold">
              <small>Create an account</small>
            </div>
            <form id="create-account-form" onSubmit={(e) => formHandler(e)}>
            <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password">
                  Nickname <span className="text-gray-700 normal-case italic opacity-50">(Required, max. 10 characters)</span>
                </label>
                <input
                  type="nickname" id="nickname" maxLength="10" required
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                  placeholder="Nickname"/>
              </div>
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password">
                  Email <span className="text-gray-700 normal-case italic opacity-50">(Required)</span>
                </label>
                <input
                  type="email" id="email" required
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                  placeholder="Email"/>
              </div>
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password">
                  Password <span className="text-gray-700 normal-case italic opacity-50">(Required)</span>
                </label>
                <input
                  type="password" id="password" required
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                  placeholder="Password"
                />
              </div>

              {error !== '' && <div className="bg-red-100 p-3 border-red-600 border rounded"><p className="text-red-600 text-center">
                {error}</p></div>}              

              <div className="text-center mt-6">
                <button
                  className="bg-purple-600 hover:bg-purple-500 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                  type="submit">
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-wrap text-lg md:text-xl mt-6">
          <div className="w-2/3 md:w-1/2">
            <span onClick={(e) => setView('Landing', e)} className="text-gray-600 font-bold italic cursor-pointer">
              <small>&lt; Back to Login Screen</small>
            </span>
          </div>          
        </div>

      </div>
    </div>
    </>
  );
}