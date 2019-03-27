'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var styled = _interopDefault(require('@emotion/styled'));
var core = require('@emotion/core');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

var getDisplayName = function (WrappedComponent) { return (WrappedComponent.displayName || WrappedComponent.name || 'Component'); };
var suggestionInputHoc = function (WrappedComponent) {
    return /** @class */ (function (_super) {
        __extends(SuggestionInput, _super);
        function SuggestionInput() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.elementHeight = 60;
            _this.targetNode = null;
            _this.displayName = "SuggestedInput(" + getDisplayName(WrappedComponent) + ")";
            _this.state = {
                selectedListIndex: -1,
                boxTopPosition: null,
                offset: null,
            };
            _this.addEventListener = function () {
                window.addEventListener('scroll', _this.checkHeight);
            };
            _this.removeEventListener = function () {
                window.removeEventListener('scroll', _this.checkHeight);
            };
            _this.increaseListIndex = function (num) {
                _this.setState(function (prevState) { return ({ selectedListIndex: prevState.selectedListIndex + num }); });
            };
            _this.onKeyPress = function (event, listLength, handleSelectElement, scrollContainer) {
                switch (event.key) {
                    case 'ArrowDown': {
                        _this.scrollDown(scrollContainer, listLength);
                        if (_this.state.selectedListIndex === -1) {
                            _this.setState({ selectedListIndex: 0 });
                        }
                        else if (_this.state.selectedListIndex < listLength - 1) {
                            _this.increaseListIndex(1);
                        }
                        break;
                    }
                    case 'ArrowUp': {
                        _this.scrollUp(scrollContainer, listLength);
                        if (_this.state.selectedListIndex > 0) {
                            _this.increaseListIndex(-1);
                        }
                        break;
                    }
                    case 'Enter': {
                        event.preventDefault();
                        if (_this.state.selectedListIndex !== -1) {
                            handleSelectElement(event);
                            _this.setState({ selectedListIndex: -1 });
                        }
                        break;
                    }
                    default:
                        break;
                }
            };
            _this.setTargetNode = function (node) {
                _this.targetNode = node;
            };
            _this.checkHeight = function () { return __awaiter(_this, void 0, void 0, function () {
                var node, rect, boxTopPosition, offset;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = this.targetNode;
                            if (!node) return [3 /*break*/, 4];
                            rect = node.getBoundingClientRect();
                            boxTopPosition = rect.top + rect.height + 55;
                            offset = rect.top;
                            if (!(this.state.boxTopPosition !== boxTopPosition)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.setState({ boxTopPosition: boxTopPosition })];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            if (!(this.state.offset !== offset)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.setState({ offset: offset })];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            }); };
            return _this;
        }
        SuggestionInput.prototype.scrollUp = function (scrollContainer, listLength) {
            var tmpContainer = scrollContainer.current;
            if (listLength > 0 && tmpContainer) {
                var topOffsetElements = Math.ceil(tmpContainer.scrollTop / this.elementHeight);
                if (this.state.selectedListIndex === topOffsetElements) {
                    tmpContainer.scrollTop = (topOffsetElements - 1) * this.elementHeight;
                }
            }
        };
        SuggestionInput.prototype.scrollDown = function (scrollContainer, listLength) {
            var tmpContainer = scrollContainer.current;
            if (listLength > 0 && tmpContainer) {
                var containerHeight = tmpContainer.offsetHeight;
                var maxFullContainElements = Math.floor(containerHeight / this.elementHeight);
                var splittedElementHeight = containerHeight % this.elementHeight;
                var needToScroll = this.elementHeight - splittedElementHeight;
                if (maxFullContainElements - 1 === this.state.selectedListIndex) {
                    tmpContainer.scrollTop = needToScroll;
                }
                if (maxFullContainElements - 1 < this.state.selectedListIndex) {
                    tmpContainer.scrollTop += this.elementHeight;
                }
            }
        };
        SuggestionInput.prototype.render = function () {
            return (React__default.createElement(WrappedComponent, __assign({ addEventListener: this.addEventListener, removeEventListener: this.removeEventListener, boxTopPosition: this.state.boxTopPosition, onKeyPress: this.onKeyPress, selectedListIndex: this.state.selectedListIndex, setTarget: this.setTargetNode, checkHeight: this.checkHeight, offset: this.state.offset }, this.props)));
        };
        return SuggestionInput;
    }(React__default.Component));
};

var ChipsInputContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  padding: 5px 10px;\n  min-height: 60px;\n  border-radius: 5px;\n  border: 1px solid black;\n  background-color: white;\n"], ["\n  display: flex;\n  align-items: center;\n  padding: 5px 10px;\n  min-height: 60px;\n  border-radius: 5px;\n  border: 1px solid black;\n  background-color: white;\n"])));
var ChipsWrapper = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  flex-wrap: wrap;\n  flex: 0 100%;\n  margin-left: 10px;\n  position: relative;\n  input {\n    font-size: 1rem;\n    line-height: 26px;\n    letter-spacing: 0.3px;\n    outline: none;\n    margin-left: 5px;\n    background-color: rgba(0,0,0,0);\n    &:focus {\n        border: none;\n        outline: none;\n    }\n    &::placeholder {\n        color: ", ";\n        opacity: 1;\n    }\n  }\n"], ["\n  display: flex;\n  flex-wrap: wrap;\n  flex: 0 100%;\n  margin-left: 10px;\n  position: relative;\n  input {\n    font-size: 1rem;\n    line-height: 26px;\n    letter-spacing: 0.3px;\n    outline: none;\n    margin-left: 5px;\n    background-color: rgba(0,0,0,0);\n    &:focus {\n        border: none;\n        outline: none;\n    }\n    &::placeholder {\n        color: ", ";\n        opacity: 1;\n    }\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.lls_text_grey;
});
var InputContainer = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  height: auto;\n  align-items: center;\n  display: flex;\n  flex: 1;\n"], ["\n  height: auto;\n  align-items: center;\n  display: flex;\n  flex: 1;\n"])));
var SearchContainer = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  width: 100%;\n"], ["\n  width: 100%;\n"])));
var SearchInputContainer = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: block;\n  align-items: center;\n  padding-right: 5px;\n  & input {\n    width: 100%;\n    min-width: 200px;\n    border: none;\n  }\n"], ["\n  display: block;\n  align-items: center;\n  padding-right: 5px;\n  & input {\n    width: 100%;\n    min-width: 200px;\n    border: none;\n  }\n"])));
var ResultsContainer = styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  position: absolute;\n  width: 100%;\n  overflow-y: auto;\n  z-index: 999;\n  box-shadow: 0 4px 14px 0 rgba(0, 0, 0, .19);\n  left: 0;\n"], ["\n  position: absolute;\n  width: 100%;\n  overflow-y: auto;\n  z-index: 999;\n  box-shadow: 0 4px 14px 0 rgba(0, 0, 0, .19);\n  left: 0;\n"])));
var NothingFoundContainer = styled.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-top: 1px solid white;\n  height: 60px;\n  color: ", ";\n  background-color: white;\n"], ["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-top: 1px solid white;\n  height: 60px;\n  color: ", ";\n  background-color: white;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.lls_text_grey;
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;

