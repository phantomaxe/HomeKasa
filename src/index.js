import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import App from './App';
import { setLanguageSession, getLanguageSession } from './utils/Common';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const rootElement = document.getElementById('root');
if (!getLanguageSession()) {
  setLanguageSession('en_US');
}
ReactDOM.render(
  <MuiPickersUtilsProvider utils={MomentUtils}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiPickersUtilsProvider>,
  rootElement
);

// import React from 'react';
// import { createStore } from 'redux';
// import { useSelector } from 'react-redux';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import Test from './test.js'

// const store = createStore(rootReducer);

// function filterState(stateArr) {
//   let state = stateArr;
//   state.forEach(item => {
//     item.children = item.children.filter(item => item !== 'c');

//   });
//   return state;
// }

// function rootReducer(state = {
//   num: 1,
//   arr: [
//     { name: 'abc', job: 'CA', children: ['a', 'b', 'c'] },
//     { name: 'qbc', job: 'PA', children: ['q', 'b', 'c'] },
//     { name: 'wbc', job: 'PA', children: ['w', 'b', 'c'] },
//     { name: 'ebc', job: 'CA', children: ['e', 'b', 'c'] }]
// }, action) {
//   console.log("global state = ", state);
//   console.log('action', action);
//   if (action.type === 'CHANGE') {
//     let num = state.num;
//     return { ...state, num: num + 1, data: action.data, data1: action.data1 };
//   }
//   return state;
// }

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//     <Test />
//   </Provider>,
//   document.getElementById('root')
// );


// function App() {
//   let appContent = useSelector(state => state.arr);
//   // let num = useSelector(state => state.num);
//   appContent = filterState(appContent);
//   console.log("local state: ", appContent);
//   const changeState = () => {
//     store.dispatch({ type: 'CHANGE', data: '123123', data1: '123123' });
//   }

//   return (
//     <div>
//       &nbsp;&nbsp;
//       <button onClick={changeState}>change state</button>
//     </div>
//   );
// }
