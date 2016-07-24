import React, { Component } from 'react';
import './style.scss';

class Toolbar extends Component {
    render() {
        let pi = this.props.image;

        return (
            <div className='toolbar'>
                <button onClick={() => this.props.loadDefault(pi.defaultImage, pi.renderCanvas, pi.renderCtx)}>Default photo</button>{' '}
                <span className='upload'>
                    <button>Upload custom photo</button>
                    <input type='file' multiple={false} onChange={e => this.props.loadCustom(e, pi.renderCanvas, pi.renderCtx)} />
                </span>{' '}
                <button onClick={() => this.props.download(pi.renderCanvas)}>Download</button>{' '}
            </div>
        );
    }
}

export default Toolbar;