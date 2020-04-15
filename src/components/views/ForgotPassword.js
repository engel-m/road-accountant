import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { auth } from '../../config/Firebase';

export const ForgotPassword = () => {
  const { setView } = useContext(GlobalContext); 
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);

  const formHandler = (e) => {
    e.preventDefault();
    setError('');
    const form = document.querySelector('#password-reset-form');
    const email = form['email'].value || ''; 

    auth.sendPasswordResetEmail(email).then(returned => {
      setSuccess('Password reset email sent! Please check your mailbox.');
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
              <small>Send yourself a mail with a new password</small>
            </div>
            <form id="password-reset-form" onSubmit={(e) => formHandler(e)}>
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="email">
                  Email 
                </label>
                <input
                  type="email" id="email" minLength="4" maxLength="60" required
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                  placeholder="Email"/>
              </div>

              {success && <div className="bg-green-100 p-3 border-green-600 border rounded"><p className="text-green-600 text-center">
                {success}</p></div>}  

              {error !== '' && <div className="bg-red-100 p-3 border-red-600 border rounded"><p className="text-red-600 text-center">
                {error}</p></div>}              

              <div className="text-center mt-6">
                <button
                  className="bg-purple-600 hover:bg-purple-500 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                  type="submit">
                  Send password verification email
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