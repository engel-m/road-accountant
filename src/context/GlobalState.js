import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Initial state
const initialState = {
  renderStatus: {    
    currentView: 'Landing',
    modalView: false,
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

  function setModal(modalName, e = '') {
    if (e !== '') {
      e.preventDefault()
    }
    dispatch({
      type: 'SET_MODAL',
      payload: {modalName}
    });
  }

  return (<GlobalContext.Provider value={{
    renderStatus: state.renderStatus,
    currentGroup: state.currentGroup,    
    setView,
    setModal
  }}>
    {children}
  </GlobalContext.Provider>);
}