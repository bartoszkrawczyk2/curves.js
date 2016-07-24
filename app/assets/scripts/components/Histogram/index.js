import React, { Component } from 'react';
import { drawHistogram } from '../../core';

class Histogram extends Component {
    componentDidMount() {
        this.canvas = this.refs.canvas;
        this.canvas.width = 280;
        this.canvas.height = 140;
        this.ctx = this.canvas.getContext('2d');
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.image.renderCanvas) {
            drawHistogram(
                this.canvas,
                this.ctx,
                this.props.image.renderCanvas
            );
        }
    }
    
    render() {
        return (
            <div className='histogram'>
                <canvas ref='canvas' />
            </div>
        );
    }
}

export default Histogram;