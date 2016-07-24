import React, { Component } from 'react';
import { drawSpline } from '../../core';
import './style.scss';

class Curves extends Component {
    componentDidMount() {
        this.canvas = this.refs.canvas;
        this.canvas.width = 280;
        this.canvas.height = 280;
        this.ctx = this.canvas.getContext('2d');

        drawSpline(
            this.canvas,
            this.ctx,
            this.props.currentCurves[this.props.currentChannel].xs,
            this.props.currentCurves[this.props.currentChannel].ys
        );
    }

    componentWillUpdate(nextProps, nextState) {
        drawSpline(
            this.canvas,
            this.ctx,
            nextProps.currentCurves[nextProps.currentChannel].xs,
            nextProps.currentCurves[nextProps.currentChannel].ys
        );
    }
    
    
    render() {
        return (
            <div>
                <p>Select channel:</p>
                <select
                    className='channel-select'
                    value={this.props.currentChannel}
                    onChange={(e) => this.props.changeChannel(e.target.value)}>
                        <option value='a'>Brightness</option>
                        <option value='r'>Red</option>
                        <option value='g'>Green</option>
                        <option value='b'>Blue</option>
                </select>
                <canvas
                    ref='canvas'
                    onMouseDown={(e) => this.props.mouseDown(
                        e, 
                        this.canvas || null,
                        this.props.currentCurves[this.props.currentChannel]
                    )}
                    onMouseMove={(e) => this.props.mouseMove(
                        e,
                        this.canvas || null,
                        this.ctx || null
                    )}
                    onMouseUp={this.props.mouseUp}
                    onDoubleClick={(e) => this.props.doubleClick(e, this.props.currentCurves[this.props.currentChannel])} />
                <span className='curves-desc'>Double click to add point.</span>
                <span className='curves-desc'>Hold shift and click on point to remove.</span>
            </div>
        );
    }
}

export default Curves;