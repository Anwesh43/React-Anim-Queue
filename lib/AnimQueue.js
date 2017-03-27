'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Transformation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Transformation = function (_Component) {
    _inherits(Transformation, _Component);

    function Transformation(props) {
        _classCallCheck(this, Transformation);

        var _this = _possibleConstructorReturn(this, (Transformation.__proto__ || Object.getPrototypeOf(Transformation)).call(this, props));

        _this.state = { style: [] };
        return _this;
    }

    return Transformation;
}(_react.Component);

var AnimQueue = function (_Component2) {
    _inherits(AnimQueue, _Component2);

    function AnimQueue(props) {
        _classCallCheck(this, AnimQueue);

        var _this2 = _possibleConstructorReturn(this, (AnimQueue.__proto__ || Object.getPrototypeOf(AnimQueue)).call(this, props));

        _this2.state = { queue: [], style: _this2.props.style };
        return _this2;
    }

    _createClass(AnimQueue, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this3 = this;

            var childrenProps = this.props.children.map(function (child) {
                return child.props;
            });

            var queue = this.state.queue;
            childrenProps.forEach(function (childProps) {
                if (childProps.type != undefined && childProps.to != undefined && childProps.from != undefined && childProps.axis != undefined && childProps.duration != undefined) {
                    var queueObj = {};
                    queueObj.lastPart = 'px';
                    if (childProps.type == 'rotate') {
                        queueObj.lastPart = 'deg';
                    }
                    queueObj.transformFn = '' + childProps.type + childProps.axis;
                    queueObj.counter = 0;
                    queueObj.till = childProps.duration / 100;
                    queueObj.speed = (childProps.to - childProps.from) / queueObj.till;
                    queueObj.curr = parseInt(childProps.from);
                    queue.push(queueObj);
                }
            });
            this.setState({ queue: queue });
            var prevTransform = "";
            var intervalObj = setInterval(function () {
                var queue = _this3.state.queue;
                var style = Object.assign({}, _this3.state.style);
                console.log(queue);
                console.log(style);
                if (queue.length > 0 && style != undefined) {
                    var firstObj = queue[0];
                    style.WebkitTransform = '' + prevTransform + firstObj.transformFn + '(' + firstObj.curr + firstObj.lastPart + ')';
                    style.MozTransform = '' + prevTransform + firstObj.transformFn + '(' + firstObj.curr + firstObj.lastPart + ')';
                    style.OTransform = '' + prevTransform + firstObj.transformFn + '(' + firstObj.curr + firstObj.lastPart + ')';
                    style.transform = '' + prevTransform + firstObj.transformFn + '(' + firstObj.curr + firstObj.lastPart + ')';
                    firstObj.curr += parseInt(firstObj.speed);
                    firstObj.counter++;
                    if (firstObj.counter == firstObj.till + 1) {
                        queue.splice(0, 1);
                        prevTransform = style.transform;
                    }
                    _this3.setState({ style: style, queue: queue });
                } else {
                    clearInterval(intervalObj);
                }
            }, 100);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement('div', { style: this.state.style });
        }
    }]);

    return AnimQueue;
}(_react.Component);

exports.default = AnimQueue;
exports.Transformation = Transformation;