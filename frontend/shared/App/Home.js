import React, {Component} from 'react';
import {push} from 'react-router-redux';
import {connect} from 'react-redux';

class Home extends Component {
    render () {
        return (
            <div className='home'>
                <h1>Home</h1>
                <p>It's where the blart is</p>
            </div>
        )
    }
}

export default Home;