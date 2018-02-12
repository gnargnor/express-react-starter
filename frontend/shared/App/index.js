import React from 'react';
import {Provider} from 'react-redux';
import reducers from '../../reducers';
import {createStore} from 'redux';
import Greeting from '../../greeting';
import '../../style.css';

const store = createStore(reducers);

const App = (props) => {
    return (
        <Provider store={store}>
            <Greeting />
        </Provider>
    );
};

export default App;
