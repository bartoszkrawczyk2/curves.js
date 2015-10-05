/*!
 curves.js
 (c) 2015 Bartosz Krawczyk
 bartoszkrawczyk.com
 MIT License
*/
define(['react', 'components/curvesCanvas'], function(React, Canvas) {
    'use strict';

    var Component = {},
        inited    = false,
        Curves, CanvasComponent;

    
    Component.drawHistogram = function (histogramData) {
        Canvas.drawHistogram(histogramData);
    };

    Component.init = function (el) {
        inited = true;

        CanvasComponent = React.createClass({
            componentDidMount: function () {
                this.getDOMNode().appendChild(Canvas.el);
                Canvas.drawCurve(this.props.current);
            },
            render: function() {
                return <div />;
            }
        });

        Curves = React.createClass({
            getInitialState: function () {
                return {
                    currentCurve: 'a'
                }
            },
            selectCurve: function (e) {
                this.setState({
                    currentCurve: e.target.value
                });

                Canvas.drawCurve(e.target.value);
            },
            render: function () {
                return (
                    <div>
                        <div className="curves-select" value={this.state.currentCurve} onChange={this.selectCurve}>
                            <select>
                                <option value="a">Brightness</option>
                                <option value="r">Red</option>
                                <option value="g">Green</option>
                                <option value="b">Blue</option>
                            </select>
                        </div>
                        <CanvasComponent current={this.state.currentCurve} />
                        <p>Double click on curve to add point</p>
                    </div>
                );
            }
        });

        React.render(<Curves />, el);

        Component.onCurvesChange = function (cb) {
            Canvas.changeCb = cb;
        };
    };


    return Component;
});