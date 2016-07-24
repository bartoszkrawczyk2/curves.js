import React, { Component } from 'react';
import Workspace from '../Workspace';
import Sidebar from '../Sidebar';
import Curves from '../../containers/curves';
import ImageView from '../../containers/image';
import Histogram from '../../containers/histogram';
import Toolbar from '../../containers/toolbar';
import './style.scss';

class App extends Component {
    render() {
        return (
            <div className='app-wrapper'>
                <Workspace>
                    <Toolbar />
                    <ImageView />
                </Workspace>
                <Sidebar>
                    <Histogram />
                    <Curves />
                </Sidebar>
            </div>
        );
    }
}

export default App;