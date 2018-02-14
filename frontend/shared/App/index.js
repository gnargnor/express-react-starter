// packages
import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import axios from 'axios';
import createHistory from 'history/createBrowserHistory';
import {ConnectedRouter, routerReducer, routerMiddleware} from 'react-router-redux';
// local modules
import reducers from '../../reducers';
import Root from './Root';
import '../../style.css';

// create history
const history = createHistory();
//define middleware
const middleware = [
    routerMiddleware(history),
    ReduxThunk.withExtraArgument(axios.create({
        baseUrl: `/api`
    }))
];

const store = createStore(
    combineReducers({
        ...reducers,
        router: routerReducer
    }), applyMiddleware(...middleware)
);

const App = (props) => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Root />
            </ConnectedRouter>
        </Provider>
    );
};

export default App;
