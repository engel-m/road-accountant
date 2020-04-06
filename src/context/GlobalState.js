import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Initial state
const initialState = {
  transactions: [],
  members: [
    {
      firstname: "Michael",
      nickname: "Mike",
      email: "mike@hotmail.com",
    }, 
    {
      firstname: "Katy",
      nickname: "Kate",
      email: "kate@example.com"
    },
    {
      firstname: "Harry",
      nickname: "Harry",
      email: "bertvis@gmail.com"
    }
  ],
  loggedIn: false,
  renderStatus: {    
    currentView: 'Landing',
    modalView: false,
  },
  currentUser: {
    displayName: '',
    email: '',
    groups: '',
    selectedGroup: '',
  }
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Toggle Component Rendering (Render and remove modals f.e.)
  function setView(viewName, e = '') {
    if (e !== '') {
      e.preventDefault()
    }
    dispatch({
      type: 'SET_VIEW',
      payload: {viewName}
    });
  }

  function setModal(modalName, e) {
    e.preventDefault();
    dispatch({
      type: 'SET_MODAL',
      payload: {modalName}
    });
  }

  function setLoggedIn(userId = false) {
    dispatch({
      type: 'SET_LOGGED_IN',
      payload: {userId}
    });
  }

  function setUser(userData) {
    dispatch({
      type: 'SET_USER',
      payload: {userData}
    });
  }

  // function setCurrentGroup(groupData) {
  //   dispatch({
  //     type: 'SET_CURRENT_GROUP',
  //     payload: {groupData}
  //   });
  // }

  // Actions
  function deleteTransaction(id) {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id
    });
  }

  function addTransaction(transaction) {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction
    });
  }

  return (<GlobalContext.Provider value={{
    transactions: state.transactions,
    members: state.members,
    loggedIn: state.loggedIn,
    renderStatus: state.renderStatus,
    currentUser: state.currentUser,
    currentGroup: state.currentGroup,    
    setView,
    setModal,
    setLoggedIn,
    setUser,
    // setCurrentGroup,
    deleteTransaction,
    addTransaction
  }}>
    {children}
  </GlobalContext.Provider>);
}