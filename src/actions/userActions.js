const setUser = (user) => ({
  type: 'SET_USER',
  payload: user,
});

const logOut = () => ({
  type: 'LOG_OUT',
});

export default {
  setUser,
  logOut,
};
