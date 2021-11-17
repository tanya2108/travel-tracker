/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* http://meyerweb.com/eric/tools/css/reset/\n   v2.0 | 20110126\n   License: none (public domain)\n*/\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block;\n}\n\nbody {\n  line-height: 1;\n}\n\nol, ul {\n  list-style: none;\n}\n\nblockquote, q {\n  quotes: none;\n}\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: \"\";\n  content: none;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n.hidden {\n  display: none !important;\n}\n\n/* ----- Main Page Section -------- */\n.main-page {\n  background: #04ADBF;\n  height: 100vh;\n}\n\n.greeting-area {\n  height: 20vh;\n  weight: 160vh;\n  display: flex;\n  align-items: center;\n}\n\nh1 {\n  font-size: 60px;\n}\n\n#icon {\n  margin-left: 33%;\n}\n\n.bottom-section {\n  display: flex;\n  align-items: center;\n  height: 80vh;\n}\n\n.cost-area {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  height: 80vh;\n  width: 50vh;\n}\n\n.rectangle {\n  background-color: pink;\n  border: 3px solid white;\n  width: 90%;\n  height: 90%;\n  text-align: center;\n  margin-top: 20px;\n  margin-bottom: 20px;\n}\n\nh5 {\n  margin-top: 20px;\n}\n\n.trips-area {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  height: 80vh;\n  width: 100%;\n  text-align: center;\n}\n\n.trip-circle {\n  border: 3px solid white;\n  width: 80%;\n  height: 80%;\n  border-radius: 50%;\n}\n\nh2 {\n  font-size: 8vh;\n}\n\n#present {\n  background: #F25F29;\n}\n\n#upcoming {\n  background: #A66D03;\n}\n\n#pending {\n  background: #F20F77;\n}\n\n#past {\n  background: #F2C0A2;\n}\n\n/* ----- Login Section -------- */\nh3 {\n  color: #85D3F2;\n  font-size: 10vh;\n}\n\n.login-page {\n  height: 100vh;\n  background: linear-gradient(#04ADBF, #A66D03, #F2C0A2, #F25F29, #F20F77);\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n.login-box {\n  height: 10vh;\n  border: 3px solid white;\n  background: #04ADBF;\n  margin-top: 20px;\n  margin-bottom: 20px;\n}\n\n#pwInput {\n  margin-left: 11px;\n}\n\n#loginButton {\n  margin-top: 3%;\n  margin-left: 40%;\n}", "",{"version":3,"sources":["webpack://./src/css/_reset.scss","webpack://./src/css/base.scss","webpack://./src/css/_variables.scss"],"names":[],"mappings":"AAAA;;;CAAA;AAKA;;;;;;;;;;;;;EAaC,SAAA;EACA,UAAA;EACA,SAAA;EACA,eAAA;EACA,aAAA;EACA,wBAAA;ACAD;;ADEA,gDAAA;AACA;;EAEC,cAAA;ACCD;;ADCA;EACC,cAAA;ACED;;ADAA;EACC,gBAAA;ACGD;;ADDA;EACC,YAAA;ACID;;ADFA;;EAEC,WAAA;EACA,aAAA;ACKD;;ADHA;EACC,yBAAA;EACA,iBAAA;ACMD;;AAjDA;EACE,wBAAA;AAoDF;;AAjDA,qCAAA;AACA;EACE,mBCLU;EDMV,aAAA;AAoDF;;AAjDA;EACE,YAAA;EACA,aAAA;EACA,aAAA;EACA,mBAAA;AAoDF;;AAjDA;EACE,eAAA;AAoDF;;AAjDA;EACE,gBAAA;AAoDF;;AAjDA;EACE,aAAA;EACA,mBAAA;EACA,YAAA;AAoDF;;AAjDA;EACE,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,YAAA;EACA,WAAA;AAoDF;;AAjDA;EACE,sBCpCK;EDqCL,uBAAA;EACA,UAAA;EACA,WAAA;EACA,kBAAA;EACA,gBAAA;EACA,mBAAA;AAoDF;;AAjDA;EACE,gBAAA;AAoDF;;AAjDA;EACE,aAAA;EACA,qCAAA;EACA,YAAA;EACA,WAAA;EACA,kBAAA;AAoDF;;AAjDA;EACE,uBAAA;EACA,UAAA;EACA,WAAA;EACA,kBAAA;AAoDF;;AAjDA;EACE,cAAA;AAoDF;;AAjDA;EACE,mBC3EO;AD+HT;;AAjDA;EACE,mBC7EU;ADiIZ;;AAjDA;EACE,mBCpFI;ADwIN;;AAjDA;EACE,mBCtFI;AD0IN;;AAjDA,iCAAA;AACA;EACE,cCvFS;EDwFT,eAAA;AAoDF;;AAjDA;EACE,aAAA;EACA,wEC3FgB;ED4FhB,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,mBAAA;AAoDF;;AAjDA;EACE,YAAA;EACA,uBAAA;EACA,mBCzGU;ED0GV,gBAAA;EACA,mBAAA;AAoDF;;AAjDA;EACE,iBAAA;AAoDF;;AAjDA;EACE,cAAA;EACA,gBAAA;AAoDF","sourcesContent":["/* http://meyerweb.com/eric/tools/css/reset/\n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}\n","@import '_variables';\n@import '_reset';\n\n.hidden {\n  display: none!important;\n}\n\n/* ----- Main Page Section -------- */\n.main-page {\n  background: $torquoise;\n  height: 100vh;\n}\n\n.greeting-area {\n  height: 20vh;\n  weight: 160vh;\n  display: flex;\n  align-items: center;\n}\n\nh1 {\n  font-size: 60px;\n}\n\n#icon {\n  margin-left: 33%;\n}\n\n.bottom-section {\n  display: flex;\n  align-items: center;\n  height: 80vh;\n}\n\n.cost-area {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  height: 80vh;\n  width: 50vh;\n}\n\n.rectangle {\n  background-color: $pink;\n  border: 3px solid $white;\n  width: 90%;\n  height: 90%;\n  text-align: center;\n  margin-top: 20px;\n  margin-bottom: 20px;\n}\n\nh5 {\n  margin-top: 20px;\n}\n\n.trips-area {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  height: 80vh;\n  width: 100%;\n  text-align: center;\n}\n\n.trip-circle {\n  border: 3px solid $white;\n  width: 80%;\n  height: 80%;\n  border-radius: 50%;\n}\n\nh2 {\n  font-size: 8vh;\n}\n\n#present {\n  background: $orange;\n}\n\n#upcoming {\n  background: $green-tan;\n}\n\n#pending {\n  background: $red;\n}\n\n#past {\n  background: $tan;\n}\n\n/* ----- Login Section -------- */\nh3 {\n  color: $sky-blue;\n  font-size: 10vh;\n}\n\n.login-page {\n  height: 100vh;\n  background: $login-background;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n.login-box {\n  height: 10vh;\n  border: 3px solid $white;\n  background: $torquoise;\n  margin-top: 20px;\n  margin-bottom: 20px;\n}\n\n#pwInput {\n  margin-left: 11px;\n}\n\n#loginButton {\n  margin-top: 3%;\n  margin-left: 40%;\n}\n","$red: #F20F77;\n$orange: #F25F29;\n$tan: #F2C0A2;\n$green-tan: #A66D03;\n$torquoise: #04ADBF;\n$white: white;\n$sky-blue: #85D3F2;\n$pink: pink;\n$login-background:linear-gradient($torquoise, $green-tan, $tan, $orange, $red)\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((module) => {

