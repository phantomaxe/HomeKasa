const showToast = (state = {}, action) => {
  switch (action.type) {
    case 'SHOW-TOAST':
      return {
        ...state,
        success: action.payload.Success,
        message: action.payload.Message,
      };
    default:
      return state;
  }
};

export default showToast;
