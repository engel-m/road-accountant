export default (state, action) => {
      const nextState = { ...state };
  switch(action.type) {      
    case 'TOGGLE_COMPONENT':      
      const componentName = action.payload.componentName;
      nextState.renderStatus.currentView = componentName;
      return nextState;
    case 'TOGGLE_MODAL':
      const modalName = action.payload.modalName;
      nextState.renderStatus.modalView = modalName;
      return nextState;
    case 'SET_LOGIN_STATUS':
      nextState.loggedIn = action.payload.status;
      return nextState;      
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
      }
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions]
      }
    default:
      return state;
  }
}