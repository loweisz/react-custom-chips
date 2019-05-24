'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

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

var useSuggestionInput = function (containerNode) {
    var elementHeight = 60;
    var _a = React.useState(-1), selectedIndex = _a[0], setSelectedIndex = _a[1];
    var _b = React.useState(null), boxTopPosition = _b[0], setBoxTopPosition = _b[1];
    var _c = React.useState(null), offset = _c[0], setOffset = _c[1];
    var addEventListener = function () {
        window.addEventListener('scroll', checkHeight);
    };
    var removeEventListener = function () {
        window.removeEventListener('scroll', checkHeight);
    };
    var targetNode = React.useRef(containerNode.current);
    var increaseListIndex = function (num) {
        setSelectedIndex(function (s) { return s + num; });
    };
    var scrollUp = function (scrollContainer, listLength) {
        var tmpContainer = scrollContainer;
        if (listLength > 0 && tmpContainer) {
            var topOffsetElements = Math.ceil(tmpContainer.scrollTop / elementHeight);
            if (selectedIndex === topOffsetElements) {
                tmpContainer.scrollTop = (topOffsetElements - 1) * elementHeight;
            }
        }
    };
    var scrollDown = function (scrollContainer, listLength) {
        var tmpContainer = scrollContainer;
        if (listLength > 0 && tmpContainer) {
            var containerHeight = tmpContainer.offsetHeight;
            var maxFullContainElements = Math.floor(containerHeight / elementHeight);
            var splittedElementHeight = containerHeight % elementHeight;
            var needToScroll = elementHeight - splittedElementHeight;
            if (maxFullContainElements - 1 === selectedIndex) {
                tmpContainer.scrollTop = needToScroll;
            }
            if (maxFullContainElements - 1 < selectedIndex) {
                tmpContainer.scrollTop += elementHeight;
            }
        }
    };
    var onKeyPress = function (event, listLength, handleSelectElement, scrollContainer) {
        switch (event.key) {
            case 'ArrowDown': {
                scrollDown(scrollContainer, listLength);
                if (selectedIndex === -1) {
                    setSelectedIndex(0);
                }
                else if (selectedIndex < listLength - 1) {
                    increaseListIndex(1);
                }
                break;
            }
            case 'ArrowUp': {
                scrollUp(scrollContainer, listLength);
                if (selectedIndex > 0) {
                    increaseListIndex(-1);
                }
                break;
            }
            case 'Enter': {
                event.preventDefault();
                if (selectedIndex !== -1) {
                    handleSelectElement(event);
                    setSelectedIndex(-1);
                }
                break;
            }
            default:
                break;
        }
    };
    var checkHeight = function () {
        var node = targetNode.current;
        if (node) {
            var rect = node.getBoundingClientRect();
            var tmpBoxTopPosition = rect.top + rect.height + 55;
            var tmpOffset = rect.top;
            if (boxTopPosition !== tmpBoxTopPosition) {
                setBoxTopPosition(tmpBoxTopPosition);
            }
            if (tmpOffset !== offset) {
                setOffset(tmpOffset);
            }
        }
    };
    return ({
        addEventListener: addEventListener,
        removeEventListener: removeEventListener,
        boxTopPosition: boxTopPosition,
        onKeyPress: onKeyPress,
        selectedIndex: selectedIndex,
        checkHeight: checkHeight,
        offset: offset,
    });
};

