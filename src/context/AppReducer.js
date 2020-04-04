export default (state, action) => {
      const nextState = { ...state };
  switch(action.type) {      
    case 'SET_VIEW':      
      const viewName = action.payload.viewName;
      nextState.renderStatus.currentView = viewName;
      return nextState;
    case 'SET_MODAL':
      const modalName = action.payload.modalName;
      nextState.renderStatus.modalView = modalName;
      return nextState;
    case 'SET_LOGGED_IN':
      nextState.loggedIn = action.payload.userId;
      return nextState;      
    case 'SET_USER':
      nextState.currentUser = action.payload.userData;
      return nextState;     
    case 'SET_GROUP':
      nextState.currentGroup = action.payload.groupData;
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