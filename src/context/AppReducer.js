export default (state, action) => {
  switch(action.type) {
    case 'RENDER_STATUS':
      const nextState = { ...state };
      const componentName = action.payload.componentName;
      nextState.renderStatus[componentName] = !nextState.renderStatus[componentName];
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