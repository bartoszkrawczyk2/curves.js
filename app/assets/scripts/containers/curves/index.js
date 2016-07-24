import React from 'react';
import { connect } from 'react-redux';
import Curves from '../../components/Curves';
import * as actions from './actions';
import { round, drawSpline } from '../../core';
import spline from 'cubic-spline';

let mapStateToProps    = (state)    => state.curves;
let mapDispatchToProps = (dispatch) => {
    let x, y, dragging, draggingPont, w, h, pointsToModify, dragged = false, shift = false;

    document.addEventListener('keydown', (e) => {
        let key = e.keyCode || e.which;

        if (key == 16) shift = true;
    });

    document.addEventListener('keyup', (e) => {
        shift = false;
    });

    return {
        changeChannel: (value) => dispatch(actions.changeChannel(value)),

        mouseDown: (e, canvas, points) => {
            dragging = false;
            draggingPont = null;
            pointsToModify = null;
            w = canvas.width;
            h = canvas.height;

            x = e.nativeEvent.offsetX || e.nativeEvent.layerX;
            y = h - (e.nativeEvent.offsetY || e.nativeEvent.layerY);

            for (var i = 0; i < points.xs.length; i++) {
                if (
                    x >= points.xs[i] * w - 6 &&
                    x <= points.xs[i] * w + 6 &&
                    y >= points.ys[i] * h - 6 &&
                    y <= points.ys[i] * h + 6
                ) {
                    dragging = true;
                    draggingPont = i;
                    pointsToModify = Object.assign({}, points);
                    continue;
                }
            }

            if (dragging && shift) {
                dragging = false;
                draggingPont = null;
                dispatch(actions.removePoint(draggingPont+1));
            }
        },

        mouseMove: (e, canvas, ctx) => {
            if (!dragging || draggingPont == 0 || draggingPont == pointsToModify.xs.length - 1) return;

            dragged = true;

            let mx = e.nativeEvent.offsetX || e.nativeEvent.layerX;
            let my = e.nativeEvent.offsetY || e.nativeEvent.layerY;

            pointsToModify.xs[draggingPont] = (mx / w);
            pointsToModify.ys[draggingPont] = ((h - my) / h);

            drawSpline(
                canvas,
                ctx,
                pointsToModify.xs,
                pointsToModify.ys
            );
        },

        mouseUp: () => {
            dragging = false;

            if (dragged) {
                dispatch(actions.changeCurve(pointsToModify));
                dragged = false;
            }
            
        },

        doubleClick: (e, points) => {
            let dx = e.nativeEvent.offsetX || e.nativeEvent.layerX;
            let dy = h - (e.nativeEvent.offsetY || e.nativeEvent.layerY);
            if (
                spline(round(dx / w), points.xs, points.ys) * h >= dy - 8 &&
                spline(round(dx / w), points.xs, points.ys) * h <= dy + 8
            ) {
                dispatch(actions.addPoint(round(dx / w), round(dy / h)))
            }
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Curves);