export default (state, action) => {
      const nextState = { ...state };
  switch(action.type) {      
    case 'TOGGLE_COMPONENT':      
      const componentName = action.payload.componentName;
      nextState.renderStatus.currentView = componentName;
      return nextState;
    case 'TOGGLE_MODAL':
      const modals = nextState.renderStatus.modals;
      const modalName = action.payload.modalName;      
      if (modalName == 'closeAll') {
        Object.keys(modals).forEach( key => modals[key] = false);  
        nextState.renderStatus.modalView = false;
      } else {
        modals[modalName] = !modals[modalName];
        nextState.renderStatus.modalView = modals[modalName] ? true : false;
      }            
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