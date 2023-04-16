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
var CompilationEngine = /*#__PURE__*/function () {
  function CompilationEngine(tokenizer, methodSymbolTable, classSymbolTable, VMWriter) {
    var _this = this;
    _classCallCheck(this, CompilationEngine);
    /* Calls the compilation method assigned to the given token. */
    this.compileLookup = {
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
        return _this.compileNullFalse();
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
        return _this.compileNullFalse();
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
      "this": function _this() {
        return _this.compileThis();
      },
      "true": function _true() {
        return _this.compileTrue();
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
    };
    this.tokenizer = tokenizer;
    this.methodSymbolTable = methodSymbolTable;
    this.classSymbolTable = classSymbolTable;
    this.vmWriter = VMWriter;
    this.subRoutineReturnType = '';
    this.classIdentifier = '';
    this.ifLabelIndex = 0;
    this.whileLabelIndex = 0;
    this.numberOfFields = 0;
  }
  /* First method to run.
   * It compiles a complete class, which wraps all other tokens compilations.
  */
  _createClass(CompilationEngine, [{
    key: "compileToken",
    value: /* Determines compilation logic based on token type. */
    function compileToken(symbolInfo) {
      var tokenType = this.tokenizer.tokenType();
      var symbol = this.tokenizer.symbol();
      var keyword = this.tokenizer.keyword();
      var identifier = this.tokenizer.identifier();
      switch (tokenType) {
        case 'KEYWORD':
          this.compileLookup[keyword]();
          break;
        case 'IDENTIFIER':
          if (symbolInfo) {
            var category = CompilationEngine.CATEGORY_CONVERTER[symbolInfo.category];
            this.vmWriter.writePush({
              segment: category,
              number: symbolInfo.index
            });
          }
          break;
        case 'INT_CONST':
          var value = Number(this.tokenizer.intVal());
          if (value >= 0) {
            this.vmWriter.writePush({
              segment: 'constant',
              number: value
            });
          } else {
            value = value * -1;
            this.vmWriter.writePush({
              segment: 'constant',
              number: value
            });
            this.vmWriter.writeArithmetic('neg');
          }
          break;
        case 'STRING_CONST':
          this.compileString();
          break;
        case 'SYMBOL':
          var operator = CompilationEngine.OPERATOR_CONVERTER[symbol];
          if (operator) {
            this.vmWriter.writeArithmetic(operator);
          }
          break;
        default:
          throw new Error('Could not determine token type');
      }
    }
    /* Advances the tokenizer and compiles the next token. */
  }, {
    key: "compileNextToken",
    value: function compileNextToken() {
      this.tokenizer.advance();
      this.compileToken();
    }
    /* Compiles the subroutine call */
  }, {
    key: "compileSubroutineCall",
    value: function compileSubroutineCall() {
      var className;
      var identifier = this.getCurrentTokenValue();
      var functionOrConstructor = identifier[0] === identifier[0].toUpperCase();
      var subroutineName;
      this.tokenizer.advance();
      var separator = this.getCurrentTokenValue(); // '(' || '.'
      if (separator === '(') {
        // function call
        subroutineName = identifier;
        identifier = 'this';
        className = this.classIdentifier;
        this.tokenizer.advance();
      } else {
        // '.' // method or constructor call
        this.tokenizer.advance();
        subroutineName = this.getCurrentTokenValue();
        if (this.methodSymbolTable.typeOf(identifier) !== 'NONE') {
          className = this.methodSymbolTable.typeOf(identifier);
        } else if (this.classSymbolTable.typeOf(identifier) !== 'NONE') {
          className = this.classSymbolTable.typeOf(identifier);
        } else {
          className = identifier;
        }
        this.tokenizer.advance(); // '('
        this.tokenizer.advance();
      }
      if (!functionOrConstructor) {
        var segment;
        var number;
        if (identifier === 'this') {
          segment = 'pointer';
          number = 0;
        } else {
          var kind = this.methodSymbolTable.kindOf(identifier);
          segment = CompilationEngine.CATEGORY_CONVERTER[kind];
          number = this.methodSymbolTable.indexOf(identifier);
        }
        this.vmWriter.writePush({
          segment: segment,
          number: number
        });
      }
      var expressionCount = this.compileExpressionList();
      if (!functionOrConstructor) {
        expressionCount += 1; // adds 'this' argument to method calls
      }

      this.vmWriter.writeCall({
        segment: "".concat(className, ".").concat(subroutineName),
        number: expressionCount
      });
    }
  }, {
    key: "compileNullFalse",
    value: function compileNullFalse() {
      this.vmWriter.writePush({
        segment: 'constant',
        number: 0
      });
    }
  }, {
    key: "compileThis",
    value: function compileThis() {
      this.vmWriter.writePush({
        segment: 'pointer',
        number: 0
      });
    }
  }, {
    key: "compileTrue",
    value: function compileTrue() {
      this.vmWriter.writePush({
        segment: 'constant',
        number: 1
      });
      this.vmWriter.writeArithmetic('neg');
    }
  }, {
    key: "compileString",
    value: function compileString() {
      var stringVal = this.tokenizer.stringVal();
      var stringLength = stringVal.length;
      this.vmWriter.writePush({
        segment: 'constant',
        number: stringLength
      });
      this.vmWriter.writeCall({
        segment: 'String.new',
        number: 1
      });
      for (var i = 0; i < stringLength; i += 1) {
        var charCode = stringVal.charCodeAt(i);
        this.vmWriter.writePush({
          segment: 'constant',
          number: charCode
        });
        this.vmWriter.writeCall({
          segment: 'String.appendChar',
          number: 2
        });
      }
    }
    /* Wraps expression in parentheses or brackets and compiles its contents. */
  }, {
    key: "wrapExpression",
    value: function wrapExpression() {
      this.tokenizer.advance();
      this.compileExpression();
    }
    /* Wraps statement in curly braces and compiles its contents. */
  }, {
    key: "wrapStatements",
    value: function wrapStatements() {
      this.tokenizer.advance(); // '{'
      this.tokenizer.advance();
      this.compileStatements();
    }
    /* Returns the string value of the current token */
  }, {
    key: "getCurrentTokenValue",
    value: function getCurrentTokenValue() {
      var tokenType = this.tokenizer.tokenType();
      if (tokenType === 'IDENTIFIER') {
        return this.tokenizer.identifier();
      } else if (tokenType === 'KEYWORD') {
        return this.tokenizer.keyword();
      } else if (tokenType === 'SYMBOL') {
        return this.tokenizer.symbol();
      } else if (tokenType === 'INT_CONST') {
        return this.tokenizer.intVal();
      } else {
        return this.tokenizer.stringVal(); // STRING_CONST
      }
    }
  }, {
    key: "getVarCount",
    value: function getVarCount() {
      var count = 0;
      var currentTokenNum = this.tokenizer.getCurrentTokenNumber();
      var currentValue = this.tokenizer.getTokenValue(currentTokenNum);
      while (currentValue !== '{') {
        currentTokenNum += 1;
        currentValue = this.tokenizer.getTokenValue(currentTokenNum);
      }
      currentTokenNum += 1;
      currentValue = this.tokenizer.getTokenValue(currentTokenNum); // 'var' if there are local variables
      while (currentValue === 'var') {
        var commas = 0;
        while (currentValue !== ';') {
          currentTokenNum += 1;
          currentValue = this.tokenizer.getTokenValue(currentTokenNum);
          if (currentValue === ',') {
            commas += 1;
          }
        }
        count += commas + 1;
        currentTokenNum += 1;
        currentValue = this.tokenizer.getTokenValue(currentTokenNum);
      }
      return count;
    }
  }, {
    key: "compileClass",
    value: function compileClass() {
      this.tokenizer.advance();
      this.classIdentifier = this.getCurrentTokenValue();
      while (this.tokenizer.hasMoreTokens()) {
        this.compileNextToken();
      }
    }
    /* Compiles the keywords: class, int, void, boolean, else, null. */
  }, {
    key: "compileKeyword",
    value: function compileKeyword() {}
    /* Compiles a static variable declaration or a field declaration. */
  }, {
    key: "compileClassVarDec",
    value: function compileClassVarDec() {
      var kind = this.getCurrentTokenValue().toUpperCase(); // 'field' / 'static'
      this.tokenizer.advance();
      var type = this.getCurrentTokenValue(); // int, bool, char, Array, className 
      this.tokenizer.advance();
      while (this.tokenizer.symbol() !== ';') {
        var tokenValue = this.getCurrentTokenValue(); // identifier or ,
        if (tokenValue !== ',') {
          if (kind === 'FIELD') {
            this.numberOfFields += 1;
            // Adds class variable to method symbol-table
            this.methodSymbolTable.define({
              name: tokenValue,
              type: type,
              kind: kind
            });
          } else {
            // kind === 'STATIC'
            this.classSymbolTable.define({
              name: tokenValue,
              type: type,
              kind: kind
            });
          }
        }
        this.tokenizer.advance();
      }
    }
    /* Compiles var (local variable) declaration. */
  }, {
    key: "compileVarDec",
    value: function compileVarDec() {
      var kind = this.getCurrentTokenValue().toUpperCase(); // 'var''
      this.tokenizer.advance();
      var type = this.getCurrentTokenValue(); // int, bool, char, Array, className 
      this.compileToken();
      this.tokenizer.advance();
      while (this.tokenizer.symbol() !== ';') {
        var tokenValue = this.getCurrentTokenValue(); // identifier or ,
        if (tokenValue !== ',') {
          // Adds variable to method symbol-table
          this.methodSymbolTable.define({
            name: tokenValue,
            type: type,
            kind: kind
          });
        }
        this.tokenizer.advance(); // ';'
      }
    }
    /* Compiles a complete method, function or constructor. */
  }, {
    key: "compileSubroutine",
    value: function compileSubroutine() {
      this.methodSymbolTable.reset(); // resets method symbol table for a new subroutine
      var subroutineType = this.tokenizer.keyword(); // (constructor|method|function)
      if (subroutineType === 'method') {
        this.methodSymbolTable.define({
          name: 'this',
          kind: 'ARG',
          type: this.classIdentifier
        });
      }
      this.tokenizer.advance();
      this.subRoutineReturnType = this.getCurrentTokenValue(); // void | type identifier
      this.tokenizer.advance();
      var subroutineName = this.getCurrentTokenValue();
      this.tokenizer.advance(); // '('
      var varCount = this.getVarCount();
      var functionName = "".concat(this.classIdentifier, ".").concat(subroutineName);
      this.vmWriter.writeFunction(functionName, varCount);
      if (subroutineType === 'constructor') {
        this.vmWriter.writePush({
          segment: 'constant',
          number: this.numberOfFields
        });
        this.vmWriter.writeCall({
          segment: 'Memory.alloc',
          number: 1
        });
        this.vmWriter.writePop({
          segment: 'pointer',
          number: 0
        });
      } else if (subroutineType === 'method') {
        this.vmWriter.writePush({
          segment: 'argument',
          number: 0
        });
        this.vmWriter.writePop({
          segment: 'pointer',
          number: 0
        });
      }
      this.tokenizer.advance(); // ')'
      this.compileParameterList();
      this.tokenizer.advance(); // '{' to begin subroutine body
      this.compileSubroutineBody();
      this.subRoutineReturnType = ''; // resetting subroutineReturnType
    }
    /* Compiles let statements. */
  }, {
    key: "compileLet",
    value: function compileLet() {
      this.tokenizer.advance(); // 'identifier name'
      var name = this.tokenizer.identifier();
      var category = this.methodSymbolTable.kindOf(name);
      if (category === 'NONE') {
        category = this.classSymbolTable.kindOf(name);
      }
      ;
      category = CompilationEngine.CATEGORY_CONVERTER[category];
      var index = this.methodSymbolTable.indexOf(name);
      if (typeof index !== 'number') {
        index = this.classSymbolTable.indexOf(name);
      }
      ;
      this.tokenizer.advance();
      if (this.tokenizer.symbol() === '[') {
        // pushes array base address to stack
        this.vmWriter.writePush({
          segment: category,
          number: index
        });
        this.wrapExpression(); // [ expression ]
        // pushes array element address to be at the top of the stack
        this.vmWriter.writeArithmetic('add');
        this.tokenizer.advance(); // '='
        this.tokenizer.advance();
        this.compileExpression();
        this.vmWriter.writePop({
          segment: 'temp',
          number: 0
        });
        this.vmWriter.writePop({
          segment: 'pointer',
          number: 1
        });
        this.vmWriter.writePush({
          segment: 'temp',
          number: 0
        });
        this.vmWriter.writePop({
          segment: 'that',
          number: 0
        });
        if (this.tokenizer.symbol() !== ';') {
          this.tokenizer.advance();
        }
      } else {
        this.tokenizer.advance();
        this.compileExpression();
        if (this.tokenizer.symbol() !== ';') {
          this.tokenizer.advance();
        }
        this.vmWriter.writePop({
          segment: category,
          number: index
        });
      }
    }
    /* Compiles an if statement, possibly with a trailing else clause. */
  }, {
    key: "compileIf",
    value: function compileIf() {
      var _this$tokenizer$nextT;
      var currentIfScope = this.ifLabelIndex;
      this.ifLabelIndex += 1;
      this.tokenizer.advance(); // advances tokenizer to '('
      this.wrapExpression(); // ( expression )
      this.vmWriter.writeArithmetic('not');
      this.vmWriter.writeIf("ELSE_".concat(currentIfScope));
      this.wrapStatements(); // { statements }
      if (((_this$tokenizer$nextT = this.tokenizer.nextToken()) === null || _this$tokenizer$nextT === void 0 ? void 0 : _this$tokenizer$nextT.keyWord) === 'else') {
        this.vmWriter.writeGoTo("END_IF_".concat(currentIfScope));
        this.vmWriter.writeLabel("ELSE_".concat(currentIfScope));
        this.tokenizer.advance();
        this.wrapStatements(); // { statements }
        this.vmWriter.writeLabel("END_IF_".concat(currentIfScope));
      } else {
        this.vmWriter.writeLabel("ELSE_".concat(currentIfScope));
      }
    }
    /* Compiles a do statement. */
  }, {
    key: "compileDo",
    value: function compileDo() {
      this.tokenizer.advance();
      this.compileSubroutineCall();
      this.vmWriter.writePop({
        segment: 'temp',
        number: 0
      });
      this.tokenizer.advance(); // ';'
    }
    /* Compiles a while statements. */
  }, {
    key: "compileWhile",
    value: function compileWhile() {
      var currentWhileScope = this.whileLabelIndex;
      this.whileLabelIndex += 1;
      this.tokenizer.advance(); // sets token to '('
      this.vmWriter.writeLabel("WHILE_".concat(currentWhileScope));
      this.wrapExpression(); // ( expression )
      this.vmWriter.writeArithmetic('not');
      this.vmWriter.writeIf("END_WHILE_".concat(currentWhileScope));
      this.wrapStatements(); // { statements }
      this.vmWriter.writeGoTo("WHILE_".concat(currentWhileScope));
      this.vmWriter.writeLabel("END_WHILE_".concat(currentWhileScope));
    }
    /* Compiles a return statements. */
  }, {
    key: "compileReturn",
    value: function compileReturn() {
      this.tokenizer.advance();
      if (this.tokenizer.symbol() !== ';') {
        this.compileExpression();
      }
      if (this.subRoutineReturnType === 'void') {
        this.vmWriter.writePush({
          segment: 'constant',
          number: 0
        });
      }
      this.vmWriter.writeReturn();
    }
    /* Compiles a (possibly empty) parameter list. */
  }, {
    key: "compileParameterList",
    value: function compileParameterList() {
      var type;
      while (this.tokenizer.symbol() !== ')') {
        var tokenValue = this.getCurrentTokenValue(); // identifier or ,
        if (tokenValue !== ',' && !type) {
          type = tokenValue;
        } else if (tokenValue !== ',' && type) {
          // Add variable to method symbol-table
          this.methodSymbolTable.define({
            name: tokenValue,
            type: type,
            kind: 'ARG'
          });
          type = undefined;
        }
        this.tokenizer.advance();
      }
    }
    /* Compiles a subroutine's body. */
  }, {
    key: "compileSubroutineBody",
    value: function compileSubroutineBody() {
      this.tokenizer.advance(); // from '{' to subroutine body
      while (this.tokenizer.keyword() === 'var') {
        this.compileVarDec();
        this.tokenizer.advance();
      }
      this.compileStatements();
    }
    /* Compiles a sequence of statements. */
  }, {
    key: "compileStatements",
    value: function compileStatements() {
      while (this.tokenizer.symbol() !== '}') {
        this.compileToken();
        if (this.tokenizer.hasMoreTokens()) {
          this.tokenizer.advance();
        }
      }
    }
    /* Compiles an expression. */
  }, {
    key: "compileExpression",
    value: function compileExpression() {
      var operator;
      var notOperator = false;
      if (this.tokenizer.symbol() === '~') {
        notOperator = true;
        this.tokenizer.advance();
      }
      this.compileTerm();
      this.tokenizer.advance();
      if (CompilationEngine.OPERATORS.includes(this.tokenizer.symbol())) {
        operator = this.getCurrentTokenValue(); // '+', '-', '*', '/', '&', '|', '<', '>', '='
        this.tokenizer.advance();
        this.compileTerm();
        this.tokenizer.advance();
        if (operator === '*') {
          this.vmWriter.writeCall({
            segment: 'Math.multiply',
            number: 2
          });
        } else if (operator === '/') {
          this.vmWriter.writeCall({
            segment: 'Math.divide',
            number: 2
          });
        } else {
          var writtenOperator = CompilationEngine.OPERATOR_CONVERTER[operator];
          this.vmWriter.writeArithmetic(writtenOperator);
        }
      }
      if (notOperator) {
        this.vmWriter.writeArithmetic('not');
        notOperator = false;
      }
    }
    /* Compiles a term.
     * If the current token is an identifier, the routine must resolve to a variable,
     * array element, or subroutine call.
     */
  }, {
    key: "compileTerm",
    value: function compileTerm() {
      var _this$tokenizer$nextT2;
      var tokenType = this.tokenizer.tokenType();
      var currentSymbol = this.tokenizer.symbol();
      var nextSymbol = String((_this$tokenizer$nextT2 = this.tokenizer.nextToken()) === null || _this$tokenizer$nextT2 === void 0 ? void 0 : _this$tokenizer$nextT2.symbol);
      var currentKeyword = this.tokenizer.keyword();
      var identifierValue = this.tokenizer.identifier();
      if (['STRING_CONST', 'INT_CONST'].includes(tokenType)) {
        this.compileToken();
      } else if (['true', 'false', 'null', 'this'].includes(currentKeyword)) {
        this.compileToken();
      } else if (tokenType === 'IDENTIFIER') {
        var category = this.methodSymbolTable.kindOf(identifierValue);
        var index;
        if (category === 'NONE') {
          category = this.classSymbolTable.kindOf(identifierValue);
          index = this.classSymbolTable.indexOf(identifierValue);
        } else {
          index = this.methodSymbolTable.indexOf(identifierValue);
        }
        if (nextSymbol === '[') {
          this.compileToken({
            category: category,
            index: index
          }); // varName
          this.tokenizer.advance(); // sets tokenizer to '['
          this.wrapExpression(); // [ expression ]
          this.vmWriter.writeArithmetic('add');
          this.vmWriter.writePop({
            segment: 'pointer',
            number: 1
          });
          this.vmWriter.writePush({
            segment: 'that',
            number: 0
          });
        } else if (['(', '.'].includes(nextSymbol)) {
          this.compileSubroutineCall();
        } else {
          // identifier name
          var symbol = {
            category: category,
            index: index
          };
          this.compileToken(symbol); // varName
        }
      } else if (tokenType === 'SYMBOL' && currentSymbol === '(') {
        this.wrapExpression(); // ( expression )
      } else if (tokenType === 'SYMBOL' && '-' === currentSymbol) {
        this.compileToken(); // '~' or '-'
        this.tokenizer.advance();
        _fs.lstat;
        this.compileTerm();
      }
    }
    /* Compiles (possibly empty) comma-separated list of expressions.
     * Returns the number of expressions in the list.
     */
  }, {
    key: "compileExpressionList",
    value: function compileExpressionList() {
      var count = 0;
      if (this.tokenizer.symbol() !== ')') {
        count += 1;
        this.compileExpression();
        while (this.tokenizer.symbol() === ',') {
          this.tokenizer.advance();
          this.compileExpression();
          count += 1;
        }
      }
      return count;
    }
  }]);
  return CompilationEngine;
}();
CompilationEngine.OPERATORS = ['+', '-', '*', '/', '&', '|', '<', '>', '='];
CompilationEngine.OPERATOR_CONVERTER = {
  '+': 'add',
  '-': 'sub',
  '&': 'and',
  '|': 'or',
  '~': 'not',
  '<': 'lt',
  '>': 'gt',
  '=': 'eq'
};
CompilationEngine.CATEGORY_CONVERTER = {
  'FIELD': 'this',
  'STATIC': 'static',
  'VAR': 'local',
  'ARG': 'argument'
};
var _default = CompilationEngine;
exports["default"] = _default;