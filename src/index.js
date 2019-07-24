import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './components/Firebase';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";
import { PersistGate } from 'redux-persist/lib/integration/react';
const store= createStore(reducers, {}, applyMiddleware(reduxThunk));

// const token = localStorage.getItem('token');
// if (token) {
//     store.dispatch({ type: AUTHENTICATE_THE_USER });

ReactDOM.render(
  <Provider store={store}>
      <App/>
    {/* </FirebaseContext.Provider> */}
  </Provider>
    , document.getElementById('root'));
serviceWorker.unregister();
