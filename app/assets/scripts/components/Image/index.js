import React, { Component } from 'react';
import { applyCurves } from '../../core';
import './style.scss';

class ImageView extends Component {
    componentDidMount() {
        let img = new Image();
        
        img.onload = () => {
            this.props.loadPhoto(img, this.props.image.renderCanvas, this.props.image.renderCtx);
            this.refs.canvasContainer.appendChild(this.props.image.renderCanvas);
        }

        img.src = this.props.image.defaultImage;
    }

    componentWillUpdate(nextProps, nextState) {
        applyCurves(
            nextProps.image.originalImage,
            this.props.image.renderCanvas,
            this.props.image.renderCtx,
            nextProps.curves.currentCurves
        );
    }
    
    
    render() {
        return (
            <div className='image-wrapper' ref='canvasContainer'></div>
        );
    }
}

export default ImageView;