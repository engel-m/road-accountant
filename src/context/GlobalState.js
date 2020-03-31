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
    currentView: 'CreateAccount',
    modalView: false,
  }
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Toggle Component Rendering (Render and remove modals f.e.)
  function toggleComponent(componentName, e = '') {
    if (e !== '') {
      e.preventDefault()
    }
    dispatch({
      type: 'TOGGLE_COMPONENT',
      payload: {componentName}
    });
  }

  function toggleModal(modalName, e) {
    e.preventDefault();
    dispatch({
      type: 'TOGGLE_MODAL',
      payload: {modalName}
    });
  }

  function setLoginStatus(status = false) {
    dispatch({
      type: 'SET_LOGIN_STATUS',
      payload: {status}
    });
  }

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
    toggleComponent,
    toggleModal,
    setLoginStatus,
    deleteTransaction,
    addTransaction
  }}>
    {children}
  </GlobalContext.Provider>);
}