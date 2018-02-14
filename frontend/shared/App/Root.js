import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

// header goes here, for now we get a dumb greeting c/o ben bizzey
import Header from '../../header/Header';
import Greeting from '../../greeting';


// import pages / components
import Home from './Home';
import About from '../../about';

class Root extends Component {
    constructor () {
        super();
        // todo: add conditional error handling
        this.state = {};
    }

    render () {
        return (
            <div className='app-container'>
                <Greeting />
                <Header />
                <div className='page-content'>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/about' component={About} />
                    </Switch>
                </div>
            </div>
        );
    }
}

module.exports = Root;