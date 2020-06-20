import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore,combineReducers,compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {authReducer} from './redux/app/reducers/authReducer';
import {errorReducer} from './redux/app/reducers/errorReducer';
import {authReducerAdmin} from './redux/admin/reducers/authReducerAdmin';
import {errorReducerAdmin} from './redux/admin/reducers/errorReducerAdmin';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    auth:authReducer,
    error:errorReducer,
    authAdmin:authReducerAdmin,
    errorAdmin:errorReducerAdmin
   
})

const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
