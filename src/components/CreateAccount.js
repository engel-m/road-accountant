import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const CreateAccount = () => {
  return (
    <>
        <div className="flex content-center items-center justify-center h-full animated fadeIn mb-10">
          <div className="w-9/12 md:w-6/12 lg:w-3/12 px-4 pt-32">

            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0">

              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-gray-600 text-center mb-3 font-bold">
                  <small>Create an account</small>
                </div>
                <form>
                <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password">
                      Nickname <span className="text-gray-700 normal-case italic opacity-50">(Required)</span>
                    </label>
                    <input
                      type="nickname"
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
                      type="email"
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
                      type="password"
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                      placeholder="Password"
                    />
                  </div>
                  <div className="text-center mt-6">
                    <button
                      className="bg-purple-600 hover:bg-purple-500 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                      type="button">
                      Create Account
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="flex flex-wrap text-xl mt-6">
              <div className="w-1/2">
                <span className="text-gray-600 font-bold italic cursor-pointer">
                  <small>&lt; Back to Log In Page</small>
                </span>
              </div>          
            </div>

          </div>
        </div>
    </>
  );
}