class TravelerRepo {
  constructor(travelers) {
    this.data = travelers;
  }

  retrieveTraveler(id) {
    const specifcTraveler = this.data.find((traveler) => {
      return traveler.id === id;
    });
    if (!specifcTraveler) {
      return 'Sorry, this traveler is not in the data!'
    } else {
      return specifcTraveler;
    }
  }

  retrieveRandomTraveler() {
    return Math.floor(Math.random() * this.data.length);
  }
}


module.exports = TravelerRepo;


/***/ }),
/* 7 */
/***/ ((module) => {

class Traveler {
  constructor(travelerData) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.trips = travelerData.trips;
    this.destinations = travelerData.destination;
    this.estimateCosts = [];
  }

  returnFirstName() {
    return this.name.split(' ')[0]
  }

  retrieveDestinationData(destinationID) {
    const specificDestination = this.destinations.find((destination) => {
      return destination.id === destinationID  ;
    })
    if (!specificDestination) {
      return `Sorry, this destination is not available yet.`
    } else {
      return specificDestination;
    }
  }

  returnCurrentTripInfo(date) {
      const currentTrip = this.trips.filter((trip) => {
        return trip.date === date;
      })
        return currentTrip;
      }

  returnUpcomingTripsInfo(date) {
    const upcomingTrips = this.trips.sort((a, b) => {
      if (a.date < b.date) {
        return -1;
      }
      if (a.date > b.date){
        return 1;
      }
        return 0;
      }).filter((trip) => {
      return trip.date > date;
      })
      return upcomingTrips;
      }

  returnPendingTripsInfo() {
    const pendingStatusTrips = this.trips.filter((trip) => {
      return trip.status === 'pending'
    })
      return pendingStatusTrips;
    }

  returnPastTripsInfo(date) {
    const pastTrips = this.trips.sort((a, b) => {
      if (a.date < b.date) { a
        return -1
      }
      if (a.date > b.date){
        return 1
      }
        return 0
      }).filter((trip) => {
      return trip.date < date;
      })
        return pastTrips;
      }

  returnUserTotalPerYear(year) {
    const allCostInYear = this.trips.filter((trip) => {
      let specificYear = trip.date.split('/').shift();
      return specificYear === year;
    }).reduce((totalPerYear, trip)=> {
      const destinationData = this.retrieveDestinationData(trip.destinationID);
      const lodgingFees = destinationData.estimatedLodgingCostPerDay * trip.duration
      const flightFees = destinationData.estimatedFlightCostPerPerson * trip.travelers
      const agentFees = (lodgingFees+flightFees)*.1
      totalPerYear['lodgingCost'] += lodgingFees;
      totalPerYear['flightCost'] += flightFees;
      totalPerYear['agentCost'] += agentFees;
      return totalPerYear;
    },{lodgingCost: 0, flightCost: 0, agentCost: 0})
      return allCostInYear;
  }

  returnEstimateCosts(pendingNewTrip) {
      const newTripCost = pendingNewTrip.reduce((
        total, trip)=> {
        const destinationData = this.retrieveDestinationData(trip.destinationID);
        const lodgingFees = destinationData.estimatedLodgingCostPerDay * trip.duration
        const flightFees = destinationData.estimatedFlightCostPerPerson * trip.travelers
        const agentFees = (lodgingFees+flightFees) * .1
        total['lodgingCost'] = lodgingFees;
        total['flightCost'] = flightFees;
        total['agentCost'] = agentFees;
          return total;
    },{lodgingCost: 0, flightCost: 0, agentCost: 0})
      this.estimateCosts.push(newTripCost)
      return newTripCost;
    }
}

module.exports = Traveler;


/***/ }),
/* 8 */
/***/ ((module) => {

class Destinations {
  constructor(destinations) {
    this.data = destinations;
  }  
 }

module.exports = Destinations;


/***/ }),
/* 9 */
/***/ ((module) => {

class Trips {
  constructor(trips) {
    this.data = trips;
  }

  retrieveTripData(userID) {
    const userTripsData = this.data.filter((eachTrip) => {
      return eachTrip.userID === userID;
    });
    if (userTripsData.length === 0){
      return `Sorry, traveler${userID} has not made any trip yet.`
    } else {
      return userTripsData;
    }
  }

}

module.exports = Trips;


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchData": () => (/* binding */ fetchData),
/* harmony export */   "addTrip": () => (/* binding */ addTrip)
/* harmony export */ });
const fetchData = (param) => {
  return fetch(`http://localhost:3001/api/v1/${param}`)
    .then(response => response.json())
}

