import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import {store, persistor} from "./reduxConfig";
import App from './App'

class Root extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor} >
                    <App />
                </PersistGate>
            </Provider>
        )
    }
}

export default Root
