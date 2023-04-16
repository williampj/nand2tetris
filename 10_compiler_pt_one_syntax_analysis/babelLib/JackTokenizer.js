"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _fs = require("fs");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _classStaticPrivateMethodGet(receiver, classConstructor, method) { _classCheckPrivateStaticAccess(receiver, classConstructor); return method; }
function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { _classCheckPrivateStaticAccess(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor(descriptor, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classCheckPrivateStaticFieldDescriptor(descriptor, action) { if (descriptor === undefined) { throw new TypeError("attempted to " + action + " private static field before its declaration"); } }
function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
var _tokens = /*#__PURE__*/new WeakMap();
var _currentTokenNumber = /*#__PURE__*/new WeakMap();
var JackTokenizer = /*#__PURE__*/function () {
  function JackTokenizer(inputFilePath) {
    var _this = this;
    _classCallCheck(this, JackTokenizer);
    _classPrivateFieldInitSpec(this, _tokens, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _currentTokenNumber, {
      writable: true,
      value: void 0
    });
    _defineProperty(this, "currentToken", function () {
      return _classPrivateFieldGet(_this, _tokens)[_classPrivateFieldGet(_this, _currentTokenNumber)];
    });
    _defineProperty(this, "hasMoreTokens", function () {
      return _classPrivateFieldGet(_this, _currentTokenNumber) + 1 < _classPrivateFieldGet(_this, _tokens).length;
    });
    _defineProperty(this, "identifier", function () {
      return _this.currentToken().identifier;
    });
    _defineProperty(this, "intVal", function () {
      return _this.currentToken().intVal;
    });
    _defineProperty(this, "keyword", function () {
      return _this.currentToken().keyWord;
    });
    _defineProperty(this, "symbol", function () {
      return _this.currentToken().symbol;
    });
    _defineProperty(this, "stringVal", function () {
      return _this.currentToken().stringVal;
    });
    _defineProperty(this, "tokenType", function () {
      return _this.currentToken().tokenType;
    });
    var file = (0, _fs.readFileSync)(inputFilePath).toString();
    var parsedFile = _classStaticPrivateMethodGet(JackTokenizer, JackTokenizer, _removeCommentsAndSeparateSymbols).call(JackTokenizer, file);
    _classPrivateFieldSet(this, _tokens, _classStaticPrivateMethodGet(JackTokenizer, JackTokenizer, _splitIntoTokens).call(JackTokenizer, parsedFile));
    _classPrivateFieldSet(this, _currentTokenNumber, 0);
  }
  _createClass(JackTokenizer, [{
    key: "advance",
    value: function advance() {
      _classPrivateFieldSet(this, _currentTokenNumber, _classPrivateFieldGet(this, _currentTokenNumber) + 1);
    }
  }, {
    key: "nextToken",
    value: function nextToken() {
      var nextNumber = _classPrivateFieldGet(this, _currentTokenNumber) + 1;
      return _classPrivateFieldGet(this, _tokens)[nextNumber];
    }
  }]);
  return JackTokenizer;
}();
exports["default"] = JackTokenizer;
function _splitIntoTokens(file) {
  var fileLength = file.length;
  var tokens = [];
  var currentToken;
  var i = 0;
  while (i < fileLength) {
    currentToken = file[i];
    if (currentToken.startsWith('"')) {
      // string
      var currentString = currentToken;
      while (!currentString.endsWith('"')) {
        // while loop reunites split strings
        i += 1;
        currentToken = file[i];
        currentString += " ".concat(currentToken);
      }
      tokens.push({
        tokenType: _classStaticPrivateFieldSpecGet(JackTokenizer, JackTokenizer, _TOKEN_TYPES).STRING_CONST,
        stringVal: currentString.slice(1, currentString.length - 1) // removes double quotes
      });
    } else if (/^[0-9][0-9]*$/.test(currentToken)) {
      // integer
      tokens.push({
        tokenType: _classStaticPrivateFieldSpecGet(JackTokenizer, JackTokenizer, _TOKEN_TYPES).INT_CONST,
        intVal: currentToken
      });
    } else if (_classStaticPrivateFieldSpecGet(JackTokenizer, JackTokenizer, _KEYWORDS).includes(currentToken)) {
      // keyword
      tokens.push({
        tokenType: _classStaticPrivateFieldSpecGet(JackTokenizer, JackTokenizer, _TOKEN_TYPES).KEYWORD,
        keyWord: currentToken
      });
    } else if (_classStaticPrivateFieldSpecGet(JackTokenizer, JackTokenizer, _SYMBOLS).includes(currentToken)) {
      // symbol
      tokens.push({
        tokenType: _classStaticPrivateFieldSpecGet(JackTokenizer, JackTokenizer, _TOKEN_TYPES).SYMBOL,
        symbol: currentToken
      });
    } else if (/^[a-z_][a-z0-9_]*/i.test(currentToken)) {
      // identifier
      tokens.push({
        tokenType: _classStaticPrivateFieldSpecGet(JackTokenizer, JackTokenizer, _TOKEN_TYPES).IDENTIFIER,
        identifier: currentToken
      });
    }
    i += 1;
  }
  return tokens;
}
function _removeCommentsAndSeparateSymbols(file) {
  var twoForwardSlashComments = /(\/\/.*(\n)*)?/g;
  var forwardSlashStarComments = /(\/\*{1,2}(.|\n|\r)*?(\*\/))/g;
  var lineBreakAndTabChars = /([\n\r\t]*)/g;
  var symbolSeparator = /([~;[\](){}.,-])/g;
  var withoutComments = file.replaceAll(twoForwardSlashComments, '').replaceAll(forwardSlashStarComments, '').replaceAll(lineBreakAndTabChars, '').replaceAll(symbolSeparator, ' $1 '); // separates semi-colon, commas, brackets, parentheses, curly braces and periods from surrounding tokens

  return withoutComments.split(' ').filter(function (token) {
    return !!token;
  });
}
var _KEYWORDS = {
  writable: true,
  value: ['class', 'constructor', 'function', 'method', 'field', 'static', 'var', 'int', 'char', 'boolean', 'void', 'true', 'false', 'null', 'this', 'let', 'do', 'if', 'else', 'while', 'return']
};
var _SYMBOLS = {
  writable: true,
  value: ['{', '}', '(', ')', '[', ']', '.', ',', ';', '+', '-', '*', '/', '&', '|', '<', '>', '=', '~']
};
var _TOKEN_TYPES = {
  writable: true,
  value: {
    KEYWORD: 'KEYWORD',
    IDENTIFIER: 'IDENTIFIER',
    INT_CONST: 'INT_CONST',
    STRING_CONST: 'STRING_CONST',
    SYMBOL: 'SYMBOL'
  }
};