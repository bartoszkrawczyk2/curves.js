/*!
 curves.js
 (c) 2015 Bartosz Krawczyk
 bartoszkrawczyk.com
 MIT License
*/
define(['components/curves', 'components/outputImage'], function(curvesComponent, outputImage) {
    'use strict';

    var histogramData;

    curvesComponent.init(document.getElementById('curves'));

    outputImage.init(document.getElementById('outputImage'), '/assets/images/test.jpg', function(histogramData) {
        curvesComponent.drawHistogram(histogramData);
    });
    
    curvesComponent.onCurvesChange(function(curves) {
        histogramData = outputImage.applyCurves(curves);
        curvesComponent.drawHistogram(histogramData);
    });
});