const addTrip = (object) => {
  return fetch('http://localhost:3001/api/v1/trips', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(object)
  })
    .then(response => response.json())
}




/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const welcomeMessage = document.getElementById('greeting')
const presentCircle = document.getElementById('presentTrip');
const upcomingCircle = document.getElementById('upcomingTrips');
const pendingCircle = document.getElementById('pendingTrips');
const pastCircle = document.getElementById('pastTrips');
const yearlyCost = document.getElementById('yearlyCost');
const startDateInput = document.getElementById('startDateInput');
const durationInput = document.getElementById('durationInput');
const travelersInput = document.getElementById('travelersInput');
const destinationInput = document.getElementById('places');
let formFeedback = document.getElementById('formFeedback');
let postFeedback = document.getElementById('postFeedback');
const estimateCost = document.getElementById('estimateCost');
const estimateButton = document.getElementById('estimate');
const loginFeedback = document.getElementById('loginFeedback')
const loginPage = document.getElementById('login')
const mainPage = document.getElementById('main')

const domUpdates = {
  displayGreeting(traveler, firstName) {
    welcomeMessage.innerText = `Welcome ${firstName}!`;
  },

  displayPresentTrip(presentTrip, traveler) {
    if(presentTrip.length === 0) {
      presentCircle.innerHTML += `<p> No Present Trip </p>`
    } else {
      presentTrip.forEach((trip) => {
        presentCircle.innerHTML += `<p>Date: ${trip.date}, Destination: ${traveler.retrieveDestinationData(trip.destinationID).destination}, Duration: ${trip.duration} </p> `
    });
  }
  },

  displayUpcomingTrips(upcomingTrips, traveler) {
    if (upcomingTrips.length === 0) {
      upcomingCircle.innerHTML += `<p> No Upcoming Trips </p>`
    } else {
      upcomingTrips.forEach((trip) => {
        upcomingCircle.innerHTML += `<p>Date: ${trip.date}, Destination: ${traveler.retrieveDestinationData(trip.destinationID).destination}, Duration: ${trip.duration} </p> `
      });
    }
  },

  displayPendingTrips(pendingTrips, traveler) {
    if(pendingTrips.length === 0) {
      pendingCircle.innerHTML += `<p> No Pending Trips </p>`
    } else {
      pendingTrips.forEach((trip) => {
        pendingCircle.innerHTML += `<p>Date: ${trip.date}, Destination: ${traveler.retrieveDestinationData(trip.destinationID).destination}, Duration: ${trip.duration} </p> `
      });
    }
  },

  displayPastTrips(pastTrips, traveler) {
    if(pastTrips.length === 0){
      pastCircle.innerHTML += `<p> No Past Trips </p>`
    } else {
    pastTrips.forEach((trip) => {
      pastCircle.innerHTML += `<p>Date: ${trip.date}, Destination:            ${traveler.retrieveDestinationData(trip.destinationID).destination}, Duration: ${trip.duration} </p>`
    });
  }
},

  displayCostPerYear(totalCost) {
      const total = totalCost.lodgingCost + totalCost.flightCost + totalCost.agentCost
      yearlyCost.innerHTML += `
        <p> Total Cost: ${total.toLocaleString()}</p>
        <p> 1. Lodging Cost: ${totalCost.lodgingCost.toLocaleString()}</p>
        <p> 2. Flight Cost: ${totalCost.flightCost.toLocaleString()}</p>
        <p> 3. Agent Cost: ${totalCost.agentCost.toLocaleString()}</p>`
      },

  showSuccessMessage(cardID) {
    formFeedback.innerText = '';
    postFeedback.innerText = `Trip with ID${cardID} successfully posted`;
  },

  clearMessage(){
    postFeedback.innerText = '';
  },

  checkTripRequestForm() {
    if (startDateInput && durationInput && travelersInput && destinationInput.value) {
      formFeedback.innerText = `Thank you for submitting your trip request!`
      return true;
    } else {
      formFeedback.innerText = `Please fill out all fields`
      setTimeout(this.clearMessage, 2000)
    }
  },

  displayEstimateCosts(estimate) {
    const total = estimate.lodgingCost + estimate.flightCost + estimate.agentCost
    estimateCost.innerHTML += `
      <p>Estimate Total Cost: ${total.toLocaleString()}</p>
      <p> 1. Estimate Lodging Cost: ${estimate.lodgingCost.toLocaleString()}</p>
      <p> 2. Estimate Flight Cost: ${estimate.flightCost.toLocaleString()}</p>
      <p> 3. Estimate Agent Cost: ${estimate.agentCost.toLocaleString()}</p>`
    },

  clearEstimateCosts() {
    estimateCost.innerHTML = '';
  },

  showMainPage() {
    show(mainPage);
    hide(loginPage);
  },

  displayErrorLogin(){
    loginFeedback.innerText = 'Login Failed: Username or Password is incorrect.'
  }
}

  const show = (element) => {
    element.classList.remove('hidden')
  }

  const hide = (element) => {
    element.classList.add('hidden')
  }

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (domUpdates);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_base_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _TravelerRepo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _TravelerRepo__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_TravelerRepo__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Traveler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _Traveler__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Traveler__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Destinations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _Destinations__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Destinations__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Trips__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _Trips__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Trips__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);
/* harmony import */ var _domUpdates__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(11);








