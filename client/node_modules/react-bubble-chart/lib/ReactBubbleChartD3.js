//------------------------------------------------------------------------------
// Copyright Jonathan Kaufman 2015
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _d3 = require('d3');

var _d32 = _interopRequireDefault(_d3);

/**
 * Properties defined during construction:
 *   svg
 *   html
 *   legend
 *   bubble
 *   diameter
 *   colorRange
 *   colorLegend
 *   selectedColor
 *   legendSpacing
 *   smallDiameter
 *   textColorRange
 *   mediumDiameter
 *   configureLegend
 *   selectedTextColor
 *   fontSizeFactor
 *   duration
 *   delay
 */

var ReactBubbleChartD3 = (function () {
  function ReactBubbleChartD3(el) {
    var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, ReactBubbleChartD3);

    this.legendSpacing = typeof props.legendSpacing === 'number' ? props.legendSpacing : 3;
    this.selectedColor = props.selectedColor;
    this.selectedTextColor = props.selectedTextColor;
    this.smallDiameter = props.smallDiameter || 40;
    this.mediumDiameter = props.mediumDiameter || 115;
    this.fontSizeFactor = props.fontSizeFactor;
    this.duration = props.duration === undefined ? 500 : props.duration;
    this.delay = props.delay === undefined ? 7 : props.delay;

    // create an <svg> and <html> element - store a reference to it for later
    this.svg = _d32['default'].select(el).append('svg').attr('class', 'bubble-chart-d3').style('overflow', 'visible');
    this.html = _d32['default'].select(el).append('div').attr('class', 'bubble-chart-text').style('position', 'absolute').style('left', 0) // center horizontally
    .style('right', 0).style('margin-left', 'auto').style('margin-right', 'auto');
    this.legend = _d32['default'].select(el).append('svg').attr('class', 'bubble-legend').style('overflow', 'visible').style('position', 'absolute');
    this.tooltip = this.html.append('div').attr('class', 'tooltip').style('position', 'absolute').style('border-radius', '5px').style('border', '3px solid').style('padding', '5px').style('z-index', 500);
    // create legend and update
    this.adjustSize(el);
    this.update(el, props);
  }

  /**
   * Set this.diameter and this.bubble, also size this.svg and this.html
   */

  _createClass(ReactBubbleChartD3, [{
    key: 'adjustSize',
    value: function adjustSize(el) {
      // helper values for positioning
      this.diameter = Math.min(el.offsetWidth, el.offsetHeight);
      var top = Math.max((el.offsetHeight - this.diameter) / 2, 0);
      // center some stuff vertically
      this.svg.attr('width', this.diameter).attr('height', this.diameter).style('position', 'relative').style('top', top + 'px'); // center vertically
      this.html.style('width', this.diameter + 'px').style('height', this.diameter + 'px').style('top', top + 'px'); // center vertically;

      // create the bubble layout that we will use to position our bubbles\
      this.bubble = _d32['default'].layout.pack().sort(null).size([this.diameter, this.diameter]).padding(3);
    }

    /**
     * Create and configure the legend
     */
  }, {
    key: 'configureLegend',
    value: function configureLegend(el, props) {
      var _this = this;

      this.createLegend = props.legend;
      // for each color in the legend, remove any existing, then
      // create a g and set its transform
      this.legend.selectAll('.legend-key').remove();
      if (!this.createLegend) return;

      var legendRectSize = Math.min((el.offsetHeight - 20 - (this.colorLegend.length - 1) * this.legendSpacing) / this.colorLegend.length, 18);
      var legendHeight = this.colorLegend.length * (legendRectSize + this.legendSpacing) - this.legendSpacing;
      this.legend.style('height', legendHeight + 'px').style('width', legendRectSize + 'px').style('top', (el.offsetHeight - legendHeight) / 2 + 'px').style('left', 60 + 'px');

      var legendKeys = this.legend.selectAll('.legend-key').data(this.colorLegend).enter().append('g').attr('class', 'legend-key').attr('transform', function (d, i) {
        var height = legendRectSize + _this.legendSpacing;
        var vert = i * height;
        return 'translate(' + 0 + ',' + vert + ')';
      });

      // for each <g> create a rect and have its color... be the color
      legendKeys.append('rect').attr('width', legendRectSize).attr('height', legendRectSize).style('fill', function (c) {
        return c.color;
      }).style('stroke', function (c) {
        return c.color;
      });

      // add necessary labels to the legend
      legendKeys.append('text').attr('x', legendRectSize + 2).attr('y', legendRectSize - 4).text(function (c) {
        return c.text;
      });
    }

    /**
     * Create and configure the tooltip
     */
  }, {
    key: 'configureTooltip',
    value: function configureTooltip(el, props) {
      this.createTooltip = props.tooltip;
      this.tooltipFunc = props.tooltipFunc;
      // remove all existing divs from the tooltip
      this.tooltip.selectAll('div').remove();
      // intialize the styling
      this.tooltip.style('display', 'none');
      if (!this.createTooltip) return;

      // normalize the prop formats
      this.tooltipProps = (props.tooltipProps || []).map(function (tp) {
        return typeof tp === 'string' ? { css: tp, prop: tp, display: tp } : tp;
      });
      // create a div for each of the tooltip props
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.tooltipProps[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _step.value;
          var css = _step$value.css;
          var prop = _step$value.prop;

          this.tooltip.append('div').attr('class', css);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    /**
     * This is where the magic happens.
     * Update the tooltip and legend.
     * Set up and execute transitions of existing bubbles to new size/location/color.
     * Create and initialize new bubbles.
     * Remove old bubbles.
     * Maintain consistencies between this.svg and this.html
     */
  }, {
    key: 'update',
    value: function update(el, props) {
      var _this2 = this;

      this.adjustSize(el);
      // initialize color legend values and color range values
      // color range is just an array of the hex values
      // color legend is an array of the color/text objects
      var colorLegend = props.colorLegend || [];
      this.colorRange = colorLegend.map(function (c) {
        return typeof c === 'string' ? c : c.color;
      });
      this.colorLegend = colorLegend.slice(0).reverse().map(function (c) {
        return typeof c === 'string' ? { color: c } : c;
      });
      this.textColorRange = colorLegend.map(function (c) {
        return typeof c === 'string' ? '#000000' : c.textColor || '#000000';
      });
      this.configureLegend(el, props);
      this.configureTooltip(el, props);

      var data = props.data;
      if (!data) return;

      var fontFactor = this.fontSizeFactor;
      var duration = this.duration;
      var delay = this.delay;

      // define a color scale for our colorValues
      var color = _d32['default'].scale.quantize().domain([props.fixedDomain ? props.fixedDomain.min : _d32['default'].min(data, function (d) {
        return d.colorValue;
      }), props.fixedDomain ? props.fixedDomain.max : _d32['default'].max(data, function (d) {
        return d.colorValue;
      })]).range(this.colorRange);

      // define a color scale for text town
      var textColor = _d32['default'].scale.quantize().domain([props.fixedDomain ? props.fixedDomain.min : _d32['default'].min(data, function (d) {
        return d.colorValue;
      }), props.fixedDomain ? props.fixedDomain.max : _d32['default'].max(data, function (d) {
        return d.colorValue;
      })]).range(this.textColorRange);

      // generate data with calculated layout values
      var nodes = this.bubble.nodes(data.length ? { children: data } : data).filter(function (d) {
        return d.depth;
      }); // filter out the outer bubble

      // assign new data to existing DOM for circles and labels
      var circles = this.svg.selectAll('circle').data(nodes, function (d) {
        return 'g' + d._id;
      });
      var labels = this.html.selectAll('.bubble-label').data(nodes, function (d) {
        return 'g' + d._id;
      });

      // update - this is created before enter.append. it only applies to updating nodes.
      // create the transition on the updating elements before the entering elements
      // because enter.append merges entering elements into the update selection
      // for circles we transition their transform, r, and fill
      circles.transition().duration(duration).delay(function (d, i) {
        return i * delay;
      }).attr('transform', function (d) {
        return 'translate(' + d.x + ',' + d.y + ')';
      }).attr('r', function (d) {
        return d.r;
      }).style('opacity', 1).style('fill', function (d) {
        return d.selected ? _this2.selectedColor : color(d.colorValue);
      });
      // for the labels we transition their height, width, left, top, and color
      labels.on('mouseover', this._tooltipMouseOver.bind(this, color, el)).transition().duration(duration).delay(function (d, i) {
        return i * delay;
      }).style('height', function (d) {
        return 2 * d.r + 'px';
      }).style('width', function (d) {
        return 2 * d.r + 'px';
      }).style('left', function (d) {
        return d.x - d.r + 'px';
      }).style('top', function (d) {
        return d.y - d.r + 'px';
      }).style('opacity', 1).style('color', function (d) {
        return d.selected ? _this2.selectedTextColor : textColor(d.colorValue);
      }).attr('class', function (d) {
        var size;
        if (2 * d.r < _this2.smallDiameter) size = 'small';else if (2 * d.r < _this2.mediumDiameter) size = 'medium';else size = 'large';
        return 'bubble-label ' + size;
      })
      // we can pass in a fontSizeFactor here to set the label font-size as a factor of its corresponding circle's radius; this overrides CSS font-size styles set with the small, medium and large classes
      .style('font-size', function (d) {
        return fontFactor ? fontFactor * d.r + 'px' : null;
      });

      // enter - only applies to incoming elements (once emptying data)
      if (nodes.length) {
        // initialize new circles
        circles.enter().append('circle').attr('transform', function (d) {
          return 'translate(' + d.x + ',' + d.y + ')';
        }).attr('r', 0).attr('class', function (d) {
          return d.children ? 'bubble' : 'bubble leaf';
        }).style('fill', function (d) {
          return d.selected ? _this2.selectedColor : color(d.colorValue);
        }).transition().duration(duration * 1.2).attr('transform', function (d) {
          return 'translate(' + d.x + ',' + d.y + ')';
        }).attr('r', function (d) {
          return d.r;
        }).style('opacity', 1);
        // intialize new labels
        labels.enter().append('div').attr('class', function (d) {
          var size;
          if (2 * d.r < _this2.smallDiameter) size = 'small';else if (2 * d.r < _this2.mediumDiameter) size = 'medium';else size = 'large';
          return 'bubble-label ' + size;
        }).text(function (d) {
          return d.displayText || d._id;
        }).on('click', function (d, i) {
          _d32['default'].event.stopPropagation();props.onClick(d);
        }).on('mouseover', this._tooltipMouseOver.bind(this, color, el)).on('mouseout', this._tooltipMouseOut.bind(this)).style('position', 'absolute').style('height', function (d) {
          return 2 * d.r + 'px';
        }).style('width', function (d) {
          return 2 * d.r + 'px';
        }).style('left', function (d) {
          return d.x - d.r + 'px';
        }).style('top', function (d) {
          return d.y - d.r + 'px';
        }).style('color', function (d) {
          return d.selected ? _this2.selectedTextColor : textColor(d.colorValue);
        }).style('opacity', 0).transition().duration(duration * 1.2).style('opacity', 1).style('font-size', function (d) {
          return fontFactor ? fontFactor * d.r + 'px' : null;
        });
      }

      // exit - only applies to... exiting elements
      // for circles have them shrink to 0 as they're flying all over
      circles.exit().transition().duration(duration).attr('transform', function (d) {
        var dy = d.y - _this2.diameter / 2;
        var dx = d.x - _this2.diameter / 2;
        var theta = Math.atan2(dy, dx);
        var destX = _this2.diameter * (1 + Math.cos(theta)) / 2;
        var destY = _this2.diameter * (1 + Math.sin(theta)) / 2;
        return 'translate(' + destX + ',' + destY + ')';
      }).attr('r', 0).remove();
      // for text have them fade out as they're flying all over
      labels.exit().transition().duration(duration).style('top', function (d) {
        var dy = d.y - _this2.diameter / 2;
        var dx = d.x - _this2.diameter / 2;
        var theta = Math.atan2(dy, dx);
        var destY = _this2.diameter * (1 + Math.sin(theta)) / 2;
        return destY + 'px';
      }).style('left', function (d) {
        var dy = d.y - _this2.diameter / 2;
        var dx = d.x - _this2.diameter / 2;
        var theta = Math.atan2(dy, dx);
        var destX = _this2.diameter * (1 + Math.cos(theta)) / 2;
        return destX + 'px';
      }).style('opacity', 0).style('width', 0).style('height', 0).remove();
    }

    /**
     * On mouseover of a bubble, populate the tooltip with that elements info
     * (if this.createTooltip is true of course)
     */
  }, {
    key: '_tooltipMouseOver',
    value: function _tooltipMouseOver(color, el, d, i) {
      if (!this.createTooltip) return;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.tooltipProps[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _step2$value = _step2.value;
          var css = _step2$value.css;
          var prop = _step2$value.prop;
          var display = _step2$value.display;

          this.tooltip.select('.' + css).html((display ? display + ': ' : '') + d[prop]);
        }
        // Fade the popup fill mixing the shape fill with 80% white
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
            _iterator2['return']();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      var fill = color(d.colorValue);
      var backgroundColor = _d32['default'].rgb(_d32['default'].rgb(fill).r + 0.8 * (255 - _d32['default'].rgb(fill).r), _d32['default'].rgb(fill).g + 0.8 * (255 - _d32['default'].rgb(fill).g), _d32['default'].rgb(fill).b + 0.8 * (255 - _d32['default'].rgb(fill).b));
      this.tooltip.style('display', 'block');

      var tooltipNode = this.tooltip.node();
      if (this.tooltipFunc) {
        this.tooltipFunc(tooltipNode, d, fill);
      }
      var width = tooltipNode.offsetWidth + 1; // +1 for rounding reasons
      var height = tooltipNode.offsetHeight;
      var buffer = 5;

      // calculate where the top is going to be. ideally it is
      // (d.y - height/2) which'll put the tooltip in the middle of the bubble.
      // we need to account for if this'll put it out of bounds.
      var top;
      // if it goes above the bounds, have the top be the buffer
      if (d.y - height < 0) {
        top = buffer;
        // if it goes below the bounds, have its buttom be a buffer length away
      } else if (d.y + height / 2 > el.offsetHeight) {
          top = el.offsetHeight - height - buffer;
          // otherwise smack this bad boy in the middle of its bubble
        } else {
            top = d.y - height / 2;
          }

      // calculate where the left is going to be. ideally it is
      // (d.x + d.r + buffer) which will put the tooltip to the right
      // of the bubble. we need to account for the case where this puts
      // the tooltip out of bounds.
      var left;
      // if there's room to put it on the right of the bubble, do so
      if (d.x + d.r + width + buffer < el.offsetWidth) {
        left = d.x + d.r + buffer;
        // if there's room to put it on the left of the bubble, do so
      } else if (d.x - d.r - width - buffer > 0) {
          left = d.x - d.r - width - buffer;
          // otherwise put it on the right part of its container
        } else {
            left = el.offsetWidth - width - buffer;
          }

      this.tooltip.style('background-color', backgroundColor).style('border-color', fill).style('width', width + 'px').style('left', left + 'px').style('top', top + 'px');
    }

    /**
     * On tooltip mouseout, hide the tooltip.
     */
  }, {
    key: '_tooltipMouseOut',
    value: function _tooltipMouseOut(d, i) {
      if (!this.createTooltip) return;
      this.tooltip.style('display', 'none').style('width', '').style('top', '').style('left', '');
    }

    /** Any necessary cleanup */
  }, {
    key: 'destroy',
    value: function destroy(el) {}
  }]);

  return ReactBubbleChartD3;
})();

exports['default'] = ReactBubbleChartD3;
module.exports = exports['default'];