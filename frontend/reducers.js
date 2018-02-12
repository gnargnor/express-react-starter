import {combineReducers} from 'redux';
// import reducers
import Greeting from './greeting/reducer';

export default combineReducers({
    greeting: Greeting
});