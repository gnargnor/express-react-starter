import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import reducers from './reducers';
import {createStore} from 'redux';
import Greeting from './greeting';

const store = createStore(reducers);

function render () {
    ReactDOM.render((
        <Provider store={store}>
            <Greeting />
        </Provider>
    ), document.getElementById('app'));
}

render();