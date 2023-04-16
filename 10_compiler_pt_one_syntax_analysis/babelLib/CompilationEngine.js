"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { _classCheckPrivateStaticAccess(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor(descriptor, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classCheckPrivateStaticFieldDescriptor(descriptor, action) { if (descriptor === undefined) { throw new TypeError("attempted to " + action + " private static field before its declaration"); } }
function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
var _tokenizer = /*#__PURE__*/new WeakMap();
var _writeStream = /*#__PURE__*/new WeakMap();
var _compileLookup = /*#__PURE__*/new WeakMap();
var _compileToken = /*#__PURE__*/new WeakSet();
var _compileNextToken = /*#__PURE__*/new WeakSet();
var _compileSubroutineCall = /*#__PURE__*/new WeakSet();
var _wrapExpression = /*#__PURE__*/new WeakSet();
var _wrapStatements = /*#__PURE__*/new WeakSet();
var CompilationEngine = /*#__PURE__*/function () {
  function CompilationEngine(tokenizer, writeStream) {
    var _this = this;
    _classCallCheck(this, CompilationEngine);
    _classPrivateMethodInitSpec(this, _wrapStatements);
    _classPrivateMethodInitSpec(this, _wrapExpression);
    _classPrivateMethodInitSpec(this, _compileSubroutineCall);
    _classPrivateMethodInitSpec(this, _compileNextToken);
    _classPrivateMethodInitSpec(this, _compileToken);
    _classPrivateFieldInitSpec(this, _tokenizer, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _writeStream, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _compileLookup, {
      writable: true,
      value: {
        "boolean": function boolean() {
          return _this.compileKeyword();
        },
        "class": function _class() {
          return _this.compileKeyword();
        },
        "char": function char() {
          return _this.compileKeyword();
        },
        constructor: function constructor() {
          return _this.compileSubroutine();
        },
        "do": function _do() {
          return _this.compileDo();
        },
        "false": function _false() {
          return _this.compileKeyword();
        },
        field: function field() {
          return _this.compileClassVarDec();
        },
        "function": function _function() {
          return _this.compileSubroutine();
        },
        "else": function _else() {
          return _this.compileKeyword();
        },
        "if": function _if() {
          return _this.compileIf();
        },
        "int": function int() {
          return _this.compileKeyword();
        },
        method: function method() {
          return _this.compileSubroutine();
        },
        "null": function _null() {
          return _this.compileKeyword();
        },
        "let": function _let() {
          return _this.compileLet();
        },
        "return": function _return() {
          return _this.compileReturn();
        },
        "static": function _static() {
          return _this.compileClassVarDec();
        },
        "true": function _true() {
          return _this.compileKeyword();
        },
        "while": function _while() {
          return _this.compileWhile();
        },
        "var": function _var() {
          return _this.compileVarDec();
        },
        "void": function _void() {
          return _this.compileKeyword();
        }
      }
    });
    _classPrivateFieldSet(this, _tokenizer, tokenizer);
    _classPrivateFieldSet(this, _writeStream, writeStream);
  }
  _createClass(CompilationEngine, [{
    key: "compileClass",
    value: function compileClass() {
      _classPrivateFieldGet(this, _writeStream).write('<class>\n');
      _classPrivateMethodGet(this, _compileToken, _compileToken2).call(this); // class identifier

      while (_classPrivateFieldGet(this, _tokenizer).hasMoreTokens()) {
        _classPrivateMethodGet(this, _compileNextToken, _compileNextToken2).call(this);
      }
      _classPrivateFieldGet(this, _writeStream).write('</class>\n');
    }

    /* class, int, void, boolean, else, null */
  }, {
    key: "compileKeyword",
    value: function compileKeyword() {
      _classPrivateFieldGet(this, _writeStream).write("<keyword> ".concat(_classPrivateFieldGet(this, _tokenizer).keyword(), " </keyword>\n"));
    }
  }, {
    key: "compileClassVarDec",
    value: function compileClassVarDec() {
      _classPrivateFieldGet(this, _writeStream).write('<classVarDec>\n');
      _classPrivateFieldGet(this, _writeStream).write("<keyword> ".concat(_classPrivateFieldGet(this, _tokenizer).keyword(), " </keyword>\n")); // 'field' | 'static' keyword
      _classPrivateFieldGet(this, _tokenizer).advance();
      while (_classPrivateFieldGet(this, _tokenizer).symbol() !== ';') {
        _classPrivateMethodGet(this, _compileToken, _compileToken2).call(this);
        _classPrivateFieldGet(this, _tokenizer).advance();
      }
      _classPrivateMethodGet(this, _compileToken, _compileToken2).call(this); // ';'

      _classPrivateFieldGet(this, _writeStream).write('</classVarDec>\n');
    }
  }, {
    key: "compileVarDec",
    value: function compileVarDec() {
      _classPrivateFieldGet(this, _writeStream).write('<varDec>\n');
      _classPrivateFieldGet(this, _writeStream).write("<keyword> ".concat(_classPrivateFieldGet(this, _tokenizer).keyword(), " </keyword>\n")); // 'var' keyword

      _classPrivateFieldGet(this, _tokenizer).advance();
      while (_classPrivateFieldGet(this, _tokenizer).symbol() !== ';') {
        _classPrivateMethodGet(this, _compileToken, _compileToken2).call(this);
        _classPrivateFieldGet(this, _tokenizer).advance();
      }
      _classPrivateMethodGet(this, _compileToken, _compileToken2).call(this); // ';'

      _classPrivateFieldGet(this, _writeStream).write('</varDec>\n');
    }
  }, {
    key: "compileSubroutine",
    value: function compileSubroutine() {
      _classPrivateFieldGet(this, _writeStream).write('<subroutineDec>\n');
      _classPrivateFieldGet(this, _writeStream).write("<keyword> ".concat(_classPrivateFieldGet(this, _tokenizer).keyword(), " </keyword>\n")); // (constructor|method|function)
      _classPrivateFieldGet(this, _tokenizer).advance();
      while (_classPrivateFieldGet(this, _tokenizer).symbol() !== '(') {
        // (void | type identifier) - 1st token
        // (method | function identifier) - 2nd token
        _classPrivateMethodGet(this, _compileToken, _compileToken2).call(this);
        _classPrivateFieldGet(this, _tokenizer).advance();
      }
      _classPrivateMethodGet(this, _compileToken, _compileToken2).call(this); // '('
      _classPrivateFieldGet(this, _tokenizer).advance();
      this.compileParameterList();
      _classPrivateMethodGet(this, _compileToken, _compileToken2).call(this); // enclosing ')' of parameter list

      _classPrivateFieldGet(this, _tokenizer).advance(); // advances tokenizer to '{' to begin subroutine body
      this.compileSubroutineBody();
      _classPrivateFieldGet(this, _writeStream).write('</subroutineDec>\n');
    }
  }, {
    key: "compileLet",
    value: function compileLet() {
      _classPrivateFieldGet(this, _writeStream).write('<letStatement>\n');
      _classPrivateFieldGet(this, _writeStream).write("<keyword> ".concat(_classPrivateFieldGet(this, _tokenizer).keyword(), " </keyword>\n")); // 'let' keyword

      _classPrivateMethodGet(this, _compileNextToken, _compileNextToken2).call(this); // varName
      _classPrivateFieldGet(this, _tokenizer).advance();
      if (_classPrivateFieldGet(this, _tokenizer).symbol() === '[') {
        _classPrivateMethodGet(this, _wrapExpression, _wrapExpression2).call(this); // [ expression ]
        _classPrivateFieldGet(this, _tokenizer).advance();
      }
      _classPrivateMethodGet(this, _compileToken, _compileToken2).call(this); // '='
      _classPrivateFieldGet(this, _tokenizer).advance();
      this.compileExpression();
      if (_classPrivateFieldGet(this, _tokenizer).symbol() === ';') {
        _classPrivateMethodGet(this, _compileToken, _compileToken2).call(this); // ';'
      } else {
        _classPrivateMethodGet(this, _compileNextToken, _compileNextToken2).call(this); // ';'
      }

      _classPrivateFieldGet(this, _writeStream).write('</letStatement>\n');
    }
  }, {
    key: "compileIf",
    value: function compileIf() {
      var _classPrivateFieldGet2;
      _classPrivateFieldGet(this, _writeStream).write('<ifStatement>\n');
      _classPrivateFieldGet(this, _writeStream).write("<keyword> ".concat(_classPrivateFieldGet(this, _tokenizer).keyword(), " </keyword>\n")); // 'if' keyword

      _classPrivateFieldGet(this, _tokenizer).advance(); // advances tokenizer to '('
      _classPrivateMethodGet(this, _wrapExpression, _wrapExpression2).call(this); // ( expression )
      _classPrivateMethodGet(this, _wrapStatements, _wrapStatements2).call(this); // { statements }

      if (((_classPrivateFieldGet2 = _classPrivateFieldGet(this, _tokenizer).nextToken()) === null || _classPrivateFieldGet2 === void 0 ? void 0 : _classPrivateFieldGet2.keyWord) === 'else') {
        _classPrivateFieldGet(this, _tokenizer).advance();
        _classPrivateFieldGet(this, _writeStream).write("<keyword> ".concat(_classPrivateFieldGet(this, _tokenizer).keyword(), " </keyword>\n")); // 'else' keyword
        _classPrivateMethodGet(this, _wrapStatements, _wrapStatements2).call(this); // { statements }
      }

      _classPrivateFieldGet(this, _writeStream).write('</ifStatement>\n');
    }
  }, {
    key: "compileDo",
    value: function compileDo() {
      _classPrivateFieldGet(this, _writeStream).write('<doStatement>\n');
      _classPrivateFieldGet(this, _writeStream).write("<keyword> ".concat(_classPrivateFieldGet(this, _tokenizer).keyword(), " </keyword>\n"));
      _classPrivateFieldGet(this, _tokenizer).advance();
      _classPrivateMethodGet(this, _compileSubroutineCall, _compileSubroutineCall2).call(this);
      _classPrivateMethodGet(this, _compileNextToken, _compileNextToken2).call(this); // ';'

      _classPrivateFieldGet(this, _writeStream).write('</doStatement>\n');
    }
  }, {
    key: "compileWhile",
    value: function compileWhile() {
      _classPrivateFieldGet(this, _writeStream).write('<whileStatement>\n');
      _classPrivateFieldGet(this, _writeStream).write("<keyword> ".concat(_classPrivateFieldGet(this, _tokenizer).keyword(), " </keyword>\n")); // 'while' keyword

      _classPrivateFieldGet(this, _tokenizer).advance(); // sets token to '('
      _classPrivateMethodGet(this, _wrapExpression, _wrapExpression2).call(this); // ( expression )
      _classPrivateMethodGet(this, _wrapStatements, _wrapStatements2).call(this); // { statements }

      _classPrivateFieldGet(this, _writeStream).write('</whileStatement>\n');
    }
  }, {
    key: "compileReturn",
    value: function compileReturn() {
      _classPrivateFieldGet(this, _writeStream).write('<returnStatement>\n');
      _classPrivateFieldGet(this, _writeStream).write("<keyword> ".concat(_classPrivateFieldGet(this, _tokenizer).keyword(), " </keyword>\n")); // 'return' keyword

      _classPrivateFieldGet(this, _tokenizer).advance();
      if (_classPrivateFieldGet(this, _tokenizer).symbol() !== ';') {
        this.compileExpression();
      }
      _classPrivateMethodGet(this, _compileToken, _compileToken2).call(this); // ';'

      _classPrivateFieldGet(this, _writeStream).write('</returnStatement>\n');
    }
  }, {
    key: "compileParameterList",
    value: function compileParameterList() {
      _classPrivateFieldGet(this, _writeStream).write('<parameterList>\n');
      while (_classPrivateFieldGet(this, _tokenizer).symbol() !== ')') {
        _classPrivateMethodGet(this, _compileToken, _compileToken2).call(this);
        _classPrivateFieldGet(this, _tokenizer).advance();
      }
      _classPrivateFieldGet(this, _writeStream).write('</parameterList>\n');
    }
  }, {
    key: "compileSubroutineBody",
    value: function compileSubroutineBody() {
      _classPrivateFieldGet(this, _writeStream).write('<subroutineBody>\n');
      _classPrivateMethodGet(this, _compileToken, _compileToken2).call(this); // '{'
      _classPrivateFieldGet(this, _tokenizer).advance();
      while (_classPrivateFieldGet(this, _tokenizer).keyword() === 'var') {
        this.compileVarDec();
        _classPrivateFieldGet(this, _tokenizer).advance();
      }
      this.compileStatements();
      _classPrivateMethodGet(this, _compileToken, _compileToken2).call(this); // '}'

      _classPrivateFieldGet(this, _writeStream).write('</subroutineBody>\n');
    }
  }, {
    key: "compileStatements",
    value: function compileStatements() {
      _classPrivateFieldGet(this, _writeStream).write('<statements>\n');
      while (_classPrivateFieldGet(this, _tokenizer).symbol() !== '}') {
        _classPrivateMethodGet(this, _compileToken, _compileToken2).call(this);
        if (_classPrivateFieldGet(this, _tokenizer).hasMoreTokens()) {
          _classPrivateFieldGet(this, _tokenizer).advance();
        }
      }
      _classPrivateFieldGet(this, _writeStream).write('</statements>\n');
    }
  }, {
    key: "compileExpression",
    value: function compileExpression() {
      _classPrivateFieldGet(this, _writeStream).write('<expression>\n');
      this.compileTerm();
      _classPrivateFieldGet(this, _tokenizer).advance();
      if (_classStaticPrivateFieldSpecGet(CompilationEngine, CompilationEngine, _OPERATORS).includes(_classPrivateFieldGet(this, _tokenizer).symbol())) {
        _classPrivateMethodGet(this, _compileToken, _compileToken2).call(this); // '+', '-', '*', '/', '&', '|', '<', '>', '='
        _classPrivateFieldGet(this, _tokenizer).advance();
        this.compileTerm();
        _classPrivateFieldGet(this, _tokenizer).advance();
      }
      _classPrivateFieldGet(this, _writeStream).write('</expression>\n');
    }
  }, {
    key: "compileTerm",
    value: function compileTerm() {
      var _classPrivateFieldGet3;
      _classPrivateFieldGet(this, _writeStream).write('<term>\n');
      var tokenType = _classPrivateFieldGet(this, _tokenizer).tokenType();
      var currentSymbol = _classPrivateFieldGet(this, _tokenizer).symbol();
      var nextSymbol = (_classPrivateFieldGet3 = _classPrivateFieldGet(this, _tokenizer).nextToken()) === null || _classPrivateFieldGet3 === void 0 ? void 0 : _classPrivateFieldGet3.symbol;
      var currentKeyword = _classPrivateFieldGet(this, _tokenizer).keyword();
      if (['STRING_CONST', 'INT_CONST'].includes(tokenType)) {
        _classPrivateMethodGet(this, _compileToken, _compileToken2).call(this, tokenType);
      } else if (['true', 'false', 'null', 'this'].includes(currentKeyword)) {
        _classPrivateFieldGet(this, _writeStream).write("<keyword> ".concat(currentKeyword, " </keyword>\n"));
      } else if (tokenType === 'IDENTIFIER') {
        if (nextSymbol === '[') {
          _classPrivateMethodGet(this, _compileToken, _compileToken2).call(this, tokenType); // varName
          _classPrivateFieldGet(this, _tokenizer).advance(); // sets tokenizer to '['
          _classPrivateMethodGet(this, _wrapExpression, _wrapExpression2).call(this); // [ expression ]
        } else if (['(', '.'].includes(nextSymbol)) {
          _classPrivateMethodGet(this, _compileSubroutineCall, _compileSubroutineCall2).call(this);
        } else {
          _classPrivateMethodGet(this, _compileToken, _compileToken2).call(this, tokenType); // varName
        }
      } else if (tokenType === 'SYMBOL' && currentSymbol === '(') {
        _classPrivateMethodGet(this, _wrapExpression, _wrapExpression2).call(this); // ( expression )
      } else if (tokenType === 'SYMBOL' && ['~', '-'].includes(currentSymbol)) {
        _classPrivateMethodGet(this, _compileToken, _compileToken2).call(this, tokenType); // '~' or '-'
        _classPrivateFieldGet(this, _tokenizer).advance();
        this.compileTerm();
      }
      _classPrivateFieldGet(this, _writeStream).write('</term>\n');
    }
  }, {
    key: "compileExpressionList",
    value: function compileExpressionList() {
      _classPrivateFieldGet(this, _writeStream).write('<expressionList>\n');
      if (_classPrivateFieldGet(this, _tokenizer).symbol() !== ')') {
        this.compileExpression();
        while (_classPrivateFieldGet(this, _tokenizer).symbol() === ',') {
          _classPrivateMethodGet(this, _compileToken, _compileToken2).call(this); // ',' symbol
          _classPrivateFieldGet(this, _tokenizer).advance();
          this.compileExpression();
        }
      }
      _classPrivateFieldGet(this, _writeStream).write('</expressionList>\n');
    }
  }]);
  return CompilationEngine;
}();
exports["default"] = CompilationEngine;
function _compileToken2() {
  var tokenType = _classPrivateFieldGet(this, _tokenizer).tokenType();
  var symbol = _classPrivateFieldGet(this, _tokenizer).symbol();
  switch (tokenType) {
    case 'KEYWORD':
      _classPrivateFieldGet(this, _compileLookup)[_classPrivateFieldGet(this, _tokenizer).keyword()]();
      break;
    case 'IDENTIFIER':
      _classPrivateFieldGet(this, _writeStream).write("<identifier> ".concat(_classPrivateFieldGet(this, _tokenizer).identifier(), " </identifier>\n"));
      break;
    case 'INT_CONST':
      _classPrivateFieldGet(this, _writeStream).write("<integerConstant> ".concat(_classPrivateFieldGet(this, _tokenizer).intVal(), " </integerConstant>\n"));
      break;
    case 'STRING_CONST':
      _classPrivateFieldGet(this, _writeStream).write("<stringConstant> ".concat(_classPrivateFieldGet(this, _tokenizer).stringVal(), " </stringConstant>\n"));
      break;
    case 'SYMBOL':
      symbol = _classStaticPrivateFieldSpecGet(CompilationEngine, CompilationEngine, _SYMBOL_CONVERTER)[symbol] || symbol; // converts <, ;, &, >
      _classPrivateFieldGet(this, _writeStream).write("<symbol> ".concat(symbol, " </symbol>\n"));
      break;
    default:
      throw new Error('Could not determine token type');
  }
}
function _compileNextToken2() {
  _classPrivateFieldGet(this, _tokenizer).advance();
  _classPrivateMethodGet(this, _compileToken, _compileToken2).call(this);
}
function _compileSubroutineCall2() {
  _classPrivateMethodGet(this, _compileToken, _compileToken2).call(this); // identifier
  _classPrivateMethodGet(this, _compileNextToken, _compileNextToken2).call(this); // '(' or '.'

  if (_classPrivateFieldGet(this, _tokenizer).symbol() === '(') {
    _classPrivateFieldGet(this, _tokenizer).advance();
    this.compileExpressionList();
    _classPrivateMethodGet(this, _compileToken, _compileToken2).call(this); // ')'
  } else if (_classPrivateFieldGet(this, _tokenizer).symbol() === '.') {
    _classPrivateMethodGet(this, _compileNextToken, _compileNextToken2).call(this); // subroutine name
    _classPrivateMethodGet(this, _compileNextToken, _compileNextToken2).call(this); // '('
    _classPrivateFieldGet(this, _tokenizer).advance();
    this.compileExpressionList();
    _classPrivateMethodGet(this, _compileToken, _compileToken2).call(this); // ')';
  }
}
function _wrapExpression2() {
  _classPrivateMethodGet(this, _compileToken, _compileToken2).call(this); // '(', '['
  _classPrivateFieldGet(this, _tokenizer).advance();
  this.compileExpression();
  _classPrivateMethodGet(this, _compileToken, _compileToken2).call(this); // ')', ']'
}
function _wrapStatements2() {
  _classPrivateMethodGet(this, _compileNextToken, _compileNextToken2).call(this); // '{'
  _classPrivateFieldGet(this, _tokenizer).advance();
  this.compileStatements();
  _classPrivateMethodGet(this, _compileToken, _compileToken2).call(this); // '}'
}
var _OPERATORS = {
  writable: true,
  value: ['+', '-', '*', '/', '&', '|', '<', '>', '=']
};
var _SYMBOL_CONVERTER = {
  writable: true,
  value: {
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '&': '&amp;'
  }
};