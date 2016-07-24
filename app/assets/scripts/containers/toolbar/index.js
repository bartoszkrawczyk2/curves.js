import React from 'react';
import { connect } from 'react-redux';
import Toolbar from '../../components/Toolbar';
import { saveAs } from 'filesaver.js';
import { saveOriginalImage,  } from '../image/actions';
import { resetState } from '../curves/actions';

let mapStateToProps    = (state)    => state;
let mapDispatchToProps = (dispatch) => {
    return {
        download: (canvas) => {
            canvas.toBlob((blob) => {
                saveAs(blob, 'curves.js.png');
            });
        },

        loadCustom: (e, canvas, ctx) => {
            if (!e.target.files[0]) return;

            dispatch(resetState());

            let url = URL.createObjectURL(e.target.files[0]);
            let img = new Image();

            img.onload = () => {
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

            img.src = url;
        },

        loadDefault: (url, canvas, ctx) => {
            dispatch(resetState());

            let img = new Image();

            img.onload = () => {
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

            img.src = url;
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);