import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";
import { PersistGate } from 'redux-persist/lib/integration/react';
import {persistStore, persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import Root from './root'
// const persistConfig = {key: 'root', storage: storage,};
// const persistedReducer = persistReducer(persistConfig, reducers);
// const store= createStore(persistedReducer, {}, applyMiddleware(reduxThunk));
// const persistor = persistStore(store);

ReactDOM.render( <Root/>
, document.getElementById('root'));
serviceWorker.unregister();

