import React from 'react';
import {Provider} from 'react-redux';
import reducers from '../../reducers';
import {createStore, combineReducers} from 'redux';
import Root from './Root';
import '../../style.css';

const store = createStore(
    combineReducers({
        ...reducers
    })
);

const App = (props) => {
    return (
        <Provider store={store}>
            <Root />
        </Provider>
    );
};

export default App;
