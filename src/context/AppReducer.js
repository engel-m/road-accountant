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
    default:
      return state;
  }
}