var SearchInput = /** @class */ (function (_super) {
    __extends(SearchInput, _super);
    function SearchInput(props) {
        var _this = _super.call(this, props) || this;
        _this.handleClickOutside = function (event) {
            if (_this.inputContainerRef) {
                var node = _this.inputContainerRef.current;
                if (node && !node.contains(event.srcElement)) {
                    if (!_this.isUnmounted) {
                        _this.setState({ nothingFound: false, hitList: [] });
                    }
                    if (_this.props.handleClickOutside) {
                        _this.props.handleClickOutside(event);
                    }
                }
            }
        };
        _this.clearAndHide = function () {
            if (_this.state.nothingFound
                || _this.state.hitList.length > 0
                || (_this.inputNode && _this.inputNode.value)) {
                if (!_this.isUnmounted) {
                    _this.setState({ nothingFound: false, hitList: [] });
                    if (_this.inputNode) {
                        _this.inputNode.value = '';
                        _this.inputNode.focus();
                    }
                }
            }
        };
        _this.selectClickedElement = function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.props.handleSelectElement(value, this.clearAndHide)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.clearAndHide()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.selectCurrentElement = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.props.handleSelectElement(this.state.hitList[this.props.selectedListIndex], this.clearAndHide)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.clearAndHide()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.searchAction = function (event) { return __awaiter(_this, void 0, void 0, function () {
            var value;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        value = event.target.value;
                        if (!!this.isUnmounted) return [3 /*break*/, 6];
                        if (!(value.trim().length !== 0)) return [3 /*break*/, 5];
                        if (!this.props.fetchSearchSuggestions) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.setState({ loadingSuggestions: true })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.props.fetchSearchSuggestions(value)
                                .then(function (list) {
                                if (list.length === 0) {
                                    _this.setState({ nothingFound: true });
                                }
                                else {
                                    _this.setState({ nothingFound: false });
                                }
                                _this.setState({
                                    hitList: list,
                                    loadingSuggestions: false,
                                });
                                _this.props.checkHeight();
                            })
                                .catch(function () {
                                _this.setState({ hitList: [] });
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        if (this.props.suggestionList) {
                            this.setState({ nothingFound: false });
                            this.setState({ hitList: this.props.suggestionList });
                            this.props.checkHeight();
                        }
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        this.setState({ nothingFound: true, loadingSuggestions: false });
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        _this.setNode = function (inputNode) {
            if (inputNode) {
                _this.inputNode = inputNode;
                if (_this.props.setInputRef) {
                    _this.props.setInputRef(inputNode);
                }
            }
        };
        _this.onKeyDownItem = function (event) {
            if (_this.scrollContainerRef) {
                _this.props.onKeyPress(event, _this.state.hitList.length, _this.selectCurrentElement, _this.scrollContainerRef);
            }
        };
        _this.state = {
            hitList: [],
            loadingSuggestions: false,
            nothingFound: false,
        };
        _this.isUnmounted = false;
        _this.inputNode = null;
        _this.inputContainerRef = React__default.createRef();
        _this.scrollContainerRef = React__default.createRef();
        return _this;
    }
    SearchInput.prototype.componentDidMount = function () {
        document.addEventListener('mousedown', this.handleClickOutside);
        this.props.checkHeight();
        if (this.inputContainerRef && this.inputContainerRef.current) {
            this.props.setTarget(this.inputContainerRef.current);
        }
    };
    SearchInput.prototype.componentWillUnmount = function () {
        document.removeEventListener('mousedown', this.handleClickOutside);
        this.props.removeEventListener();
        this.isUnmounted = true;
    };
    SearchInput.prototype.render = function () {
        var _this = this;
        var _a = this.props, emptyMessage = _a.emptyMessage, inputPlaceholder = _a.inputPlaceholder;
        return (React__default.createElement(InputContainer, { ref: this.inputContainerRef, onKeyDown: this.onKeyDownItem },
            React__default.createElement(SearchContainer, null,
                React__default.createElement(SearchInputContainer, null,
                    React__default.createElement("input", { ref: this.setNode, className: this.props.inputClassName, placeholder: inputPlaceholder, onChange: this.searchAction, onFocus: this.props.addEventListener, onBlur: this.props.removeEventListener })),
                React__default.createElement(ResultsContainer, { style: { maxHeight: "calc(100vh - " + (this.props.boxTopPosition || '100') + "px)", }, ref: this.scrollContainerRef }, this.state.loadingSuggestions ? (React__default.createElement("div", null,
                    React__default.createElement(NothingFoundContainer, null,
                        React__default.createElement("div", null, "LOAAAADING...")))) : (React__default.createElement("div", null, this.state.nothingFound
                    ? (React__default.createElement(NothingFoundContainer, null, emptyMessage))
                    : (React__default.createElement("span", null, this.state.hitList.map(function (item, index) { return (_this.props.renderListItem(_this.props.selectedListIndex === index, item, _this.selectClickedElement)); })))))))));
    };
    SearchInput.defaultProps = {
        inputClassName: '',
        setInputRef: function () { return (null); },
        handleClickOutside: function () { return (null); },
        emptyMessage: 'empty',
        inputPlaceholder: 'Search',
    };
    return SearchInput;
}(React__default.Component));
var SearchInputWrapped = suggestionInputHoc(SearchInput);

var growChip = core.keyframes(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject(["\n  0% {\n    transform: scale(0)\n  }\n  60% {\n    transform: scale(1.1)\n  }\n  100% {\n    transform: scale(1)\n  }\n"], ["\n  0% {\n    transform: scale(0)\n  }\n  60% {\n    transform: scale(1.1)\n  }\n  100% {\n    transform: scale(1)\n  }\n"])));
var Chip = styled.div(templateObject_2$1 || (templateObject_2$1 = __makeTemplateObject(["\n  padding: 5px 10px 5px 5px;\n  margin: 5px;\n  text-transform: uppercase;\n  display: flex;\n  border-radius: 50px;\n  background-color: lightgrey;\n  font-size: 12px;\n  font-weight: 600;\n  line-height: 2.17;\n  letter-spacing: 0.2px;\n  align-items: center;\n  color: darkgrey;\n  animation: ", " 250ms cubic-bezier(0.32, 0.62, 0.2, 0.88);\n  position: relative;\n  cursor: pointer;\n  &:after {\n    pointer-events: none;\n    content: '';\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    border-radius: 50px;\n    background-color: black;\n    opacity: 0.1;\n    margin-left: -5px;\n    display: none;\n  }\n  > span {\n    margin-left: 10px;\n  }\n  &:hover {\n    &:after {\n      display: block;\n    }\n  }\n"], ["\n  padding: 5px 10px 5px 5px;\n  margin: 5px;\n  text-transform: uppercase;\n  display: flex;\n  border-radius: 50px;\n  background-color: lightgrey;\n  font-size: 12px;\n  font-weight: 600;\n  line-height: 2.17;\n  letter-spacing: 0.2px;\n  align-items: center;\n  color: darkgrey;\n  animation: ", " 250ms cubic-bezier(0.32, 0.62, 0.2, 0.88);\n  position: relative;\n  cursor: pointer;\n  &:after {\n    pointer-events: none;\n    content: '';\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    border-radius: 50px;\n    background-color: black;\n    opacity: 0.1;\n    margin-left: -5px;\n    display: none;\n  }\n  > span {\n    margin-left: 10px;\n  }\n  &:hover {\n    &:after {\n      display: block;\n    }\n  }\n"])), growChip);
var SampleChip = function (_a) {
    var value = _a.value;
    var removeThisChip = function () { return value.onRemove(value); };
    return (React__default.createElement(Chip, null,
        value.name,
        " ",
        React__default.createElement("span", { onClick: removeThisChip }, "X")));
};
var templateObject_1$1, templateObject_2$1;

var ListItem = styled.div(templateObject_1$2 || (templateObject_1$2 = __makeTemplateObject(["\n  background-color: ", ";\n  color: ", ";\n  padding: 10px;\n  cursor: pointer;\n  &:hover {\n    background-color: grey;\n    color: white;\n  }\n"], ["\n  background-color: ", ";\n  color: ", ";\n  padding: 10px;\n  cursor: pointer;\n  &:hover {\n    background-color: grey;\n    color: white;\n  }\n"])), function (_a) {
    var selected = _a.selected;
    return selected ? 'grey' : 'white';
}, function (_a) {
    var selected = _a.selected;
    return selected ? 'white' : 'black';
});
var SampleListItem = function (_a) {
    var value = _a.value, handleSelect = _a.handleSelect, selected = _a.selected;
    var _b = React.useState(0), count = _b[0], setCount = _b[1];
    React.useEffect(function () {
        setCount(2);
    }, []);
    var selectItem = function () { return handleSelect(value); };
    return (React__default.createElement("div", null,
        count,
        React__default.createElement(ListItem, { selected: selected, onClick: selectItem }, value.name)));
};
var templateObject_1$2;

var CustomChips = function (props) {
    var inputRef = React.useRef(null);
    var _a = React.useState(props.chipsData), chipsData = _a[0], setChipsData = _a[1];
    var onKeyPress = function (event) {
        var tmpTarget = event.target;
        if (event.key === 'Backspace' && tmpTarget.value === '') {
            var tmpChipsData = chipsData.slice();
            tmpChipsData.pop();
            setChipsData(tmpChipsData);
            props.onChange(tmpChipsData);
        }
    };
    var addItem = function (item) {
        if (!chipsData.some(function (chip) { return chip.id === item.id; })) {
            var tmpChipsData = chipsData.slice();
            tmpChipsData.push(item);
            setChipsData(tmpChipsData);
            props.onChange(tmpChipsData);
        }
    };
    var removeChip = function (chip) {
        var tmpChipsData = chipsData.slice();
        var filteredData = tmpChipsData.filter(function (item) { return item.id !== chip.id; });
        setChipsData(filteredData);
        props.onChange(filteredData);
    };
    var renderChip = function (chip) {
        var tmpChip = __assign({}, chip, { onRemove: removeChip });
        return props.renderChip(tmpChip);
    };
    var inputSetting = function (input) {
        inputRef.current = input;
    };
    var onKeyDownItem = function (event) {
        onKeyPress(event);
    };
    var onClickItem = function () {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    return (React__default.createElement(ChipsInputContainer, { onKeyDown: onKeyDownItem, onClick: onClickItem, className: props.chipsWrapperClassName },
        React__default.createElement("div", null, props.searchIcon),
        React__default.createElement(ChipsWrapper, null,
            chipsData && chipsData.map(function (item) { return (renderChip(item)); }),
            React__default.createElement(SearchInputWrapped, { fetchSearchSuggestions: props.fetchSearchSuggestions, suggestionList: props.suggestionList, minLength: 1, inputClassName: "chips-input", debounceTimeout: 250, handleSelectElement: addItem, renderListItem: props.renderItem, setInputRef: inputSetting, inputPlaceholder: props.inputPlaceholder, emptyMessage: props.emptyMessage }))));
};
CustomChips.defaultProps = {
    searchIcon: React__default.createElement("div", null, "Search"),
    chipsData: [],
    suggestionList: [],
    renderChip: function (value) { return (React__default.createElement(SampleChip, { key: value.id, value: value })); },
    renderItem: function (selected, value, handleSelect) { return (React__default.createElement(SampleListItem, { value: value, selected: selected, handleSelect: handleSelect })); },
};

module.exports = CustomChips;