const addNewButton = document.getElementById('addNewTrip');
const startDateInput = document.getElementById('startDateInput');
const durationInput = document.getElementById('durationInput');
const travelersInput = document.getElementById('travelersInput');
const destinationInput = document.getElementById('places');
const estimateButton = document.getElementById('estimate');
const loginButton = document.getElementById('loginButton');
const userNameInput = document.getElementById('userNameInput');
const pwInput = document.getElementById('pwInput');
const userNameValue = document.getElementById('userNameInput').value;

let travelers;
let traveler;
let trips;
let destinations;

const getData = () => {
  const allPromise = Promise.all([(0,_api__WEBPACK_IMPORTED_MODULE_5__.fetchData)('travelers'), (0,_api__WEBPACK_IMPORTED_MODULE_5__.fetchData)('trips'), (0,_api__WEBPACK_IMPORTED_MODULE_5__.fetchData)('destinations')])
    .then(data => {createDashboard(data)})
}

const createDashboard = (data) => {
  travelers = new (_TravelerRepo__WEBPACK_IMPORTED_MODULE_1___default())(data[0].travelers);
  const myID = Number(userNameInput.value.split('r').pop()-1);
  traveler = new (_Traveler__WEBPACK_IMPORTED_MODULE_2___default())(data[0].travelers[myID]);
  trips = new (_Trips__WEBPACK_IMPORTED_MODULE_4___default())(data[1].trips);
  destinations = new (_Destinations__WEBPACK_IMPORTED_MODULE_3___default())(data[2].destinations);
  _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.displayGreeting(traveler, traveler.returnFirstName());
  displayTrips();
  displayYearlyCosts();
}

