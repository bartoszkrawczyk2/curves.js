import React, { Component } from 'react';
import './style.scss';

class Sidebar extends Component {
    render() {
        return (
            <div className='sidebar' id='sidebar'>
                <div className='sidebar__top'>
                    {this.props.children}
                </div>
                <div className='sidebar__bottom'>
                    <a href='https://github.com/bartoszkrawczyk2/curves.js' target='_blank'>github</a>
                    <a href='http://bartoszkrawczyk.com/' target='_blank'>bartoszkrawczyk.com</a>
                </div>
            </div>
        );
    }
}

export default Sidebar;