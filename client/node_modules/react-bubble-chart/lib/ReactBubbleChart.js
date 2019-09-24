//------------------------------------------------------------------------------
// Copyright Jonathan Kaufman Corp. 2015
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//------------------------------------------------------------------------------

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ReactBubbleChartD3 = require('./ReactBubbleChartD3');

var _ReactBubbleChartD32 = _interopRequireDefault(_ReactBubbleChartD3);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

// Description of props!

// data format:
// An array of data objects (defined below) used to populate the bubble chart.
// {
//    _id: string,        // unique id (required)
//    value: number,      // used to determine relative size of bubbles (required)
//    displayText: string,// will use _id if undefined
//    colorValue: number, // used to determine color
//    selected: boolean,  // if true will use selectedColor/selectedTextColor for circle/text
// }
//
// Can also be a nested JSON object if you want a nested bubble chart. That would look like:
// {
//   _id: string,
//   children: [
//     {data object},
//     {data object},
//     {
//       _id: string,
//       children: [...]
//     }
//   ]

// legend (optional)
// boolean. if true, create and show a legend based on the passed on colors

// colorLegend (optional)
// an array of:
// string || {
//   color: string,
//   text: string used in legend,
//   textColor: string (optional) - if specified will use this for the text color when
//              over bubbles with that color
// }
// If this is left undefined everything will render black. But fear not! we add
// the css class `bubble` to all... bubbles and `bubble leaf` if it has no
// children. This way if you want all bubbles to be styled the same way you can do
// so with just css instead of defining a color legend array.

// fixedDomain (optional)
// Used in tandum with the color legend. If defined, the minimum number corresponds
// to the minimum value in the color legend array, and the maximum corresponds to
// the max. The rest of the `colorValue` values will use a quantized domain to find
// their spot.
// If this is undefined we will use the min and max of the `colorValue`s of the
// dataset.
// {
//   min: number,
//   max: number
// }

// tooltip (optional)
// If `true`, will create a `<div>` as a sibling of the main `<svg>` chart, whose
// content will be populated by highlighting over one of the bubbles. The class of
// this element is `tooltip`. For now all of the styling is handled by this module,
// not by CSS.

// tooltipProps (optional)
// This is where you configure what is populated (and from where) in the tooltip.
// This is an array of objects or strings. The objects take three properties -
// `css`, `prop`, and `display` (optional). If you use a string instead of an
// object, that strings values will be used for all three.

// For each object in this array, we create a `<div>` whose class is specified by
// `css`. `prop` specifies what property of the data object to display in the
// tooltip. `display` (if specified) will prepend the string with `Value: `, if
// unspecified, nothing is prepended.

// tooltipFunc (optional)
// A function that is passed the domNode, the d3 data object, and the color of the
// tooltip on hover. Can be used if you want to do fancier dom stuff than just set
// some text values.

// selectedColor
// String hex value.
// If defined, will use this to color the circle corresponding to the data object
// whose `selected` property is true.

// selectedTextColor
// String hex value.
// If defined, will use this to color the text corresponding to the data object
// whose `selected` property is true.

// onClick
// Can pass a function that will be called with the data object when that bubble is
// clicked on.

// smallDiameter
// Can pass a number below which the label div will have the `small` class added.
// defaults to 40

// mediumDiameter
// Can pass a number below which the label div will have the `medium` class added,
// and above which the `large` class will be added. Defaults to 115.

// legendSpacing
// The number of pixels between blocks in the legend

// fontSizeFactor
// A multiplier used to determine a bubble's font-size as a function of its radius.
// If not specified, the font-sizes depend on CSS styles for large, medium, and small classes, or 1em by default.

// duration
// Determines the length of time (in milliseconds) it takes for each bubble's transition animation to complete.
// defaults to 500 ms; can set to zero

// delay
// Staggers the transition between each bubble element.
// defaults to 7 ms

// for more info, see the README

var ReactBubbleChart = (function (_React$Component) {
  _inherits(ReactBubbleChart, _React$Component);

  function ReactBubbleChart(props) {
    var _this = this;

    _classCallCheck(this, ReactBubbleChart);

    _get(Object.getPrototypeOf(ReactBubbleChart.prototype), 'constructor', this).call(this, props);
    // define the method this way so that we have a clear reference to it
    // this is necessary so that window.removeEventListener will work properly
    this.handleResize = function (e) {
      return _this._handleResize(e);
    };
  }

  /** Render town */

  _createClass(ReactBubbleChart, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement('div', { className: "bubble-chart-container " + this.props.className });
    }

    /** When we mount, intialize resize handler and create the bubbleChart */
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('resize', this.handleResize);
      this.bubbleChart = new _ReactBubbleChartD32['default'](this.getDOMNode(), this.getChartState());
    }

    /** When we update, update our friend, the bubble chart */
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.bubbleChart.update(this.getDOMNode(), this.getChartState());
    }

    /** Define what props get passed down to the d3 chart */
  }, {
    key: 'getChartState',
    value: function getChartState() {
      return {
        data: this.props.data,
        colorLegend: this.props.colorLegend,
        fixedDomain: this.props.fixedDomain,
        selectedColor: this.props.selectedColor,
        selectedTextColor: this.props.selectedTextColor,
        onClick: this.props.onClick || function () {},
        smallDiameter: this.props.smallDiameter,
        mediumDiameter: this.props.mediumDiameter,
        legendSpacing: this.props.legendSpacing,
        legend: this.props.legend,
        tooltip: this.props.tooltip,
        tooltipProps: this.props.tooltipProps,
        tooltipFunc: this.props.tooltipFunc,
        fontSizeFactor: this.props.fontSizeFactor,
        duration: this.props.duration,
        delay: this.props.delay
      };
    }

    /** When we're piecing out, remove the handler and destroy the chart */
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
      this.bubbleChart.destroy(this.getDOMNode());
    }

    /** Helper method to reference this dom node */
  }, {
    key: 'getDOMNode',
    value: function getDOMNode() {
      return _reactDom2['default'].findDOMNode(this);
    }

    /** On a debounce, adjust the size of our graph area and then update the chart */
  }, {
    key: '_handleResize',
    value: function _handleResize(e) {
      var _this2 = this;

      this.__resizeTimeout && clearTimeout(this.__resizeTimeout);
      this.__resizeTimeout = setTimeout(function () {
        _this2.bubbleChart.adjustSize(_this2.getDOMNode());
        _this2.bubbleChart.update(_this2.getDOMNode(), _this2.getChartState());
        delete _this2.__resizeTimeout;
      }, 200);
    }
  }]);

  return ReactBubbleChart;
})(_react2['default'].Component);

exports['default'] = ReactBubbleChart;
module.exports = exports['default'];