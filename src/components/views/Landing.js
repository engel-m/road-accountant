import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { auth, googleAuth, firestore, timestamp } from '../../config/Firebase';
import { generatePushID } from "../../helpers/pushIdGenerator.js";
import { demoGroup } from "../../helpers/demoData.js";

export const LandingPage = () => {
  const { setView } = useContext(GlobalContext);
  const [error, setError] = useState('');

  const googleHandler = (e) => {
    e.preventDefault();
    setError('');
    auth.signInWithPopup(googleAuth).then( (returned) => {  
      firestore.collection('Notifications').doc(returned.user.uid).set({ email: returned.user.email, displayName: returned.user.displayName }, { merge: true })  
    }).catch( (error) => {
      setError(error.message)
    });
  };

  const formHandler = (e) => {
    e.preventDefault();
    setError('');
    const form = document.querySelector('#login-form');
    const email = form['email'].value || ''; 
    const password = form['password'].value || '';   
    auth.signInWithEmailAndPassword(email, password).then( (returned) => {
      setView('MainAppView');
    });
  };

  const demoHandler = (e) => {
    e.preventDefault();
    setError('');
    const generated = generatePushID();
    const email = generated + '@demo-user.xxx';
    const password = 'demopass';
    const generatedGroupID = generatePushID();
    const generatedInviteID = generatePushID();
    const secondGeneratedInviteID = generatePushID();
    const currentDate = timestamp.fromDate(new Date()).toDate();
    auth.createUserWithEmailAndPassword(email, password).then(returned => {
      if ( returned.user && returned.additionalUserInfo.isNewUser === true ){
        firestore.collection("Users").doc(returned.user.uid).set({ 
          demo: true,
          displayName: 'DemoUser', 
          uid: returned.user.uid, 
          email, 
          selectedGroup: generatedGroupID
        });      
        returned.user.updateProfile({
          displayName: 'DemoUser'
        }).then( 
        firestore.collection("Groups").doc(generatedGroupID).set(
          demoGroup(auth.currentUser.uid, email, currentDate), {merge: true})
        .then ( 
          firestore.collection("GroupsByUser").doc(auth.currentUser.uid).set({
            demo: true,
            groups: {
              [generatedGroupID]: {
                groupId: generatedGroupID,
                name: 'Trip to Paris',
                creator: 'DemoUser',
                creatorId: auth.currentUser.uid,
                creatorMail: email,
                createDate: currentDate,
                lastActivity: currentDate
              }
            }        
          }, {merge: true})   
        ).then( firestore.collection('Notifications').doc(returned.user.uid).set({ 
            demo: true,
            email, 
            displayName: 'DemoUser', 
            invites: {
              [generatedInviteID]: {
                groupName: 'Weekend in Milan',
                creatorName: 'Kate',
                creatorMail: 'kate@road-acc-demo.xxx',
                createDate: currentDate,
                groupId: generatedInviteID,
                inviteDate: currentDate
              }, [secondGeneratedInviteID]: {
                groupName: 'Camping vacation',
                creatorName: 'Harry',
                creatorMail: 'harry@road-acc-demo.xxx',
                createDate: currentDate,
                groupId: secondGeneratedInviteID,
                inviteDate: currentDate
              }
            }
          }, {merge: true}))
        .then( setView('MainAppView') ))
      }
    }).catch(error => {
      setError(error.message)
    });   
  };

  return (
    <>
        <div className="flex content-center items-center justify-center h-full animated fadeIn mb-10">
          <div className="w-full md:w-8/12 lg:w-5/12 xl:w-3/12 px-4 md:pt-32">

            <div className="relative flex flex-col min-w-0 break-words w-full mb-2 shadow-lg rounded-lg border-0">
              <div className="rounded-t mb-0 px-6 py-4">
                <div className="text-center mb-3">
                  <small className="text-gray-600 font-bold">
                    Log in with
                  </small>
                </div>
                <div className="btn-wrapper text-center">
                  <button
                    className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 
                     uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs" onClick={(e) => googleHandler(e)} 
                    type="button">
                  <img
                    alt="..."
                    className="w-5 mr-1"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
                  Google
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-gray-400" />
              </div>

              <div className="flex-auto px-4 lg:px-10 py-6 pt-0">
                <div className="text-gray-600 text-center mb-3 font-bold">
                  <small>Or log in with your email</small>
                </div>
                <form id="login-form" onSubmit={(e) => formHandler(e)}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password">
                      Email
                    </label>
                    <input
                      type="email" id="email"
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                      placeholder="Email"/>
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password">
                      Password
                    </label>
                    <input
                      type="password" id="password"
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                      placeholder="Password"
                    />
                  </div>
  
                  {error !== '' && <div className="bg-red-100 p-3 border-red-600 border rounded"><p className="text-red-600 text-center">
                    {error}</p></div>}     

                  <div className="text-center mt-6">
                    <button
                      className="bg-purple-600 hover:bg-purple-500 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow 
                      hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                      type="submit">
                      Log In
                    </button>
                  </div>

                </form>
              </div>
            </div>

            <div className="flex flex-wrap text-xl mt-6">
              <div className="w-1/2">
                <span onClick={(e) => setView('ForgotPassword', e)} className="text-gray-600 font-bold italic cursor-pointer">
                  <small>Forgot password?</small>
                </span>
              </div>
              <div className="w-1/2 text-right">
                <span onClick={(e) => setView('CreateAccount', e)} className="text-gray-600 font-bold italic cursor-pointer">
                  <small>Create new account</small>
                </span>
              </div>   
              <div className="w-full mt-4 text-center text-lg font-bold text-gray-600"> Or </div>           
            </div>
                              
            <div className="flex w-full text-center justify-center">
              <div onClick={ (e) => { demoHandler(e) } } className="w-3/6 md:w-8/12 items-center justify-center 
                py-3 mt-6 bg-green-500 rounded-lg shadow-lg border-2 border-gray-300 cursor-pointer hover:bg-green-400 hover:shadow-inner">
                <span className="text-white font-fira text-lg text-sm md:text-xl">Log in as Demo user</span>
              </div>
            </div>

          </div>
        </div>
    </>
  );
}