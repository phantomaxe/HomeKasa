const testOneHouse = (state = {}, action) => {
  switch (action.type) {
    case 'TESTONE_HOUSE':
      return {
        ...state,
        testone: action.payload,
      };
    default:
      return state;
  }
};

export default testOneHouse;