const displayTrips = () => {
  traveler.trips = trips.retrieveTripData(traveler.id);
  traveler.destinations = destinations.data;
  _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.displayPresentTrip(traveler.returnCurrentTripInfo('2021/11/16'), traveler);
  _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.displayUpcomingTrips(traveler.returnUpcomingTripsInfo('2021/11/16'), traveler);
  _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.displayPendingTrips(traveler.returnPendingTripsInfo('2021/11/16'), traveler);
  _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.displayPastTrips(traveler.returnPastTripsInfo('2021/11/16'), traveler);
  }

const displayYearlyCosts = () => {
  _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.displayCostPerYear(traveler.returnUserTotalPerYear('2020'));
}

const updateTripsData = (tripData) => {
  traveler.trips.push(tripData)
}

const findEstimatedCosts = (event) => {
  event.preventDefault();
  const possibleTrip = [{
    id: 999,
    userID: Number(traveler.id),
    destinationID: Number(destinationInput.value),
    travelers: Number(travelersInput.value),
    date: startDateInput.value,
    duration: Number(durationInput.value),
    status: 'pending',
    suggestedActivities:[]
  }]
  _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.displayEstimateCosts(traveler.returnEstimateCosts(possibleTrip))
  setTimeout(_domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.clearEstimateCosts, 5000);
}

const addTripRequest = (event) => {
  event.preventDefault();
  let cardID = trips.data.length + 1;
  if (_domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.checkTripRequestForm()){
    const newTrip = {
        id: cardID,
        userID: Number(traveler.id),
        destinationID: Number(destinationInput.value),
        travelers: Number(travelersInput.value),
        date: startDateInput.value,
        duration: Number(durationInput.value),
        status: 'pending',
        suggestedActivities:[]
      }
      ;(0,_api__WEBPACK_IMPORTED_MODULE_5__.addTrip)(newTrip)
        .then(data => updateTripsData(data))
        .catch(error => console.log(error))
        _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.showSuccessMessage(cardID);
        setTimeout(_domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.clearMessage, 5000);
    }
  }

  const checkLogin = (event) => {
    if (checkUserName() && checkPassword()) {
      event.preventDefault();
      _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.showMainPage();
      getData();
    } else {
      _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.displayErrorLogin();
      setTimeout(_domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.clearMessage, 5000);
    }
  }

  const checkUserName = () => {
    const inputValue = userNameInput.value;
    const inputNumber = Number(inputValue.split('r').pop());
    const travelerIDs = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50];
    if (travelerIDs.includes(inputNumber)) {
      return true;
    } else {
      return false;
    }
  }

  const checkPassword = () => {
    if (pwInput.value === 'travel') {
      return true;
    } else {
      return false;
    }
  }

loginButton.addEventListener('click', checkLogin);
estimateButton.addEventListener('click', findEstimatedCosts);
addNewButton.addEventListener('click', addTripRequest);

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map