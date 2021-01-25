const blank = (state = {}, action) => {
  switch (action.type) {
    case 'BLANK_ACTION':
      return {
        ...state,
        lang: action.payload,
      };
    default:
      return state;
  }
};

export default blank;
