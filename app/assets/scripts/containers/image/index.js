import React from 'react';
import { connect } from 'react-redux';
import ImageView from '../../components/Image';
import { saveOriginalImage, saveEditedImage } from './actions'

let mapStateToProps    = (state)    => state;
let mapDispatchToProps = (dispatch) => {
    return {
        loadPhoto: (img, canvas, ctx) => {
            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0);

            let _canvas = document.createElement('canvas');
            let _ctx = _canvas.getContext('2d');
            _canvas.width = canvas.width;
            _canvas.height = canvas.height;
            _ctx.drawImage(img, 0, 0);

            dispatch(saveOriginalImage(_ctx.getImageData(0, 0, _canvas.width, _canvas.height).data));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageView);