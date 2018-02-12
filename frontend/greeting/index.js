import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    changeAcknowledgement,
    changePersonalQuestion
} from './reducer';

class Greeting extends Component {
    

    render () {
        const {acknowledgement, personalQuestion} = this.props;

        return (
            <div>
                {acknowledgement}, {personalQuestion}?
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {acknowledgement, personalQuestion} = state.greeting;
    return {
        acknowledgement,
        personalQuestion
    };
}

export default connect(mapStateToProps, {changeAcknowledgement, changePersonalQuestion})(Greeting);