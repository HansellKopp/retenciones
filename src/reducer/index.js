export const reducer = (state, action) => {
  switch (action.type) {
    case 'updateParameters':
      return {
        ...state,
        parameters: {...action.parameters}
      };
      
    default:
      return state;
  }
}