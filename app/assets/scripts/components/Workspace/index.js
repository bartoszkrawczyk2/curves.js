import React, { Component } from 'react';
import './style.scss';

class Workspace extends Component {
    render() {
        return (
            <main className='workspace-wrapper'>
                {this.props.children}
            </main>
        );
    }
}

export default Workspace;