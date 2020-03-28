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
  renderStatus: {
    addMemberModal: false
  }
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Toggle Component Rendering (Render and remove modals f.e.)
  function renderToggle(componentName) {
    dispatch({
      type: 'RENDER_STATUS',
      payload: {componentName}
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

  function addMember(memberData) {
    dispatch({
      type: 'ADD_MEMBER',
      payload: memberData
    });
  }

  return (<GlobalContext.Provider value={{
    transactions: state.transactions,
    members: state.members,
    renderStatus: state.renderStatus,
    renderToggle,
    deleteTransaction,
    addTransaction
  }}>
    {children}
  </GlobalContext.Provider>);
}