var _this = undefined;
var SearchInput = function (props) {
    var inputNode = React.useRef(null);
    var inputContainerRef = React.useRef(null);
    var scrollContainerRef = React.useRef(null);
    var _a = useSuggestionInput(inputContainerRef), boxTopPosition = _a.boxTopPosition, checkHeight = _a.checkHeight, addEventListener = _a.addEventListener, removeEventListener = _a.removeEventListener, selectedIndex = _a.selectedIndex, onKeyPress = _a.onKeyPress;
    var _b = React.useState([]), hitList = _b[0], setHitList = _b[1];
    var _c = React.useState(false), loadingSuggestions = _c[0], setLoadingSuggestions = _c[1];
    var _d = React.useState(false), nothingFound = _d[0], setNothingFound = _d[1];
    React.useEffect(function () {
        document.addEventListener('mousedown', handleClickOutside);
        checkHeight();
        return function () {
            document.removeEventListener('mousedown', handleClickOutside);
            removeEventListener();
        };
    }, []);
    var handleClickOutside = function (event) {
        if (inputContainerRef.current) {
            var node = inputContainerRef.current;
            if (node && !node.contains(event.srcElement)) {
                setNothingFound(false);
                setHitList([]);
                if (props.handleClickOutside) {
                    props.handleClickOutside(event);
                }
            }
        }
    };
    var clearAndHide = function () {
        if (nothingFound || hitList.length > 0 || (inputNode.current && inputNode.current.value)) {
            setNothingFound(false);
            setHitList([]);
            if (inputNode.current) {
                inputNode.current.value = '';
                inputNode.current.focus();
            }
        }
    };
    var selectClickedElement = function (value) {
        props.handleSelectElement(value, clearAndHide);
        clearAndHide();
    };
    var selectCurrentElement = function () {
        props.handleSelectElement(hitList[selectedIndex], clearAndHide);
        clearAndHide();
    };
    var searchAction = function (event) { return __awaiter(_this, void 0, void 0, function () {
        var value;
        return __generator(this, function (_a) {
            value = event.target.value;
            if (value.trim().length !== 0) {
                if (props.fetchSearchSuggestions) {
                    setLoadingSuggestions(true);
                    props.fetchSearchSuggestions(value)
                        .then(function (list) {
                        if (list.length === 0) {
                            setNothingFound(true);
                        }
                        else {
                            setNothingFound(false);
                        }
                        setHitList(list);
                        setLoadingSuggestions(false);
                        checkHeight();
                    })
                        .catch(function () {
                        setHitList([]);
                    });
                }
                else if (props.suggestionList) {
                    setNothingFound(false);
                    setHitList(props.suggestionList);
                    checkHeight();
                }
            }
            else {
                setNothingFound(true);
                setLoadingSuggestions(false);
            }
            return [2 /*return*/];
        });
    }); };
    var setNode = function (passedInputNode) {
        if (passedInputNode) {
            inputNode.current = passedInputNode;
            if (props.setInputRef) {
                props.setInputRef(passedInputNode);
            }
        }
    };
    var onKeyDownItem = function (event) {
        if (scrollContainerRef.current) {
            onKeyPress(event, hitList.length, selectCurrentElement, scrollContainerRef.current);
        }
    };
    return (React__default.createElement("div", { className: "input_container", ref: inputContainerRef, onKeyDown: onKeyDownItem },
        React__default.createElement("div", { className: "search_container" },
            React__default.createElement("div", { className: "search_container_input" },
                React__default.createElement("input", { ref: setNode, className: props.inputClassName, placeholder: props.inputPlaceholder, onChange: searchAction, onFocus: addEventListener, onBlur: removeEventListener })),
            React__default.createElement("div", { className: "results_container", style: { maxHeight: "calc(100vh - " + (boxTopPosition || '100') + "px)" }, ref: scrollContainerRef }, loadingSuggestions ? (React__default.createElement("div", null,
                React__default.createElement("div", { className: "nothing_found_container" },
                    React__default.createElement("div", null, "LOAAAADING...")))) : (React__default.createElement("div", null, nothingFound
                ? (React__default.createElement("div", { className: "nothing_found_container" }, props.emptyMessage))
                : (React__default.createElement("span", null, hitList.map(function (item, index) { return (props.renderListItem(selectedIndex === index, item, selectClickedElement)); })))))))));
};
SearchInput.defaultProps = {
    inputClassName: '',
    setInputRef: function () { return (null); },
    handleClickOutside: function () { return (null); },
    emptyMessage: 'empty',
    inputPlaceholder: 'Search',
};

