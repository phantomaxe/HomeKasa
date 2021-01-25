const primaryHouse = (state = {}, action) => {
  switch (action.type) {
    case 'PRIMARY_HOUSE':
      return {
        ...state,
        primary: action.payload,
      };
    default:
      return state;
  }
};

export default primaryHouse;