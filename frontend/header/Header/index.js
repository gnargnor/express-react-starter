import React, {Component} from 'react';
import NavItem from '../NavItem';

class Header extends Component {
    render () {
        return (
            <header className='app-header'>
                <nav className='navbar'>
                    <NavItem exact to='/'>Home</NavItem>
                    <NavItem to='/about'>About</NavItem>
                </nav>
            </header>
        )
    }
}

export default Header;