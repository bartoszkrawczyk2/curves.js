/*!
 curves.js
 (c) 2015 Bartosz Krawczyk
 bartoszkrawczyk.com
 MIT License
*/
define(['react'], function(React) {
    'use strict';

    var Component = {},
        OutputImage,
        original,
        originalCtx,
        canvas,
        img,
        ctx;


    var array256 = function () {
        var arr = [];
        for (var i = 0; i < 256; i++) { arr[i] = 0; }
        return arr;
    }


    var getHistogramData = function (image) {
        var _c, _ctx, _all, data, out = {};

        out.a = array256();
        out.r = array256();
        out.g = array256();
        out.b = array256();

        _c        = document.createElement('canvas');
        _ctx      = _c.getContext('2d');
        _c.width  = image.width;
        _c.height = image.height;
        _ctx.drawImage(image, 0, 0, image.width, image.height);

        data = _ctx.getImageData(0, 0, image.width, image.height).data;

        for (var i = 0; i < data.length; i += 4) {
            _all = parseInt(data[i]/3) + parseInt(data[i+1]/3) + parseInt(data[i+2]/3);

            if (_all > out.a.length-1) _all = out.a.length-1;
            out.a[_all]++;
            out.r[data[i]]++;
            out.g[data[i+1]]++;
            out.b[data[i+2]]++;
        }

        out.max = parseInt((data.length)/4);

        _c.remove();

        return out;
    };



    var curvesImageData = function (image, curves) {
        var _c, _ctx, out;

        _c        = document.createElement('canvas');
        _ctx      = _c.getContext('2d');
        _c.width  = image.width;
        _c.height = image.height;
        _ctx.drawImage(image, 0, 0, image.width, image.height);

        var imageData = _ctx.getImageData(0, 0, image.width, image.height),
            data      = imageData.data,
            length    = data.length, i;

        for (i = 0; i < length; i += 4) {
            data[i] = curves.r[data[i]];
            data[i+1] = curves.g[data[i+1]];
            data[i+2] = curves.b[data[i+2]];
        }

        for (i = 0; i < length; i += 4) {
            data[i] = curves.a[data[i]];
            data[i+1] = curves.a[data[i+1]];
            data[i+2] = curves.a[data[i+2]];
        }

        out = imageData;
        _c.remove();

        return out;
    };



    Component.init = function (el, url, cb) {
        canvas      = document.createElement('canvas');
        original    = document.createElement('canvas');
        ctx         = canvas.getContext('2d');
        originalCtx = original.getContext('2d');
        
        img = new Image();
        img.onload = function () {
            canvas.width    = this.width;
            canvas.height   = this.height;
            original.width  = this.width;
            original.height = this.height;
            ctx.drawImage(this, 0, 0, this.width, this.height);
            originalCtx.drawImage(this, 0, 0, this.width, this.height);

            if (typeof cb === 'function') cb.call(null, getHistogramData(this));
        };
        img.src = url;

        OutputImage = React.createClass({
            componentDidMount: function () {
                this.getDOMNode().appendChild(canvas);
            },
            render: function() {
                return <div />;
            }
        });

        React.render(<OutputImage />, el);
    };



    Component.applyCurves = function (curves) {
        ctx.putImageData(curvesImageData(original, curves), 0, 0);
        return getHistogramData(canvas);
    };

    return Component;
});