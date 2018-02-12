import React, {Component} from 'react';
import Greeting from '../../greeting';

class Root extends Component {
    constructor () {
        super();
        this.state = {};
    }

    render () {
        return (
            <div className='app-container'>
                <Greeting />
            </div>
        );
    }
}

module.exports = Root;