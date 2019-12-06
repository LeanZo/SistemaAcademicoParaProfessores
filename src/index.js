import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {urls, privateUrls} from "./urlUtils";
import {Provider} from 'react-redux';
import configureStore from './configureStore';
import {PersistGate} from 'redux-persist/integration/react'

const {store, persistor} = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router>
                <Route path={privateUrls.home.path} component={App}/>
            </Router>
        </PersistGate>
    </Provider>
    , document.getElementById('root')
);

serviceWorker.register();
