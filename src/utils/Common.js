// import * as Sentry from '@sentry/browser';

// return the user data from the session storage
export const getUser = () => {
  const userStr = sessionStorage.getItem('user');
  // if (userStr) return JSON.parse(userStr);
  if (userStr) return JSON.parse(userStr);
  return null;
};

// return the token from the session storage
export const getToken = () => sessionStorage.getItem('token') || null;

// remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('role');
  sessionStorage.setItem('lang', 'en_US');
};

// set the token and user from the session storage
export const setUserSession = (token, user) => {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('user', JSON.stringify(user));
  if (user.userEmail === 'demo@homekasa.io') {
    sessionStorage.setItem('role', 'demoUser');
  } else {
    sessionStorage.setItem('role', '');
  }
};
export const updateUserSession = (user) => {
  sessionStorage.setItem('user', JSON.stringify(user));
};
// return the role from the session storage
export const getRole = () => sessionStorage.getItem('role') || null;

// set and get language
export const setLanguageSession = (lang) => {
  sessionStorage.setItem('lang', lang);
};
export const getLanguageSession = () => sessionStorage.getItem('lang') || null;
