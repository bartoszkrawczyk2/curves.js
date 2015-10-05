/*!
 curves.js
 (c) 2015 Bartosz Krawczyk
 bartoszkrawczyk.com
 MIT License
*/
define([], function() {
    'use strict';

    var C        = {},
        points   = [],
        curves   = [],
        current  = 'a',
        channels = ['a', 'r', 'g', 'b'],
        dragging = false,
        dragged  = false,
        histogramData,
        draggingPont,
        canvas,
        ctx,
        x, y,
        key;


    // -------------------------------------------------------------------- init curves:

    for (var i = 0; i < channels.length; i++) {
        key = channels[i];
        
        points[key] = [];

        curves[key]        = {};
        curves[key].values = [];
        curves[key].canvas = document.createElement('canvas');
        curves[key].ctx    = curves[key].canvas.getContext('2d');
        curves[key].canvas.width  = 256;
        curves[key].canvas.height = 256;

        curves[key].ctx.beginPath();
        curves[key].ctx.moveTo(0, 256);

        for (var j = 0; j < 256; j++) {
            curves[key].values.push(j);
            curves[key].ctx.lineTo(j, 256-j);
        };

        curves[key].ctx.stroke();
    };

    canvas          = document.createElement('canvas');
    ctx             = canvas.getContext('2d');
    canvas.width    = 256;
    canvas.height   = 256;
    ctx.lineWidth   = 2;
    ctx.strokeStyle = '#D6D6D6';

    C.el = canvas;





    // -------------------------------------------------------------------- private:

    var drawPoints = function () {
        for (var i = 0; i < points[current].length; i++) {
            ctx.beginPath();
            ctx.arc(points[current][i].x, points[current][i].y, 5, 0, 2 * Math.PI, false);
            ctx.fillStyle = '#D6D6D6';
            ctx.fill();
            ctx.closePath();
        }
    }

    var drawBg = function (canvas, ctx) {
        ctx.fillStyle = '#292929';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    var drawCurve = function (canvas, ctx, clear) {
        ctx.strokeStyle = '#D6D6D6';
        ctx.lineWidth   = 2;

        if (clear) ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.moveTo(0, 256);

        for (var i = 0; i < points[current].length; i++) {
            ctx.lineTo(points[current][i].x, points[current][i].y);
        }

        ctx.lineTo(256, 0);
        ctx.stroke();
    };

    var drawHistogram = function (ctx) {
        ctx.strokeStyle = '#676767';
        ctx.lineWidth   = 1;

        if (histogramData) {
            for (var i = 0; i < 256; i++) {
                ctx.beginPath();
                ctx.moveTo(i, 256);
                ctx.lineTo(i, 256-parseInt(256*((histogramData[current][i]/histogramData.max)*100)));
                ctx.closePath();
                ctx.stroke();
            }
        }
    }

    var getPoints = function (canvas, ctx) {
        var output = [], yAdded, data;
        for (var i = 0; i <= canvas.width; i++) {
            data = ctx.getImageData(i, 0, 1, canvas.height).data;
            yAdded = false;
            for (var j = 0; j < data.length; j+=4) {
                if (!yAdded && data[j+3] > 0) {
                    yAdded = true;
                    output.push(255-parseInt(j/4));
                }
            };
        };

        return output;
    };
    




    drawBg(canvas, ctx);

    // -------------------------------------------------------------------- events:

    canvas.addEventListener('dblclick', function(e) {
        x = e.offsetX == undefined ? e.layerX : e.offsetX;
        y = e.offsetY == undefined ? e.layerY : e.offsetY;

        if (y >= (255-curves[current].values[x])-10 && y <= (255-curves[current].values[x])+10) {
            points[current].push({
                x: x,
                y: 255-curves[current].values[x]
            });

            points[current] = points[current].sort(function(a, b) {
                var nA = a.x;
                var nB = b.x;

                if (nA < nB)
                    return -1;
                else if(nA > nB)
                    return 1;
             
                return 0;
            });

            drawPoints();
        }
    });

    canvas.addEventListener('mousedown', function(e) {
        x = e.offsetX == undefined ? e.layerX : e.offsetX;
        y = e.offsetY == undefined ? e.layerY : e.offsetY;

        for (var i = 0; i < points[current].length; i++) {
            if (x >= points[current][i].x-3 &&
                x <= points[current][i].x+3 &&
                y >= points[current][i].y-3 &&
                y <= points[current][i].y+3) {
                    dragging     = true;
                    draggingPont = i;
            }
        }
    });

    canvas.addEventListener('mousemove', function(e) {
        window.requestAnimationFrame(function() {
            if (dragging) {
                dragged = true;

                points[current][draggingPont].x = e.layerX;
                points[current][draggingPont].y = e.layerY;

                drawBg(canvas, ctx);
                drawHistogram(ctx);
                drawCurve(canvas, ctx);
                drawCurve(curves[current].canvas, curves[current].ctx, true);
                drawPoints();
            }
        });
    });

    canvas.addEventListener('mouseup', function(e) {
        dragging = false;
        if (dragged) {
            dragged = false;
            curves[current].values = getPoints(curves[current].canvas, curves[current].ctx);
            if (typeof C.changeCb === 'function') C.changeCb.call(null, {
                a: curves.a.values,
                r: curves.r.values,
                g: curves.g.values,
                b: curves.b.values
            });
        }
    });



    // -------------------------------------------------------------------- methods:

    C.drawCurve = function (c) {
        current = c;
        drawBg(canvas, ctx);
        drawHistogram(ctx);
        drawCurve(canvas, ctx);
        drawPoints();
    };

    C.drawHistogram = function (data) {
        histogramData = data;
        drawBg(canvas, ctx);
        drawHistogram(ctx);
        drawCurve(canvas, ctx);
        drawPoints();
    };



    return C;
});