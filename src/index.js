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

// const store= createStore(render, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    {/* <Provider store={store}> */}
      <App/>
      {/* </Provider> */}
  </FirebaseContext.Provider>
    , document.getElementById('root'));
serviceWorker.unregister();