var CloseIcon = function () { return (React__default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
    React__default.createElement("path", { fill: "currentColor", 
        // tslint:disable-next-line:max-line-length
        d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" }),
    React__default.createElement("path", { d: "M0 0h24v24H0z", fill: "none" }))); };
var SampleChip = function (_a) {
    var value = _a.value;
    var removeThisChip = function () { return value.onRemove(value); };
    return (React__default.createElement("div", { className: "chip" },
        value.name,
        React__default.createElement("div", { onClick: removeThisChip },
            React__default.createElement(CloseIcon, null))));
};

var SampleListItem = function (_a) {
    var value = _a.value, handleSelect = _a.handleSelect, selected = _a.selected, preSelected = _a.preSelected;
    var selectItem = function () { return handleSelect(value); };
    return (React__default.createElement("div", { className: "list_item " + (preSelected ? 'pre_selected' : '') + " " + (selected ? 'selected' : ''), onClick: selectItem }, value.name));
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = "@keyframes grow-chip {\n  0% {\n    transform: scale(0); }\n  60% {\n    transform: scale(1.1); }\n  100% {\n    transform: scale(1); } }\n\n.chips_input_container {\n  display: flex;\n  align-items: center;\n  padding: 5px;\n  min-height: 50px;\n  border-radius: 5px;\n  border: 1px solid black;\n  background-color: white; }\n\n.chips_wrapper {\n  display: flex;\n  flex-wrap: wrap;\n  flex: 0 100%;\n  margin-left: 10px;\n  position: relative; }\n  .chips_wrapper input {\n    font-size: 1rem;\n    line-height: 26px;\n    letter-spacing: 0.3px;\n    outline: none;\n    margin-left: 5px;\n    background-color: rgba(0, 0, 0, 0); }\n    .chips_wrapper input:focus {\n      border: none;\n      outline: none; }\n    .chips_wrapper input::placeholder {\n      color: #d9d9d9;\n      opacity: 1; }\n\n.results_container {\n  position: absolute;\n  width: 100%;\n  overflow-y: auto;\n  z-index: 999;\n  box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.19);\n  left: 0; }\n\n.input_container {\n  height: auto;\n  align-items: center;\n  display: flex;\n  flex: 1; }\n\n.search_container {\n  width: 100%; }\n  .search_container_input {\n    display: block;\n    align-items: center;\n    padding-right: 5px; }\n    .search_container_input input {\n      width: 100%;\n      min-width: 200px;\n      border: none; }\n\n.chip {\n  padding: 5px 10px 5px 10px;\n  margin: 5px;\n  text-transform: uppercase;\n  display: flex;\n  border-radius: 50px;\n  background-color: red;\n  font-size: 12px;\n  font-weight: 600;\n  line-height: 2.17;\n  letter-spacing: 0.2px;\n  align-items: center;\n  color: white;\n  animation: grow-chip 250ms cubic-bezier(0.32, 0.62, 0.2, 0.88);\n  cursor: pointer; }\n  .chip > div {\n    margin-left: 10px;\n    height: 24px;\n    width: 24px;\n    color: white; }\n  .chip:hover:after {\n    display: block; }\n\n.nothing_found_container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-top: 1px solid white;\n  height: 60px;\n  color: #d9d9d9;\n  background-color: white; }\n\n.list_item {\n  background-color: white;\n  color: black;\n  padding: 10px;\n  cursor: pointer; }\n  .list_item:hover {\n    background-color: grey;\n    color: white; }\n  .list_item.selected {\n    color: white;\n    background-color: grey; }\n  .list_item.pre_selected {\n    background-color: lightgray; }\n";
styleInject(css);

var SearchIcon = function () { return (React__default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
    React__default.createElement("path", { 
        // tslint:disable-next-line:max-line-length
        d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" }),
    React__default.createElement("path", { d: "M0 0h24v24H0z", fill: "none" }))); };
var CustomChips = function (props) {
    var inputRef = React.useRef(null);
    var _a = React.useState(props.chipsData || []), chipsData = _a[0], setChipsData = _a[1];
    React.useEffect(function () {
        setChipsData(props.chipsData || []);
    }, [props.chipsData]);
    var changeChips = function (chips) {
        setChipsData(chips);
        props.onChange(chips);
    };
    var onKeyPress = function (event) {
        var tmpTarget = event.target;
        if (event.key === 'Backspace' && tmpTarget.value === '') {
            var tmpChipsData = chipsData.slice();
            tmpChipsData.pop();
            changeChips(tmpChipsData);
        }
    };
    var addItem = function (item) {
        if (!chipsData.some(function (chip) { return chip.id === item.id; })) {
            var tmpChipsData = chipsData.concat([item]);
            changeChips(tmpChipsData);
        }
    };
    var removeChip = function (chip) {
        var tmpChipsData = chipsData.slice();
        var filteredData = tmpChipsData.filter(function (item) { return item.id !== chip.id; });
        changeChips(filteredData);
    };
    var renderChip = function (chip) {
        var tmpChip = __assign({}, chip, { onRemove: removeChip });
        if (props.renderChip) {
            return props.renderChip(tmpChip);
        }
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
    var renderListItem = function (selected, value, handleSelect) {
        if (props.renderItem) {
            props.renderItem(selected, value, handleSelect);
        }
        return (React__default.createElement(SampleListItem, { preSelected: chipsData.includes(value), value: value, selected: selected, handleSelect: handleSelect }));
    };
    return (React__default.createElement("div", { onKeyDown: onKeyDownItem, onClick: onClickItem, className: "chips_input_container " + props.chipsWrapperClassName },
        React__default.createElement("div", null, props.searchIcon || React__default.createElement(SearchIcon, null)),
        React__default.createElement("div", { className: "chips_wrapper" },
            chipsData && chipsData.map(function (item) { return (renderChip(item)); }),
            React__default.createElement(SearchInput, { fetchSearchSuggestions: props.fetchSearchSuggestions, suggestionList: props.suggestionList, minLength: 1, inputClassName: "chips-input", debounceTimeout: 250, handleSelectElement: addItem, renderListItem: renderListItem, setInputRef: inputSetting, inputPlaceholder: props.inputPlaceholder || 'Search', emptyMessage: props.emptyMessage || 'empty' }))));
};
CustomChips.defaultProps = {
    chipsData: [],
    suggestionList: [],
    emptyMessage: 'empty',
    inputPlaceholder: 'Search',
    renderChip: function (value) { return (React__default.createElement(SampleChip, { key: value.id, value: value })); },
};

module.exports = CustomChips;
