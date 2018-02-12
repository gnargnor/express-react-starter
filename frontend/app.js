import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './shared/App';

render(App);

if (module.hot) {
    module.hot.accept('./shared/App', () => {
        render(require('./shared/App').default);
    })
}

function render (Component) {
    const tree = (
        <AppContainer>
            <Component />
        </AppContainer>
    )
    ReactDOM.render(tree, document.getElementById('app'));
}
