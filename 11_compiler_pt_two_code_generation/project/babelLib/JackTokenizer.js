"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _fs = require("fs");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var TOKEN_TYPES;
(function (TOKEN_TYPES) {
  TOKEN_TYPES["KEYWORD"] = "KEYWORD";
  TOKEN_TYPES["IDENTIFIER"] = "IDENTIFIER";
  TOKEN_TYPES["INT_CONST"] = "INT_CONST";
  TOKEN_TYPES["STRING_CONST"] = "STRING_CONST";
  TOKEN_TYPES["SYMBOL"] = "SYMBOL";
})(TOKEN_TYPES || (TOKEN_TYPES = {}));
;
var JackTokenizer = /*#__PURE__*/function () {
  function JackTokenizer(inputFilePath) {
    var _this = this;
    _classCallCheck(this, JackTokenizer);
    this.currentToken = function () {
      return _this.tokens[_this.currentTokenNumber];
    };
    this.hasMoreTokens = function () {
      return _this.currentTokenNumber + 1 < _this.tokens.length;
    };
    this.identifier = function () {
      return String(_this.currentToken().identifier);
    };
    this.intVal = function () {
      return String(_this.currentToken().intVal);
    };
    this.keyword = function () {
      return String(_this.currentToken().keyWord);
    };
    this.symbol = function () {
      return String(_this.currentToken().symbol);
    };
    this.stringVal = function () {
      return String(_this.currentToken().stringVal);
    };
    this.tokenType = function () {
      return String(_this.currentToken().tokenType);
    };
    var file = (0, _fs.readFileSync)(inputFilePath).toString();
    var parsedFile = JackTokenizer.removeCommentsAndSeparateSymbols(file);
    this.tokens = JackTokenizer.splitIntoTokens(parsedFile);
    this.currentTokenNumber = 0;
  }
  _createClass(JackTokenizer, [{
    key: "advance",
    value: function advance() {
      this.currentTokenNumber += 1;
    }
  }, {
    key: "nextToken",
    value: function nextToken() {
      var nextNumber = this.currentTokenNumber + 1;
      return this.tokens[nextNumber];
    }
  }, {
    key: "getTokenNumber",
    value: function getTokenNumber(num) {
      return this.tokens[num];
    }
  }, {
    key: "getCurrentTokenNumber",
    value: function getCurrentTokenNumber() {
      return this.currentTokenNumber;
    }
  }, {
    key: "getTokenValue",
    value: function getTokenValue(num) {
      var token = this.tokens[num];
      var tokenType = token.tokenType;
      if (tokenType === 'IDENTIFIER') {
        return String(token.identifier);
      } else if (tokenType === 'KEYWORD') {
        return String(token.keyWord);
      } else if (tokenType === 'SYMBOL') {
        return String(token.symbol);
      } else if (tokenType === 'INT_CONST') {
        return String(token.intVal);
      } else {
        return String(token.stringVal);
      }
    }
    /* Returns the string value of the current token */
  }, {
    key: "getCurrentTokenValue",
    value: function getCurrentTokenValue() {
      var tokenType = this.tokenType();
      if (tokenType === 'IDENTIFIER') {
        return this.identifier();
      } else if (tokenType === 'KEYWORD') {
        return this.keyword();
      } else if (tokenType === 'SYMBOL') {
        return this.symbol();
      } else if (tokenType === 'INT_CONST') {
        return this.intVal();
      } else {
        return this.stringVal(); // STRING_CONST
      }
    }
  }, {
    key: "previousToken",
    value: function previousToken() {
      var previousNumber = this.currentTokenNumber - 1;
      return this.tokens[previousNumber];
    }
  }], [{
    key: "splitIntoTokens",
    value: function splitIntoTokens(file) {
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
            tokenType: TOKEN_TYPES.STRING_CONST,
            stringVal: currentString.slice(1, currentString.length - 1) // removes double quotes
          });
        } else if (/^(\-)?[0-9][0-9]*$/.test(currentToken)) {
          // integer
          tokens.push({
            tokenType: TOKEN_TYPES.INT_CONST,
            intVal: currentToken
          });
        } else if (JackTokenizer.KEYWORDS.includes(currentToken)) {
          // keyword
          tokens.push({
            tokenType: TOKEN_TYPES.KEYWORD,
            keyWord: currentToken
          });
        } else if (JackTokenizer.SYMBOLS.includes(currentToken)) {
          // symbol
          tokens.push({
            tokenType: TOKEN_TYPES.SYMBOL,
            symbol: currentToken
          });
        } else if (/^[a-z_][a-z0-9_]*/i.test(currentToken)) {
          // identifier
          tokens.push({
            tokenType: TOKEN_TYPES.IDENTIFIER,
            identifier: currentToken
          });
        }
        i += 1;
      }
      return tokens;
    }
  }, {
    key: "removeCommentsAndSeparateSymbols",
    value: function removeCommentsAndSeparateSymbols(file) {
      var twoForwardSlashComments = /(\/\/.*(\n)*)?/g;
      var forwardSlashStarComments = /(\/\*{1,2}(.|\n|\r)*?(\*\/))/g;
      var lineBreakAndTabChars = /([\n\r\t]*)/g;
      var symbolSeparator = /([~;[\](){}.,])/g;
      var withoutComments = file.replace(twoForwardSlashComments, '').replace(forwardSlashStarComments, '').replace(lineBreakAndTabChars, '').replace(symbolSeparator, ' $1 '); // separates semi-colon, commas, brackets, parentheses, curly braces and periods from surrounding tokens
      return withoutComments.split(' ').filter(function (token) {
        return !!token;
      });
    }
  }]);
  return JackTokenizer;
}();
JackTokenizer.KEYWORDS = ['class', 'constructor', 'function', 'method', 'field', 'static', 'var', 'int', 'char', 'boolean', 'void', 'true', 'false', 'null', 'this', 'let', 'do', 'if', 'else', 'while', 'return'];
JackTokenizer.SYMBOLS = ['{', '}', '(', ')', '[', ']', '.', ',', ';', '+', '-', '*', '/', '&', '|', '<', '>', '=', '~'];
var _default = JackTokenizer;
exports["default"] = _default;