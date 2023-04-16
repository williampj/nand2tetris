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
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
var _VMInstructions = /*#__PURE__*/new WeakMap();
var _numberOfVMInstructions = /*#__PURE__*/new WeakMap();
var _currentInstructionNumber = /*#__PURE__*/new WeakMap();
var _currentInstruction = /*#__PURE__*/new WeakMap();
var _commandType = /*#__PURE__*/new WeakMap();
var _arg = /*#__PURE__*/new WeakMap();
var _arg2 = /*#__PURE__*/new WeakMap();
var _loadVMInstructions = /*#__PURE__*/new WeakSet();
var _setCommandType = /*#__PURE__*/new WeakSet();
var _setArg = /*#__PURE__*/new WeakSet();
var _setArg3 = /*#__PURE__*/new WeakSet();
var Parser = /*#__PURE__*/function () {
  function Parser(_VMFileName) {
    _classCallCheck(this, Parser);
    _classPrivateMethodInitSpec(this, _setArg3);
    _classPrivateMethodInitSpec(this, _setArg);
    _classPrivateMethodInitSpec(this, _setCommandType);
    _classPrivateMethodInitSpec(this, _loadVMInstructions);
    _classPrivateFieldInitSpec(this, _VMInstructions, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _numberOfVMInstructions, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _currentInstructionNumber, {
      writable: true,
      value: 0
    });
    _classPrivateFieldInitSpec(this, _currentInstruction, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _commandType, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _arg, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _arg2, {
      writable: true,
      value: void 0
    });
    _classPrivateMethodGet(this, _loadVMInstructions, _loadVMInstructions2).call(this, _VMFileName);
  }
  _createClass(Parser, [{
    key: "hasMoreLines",
    value: function hasMoreLines() {
      return !!(_classPrivateFieldGet(this, _currentInstructionNumber) < _classPrivateFieldGet(this, _numberOfVMInstructions));
    }
  }, {
    key: "advance",
    value: function advance() {
      _classPrivateFieldSet(this, _currentInstruction, _classPrivateFieldGet(this, _VMInstructions)[_classPrivateFieldGet(this, _currentInstructionNumber)]);
      _classPrivateMethodGet(this, _setCommandType, _setCommandType2).call(this);
      if (_classPrivateFieldGet(this, _commandType) !== Parser.COMMAND_TYPES.C_RETURN) _classPrivateMethodGet(this, _setArg, _setArg2).call(this);
      if ([Parser.COMMAND_TYPES.C_PUSH, Parser.COMMAND_TYPES.C_POP, Parser.COMMAND_TYPES.C_FUNCTION, Parser.COMMAND_TYPES.C_CALL].includes(_classPrivateFieldGet(this, _commandType))) _classPrivateMethodGet(this, _setArg3, _setArg4).call(this);
      _classPrivateFieldSet(this, _currentInstructionNumber, _classPrivateFieldGet(this, _currentInstructionNumber) + 1);
    }
  }, {
    key: "commandType",
    value: function commandType() {
      return _classPrivateFieldGet(this, _commandType);
    }
  }, {
    key: "arg1",
    value: function arg1() {
      return _classPrivateFieldGet(this, _arg);
    }
  }, {
    key: "arg2",
    value: function arg2() {
      return _classPrivateFieldGet(this, _arg2);
    }
  }]);
  return Parser;
}();
exports["default"] = Parser;
function _loadVMInstructions2(VMFileName) {
  try {
    var VMFile = (0, _fs.readFileSync)(VMFileName).toString().split('\n').map(function (line) {
      return line.trim();
    });
    _classPrivateFieldSet(this, _VMInstructions, VMFile.filter(function (line) {
      return !!line && !line.startsWith('//');
    }).map(function (line) {
      return line.split('//')[0].trim();
    }));
    _classPrivateFieldSet(this, _numberOfVMInstructions, _classPrivateFieldGet(this, _VMInstructions).length);
  } catch (e) {
    console.error(e);
  }
}
function _setCommandType2() {
  if (/^(add)|(sub)|(neg)/.test(_classPrivateFieldGet(this, _currentInstruction))) {
    _classPrivateFieldSet(this, _commandType, Parser.COMMAND_TYPES.C_ARITHMETIC);
  } else if (/^(lt)|(eq)|(gt)/.test(_classPrivateFieldGet(this, _currentInstruction))) {
    _classPrivateFieldSet(this, _commandType, Parser.COMMAND_TYPES.C_COMPARISON);
  } else if (/^(and)|(or)|(not)/.test(_classPrivateFieldGet(this, _currentInstruction))) {
    _classPrivateFieldSet(this, _commandType, Parser.COMMAND_TYPES.C_LOGIC);
  } else if (/^function/.test(_classPrivateFieldGet(this, _currentInstruction))) {
    _classPrivateFieldSet(this, _commandType, Parser.COMMAND_TYPES.C_FUNCTION);
  } else if (/^push/.test(_classPrivateFieldGet(this, _currentInstruction))) {
    _classPrivateFieldSet(this, _commandType, Parser.COMMAND_TYPES.C_PUSH);
  } else if (/^pop/.test(_classPrivateFieldGet(this, _currentInstruction))) {
    _classPrivateFieldSet(this, _commandType, Parser.COMMAND_TYPES.C_POP);
  } else if (/^label/.test(_classPrivateFieldGet(this, _currentInstruction))) {
    _classPrivateFieldSet(this, _commandType, Parser.COMMAND_TYPES.C_LABEL);
  } else if (/^goto/.test(_classPrivateFieldGet(this, _currentInstruction))) {
    _classPrivateFieldSet(this, _commandType, Parser.COMMAND_TYPES.C_GOTO);
  } else if (/^if-goto/.test(_classPrivateFieldGet(this, _currentInstruction))) {
    _classPrivateFieldSet(this, _commandType, Parser.COMMAND_TYPES.C_IF);
  } else if (/^call/.test(_classPrivateFieldGet(this, _currentInstruction))) {
    _classPrivateFieldSet(this, _commandType, Parser.COMMAND_TYPES.C_CALL);
  } else if (/^return/.test(_classPrivateFieldGet(this, _currentInstruction))) {
    _classPrivateFieldSet(this, _commandType, Parser.COMMAND_TYPES.C_RETURN);
  } else {
    throw new Error("could not determine the command type for ".concat(_classPrivateFieldGet(this, _currentInstruction)));
  }
}
function _setArg2() {
  if (['add', 'sub', 'neg', 'lt', 'eq', 'gt', 'and', 'or', 'not'].includes(_classPrivateFieldGet(this, _currentInstruction))) {
    _classPrivateFieldSet(this, _arg, _classPrivateFieldGet(this, _currentInstruction));
  } else {
    // push, pop, label, goto, if-goto
    _classPrivateFieldSet(this, _arg, _classPrivateFieldGet(this, _currentInstruction).split(' ')[1]);
  }
}
function _setArg4() {
  _classPrivateFieldSet(this, _arg2, _classPrivateFieldGet(this, _currentInstruction).split(' ')[2]);
}
_defineProperty(Parser, "COMMAND_TYPES", {
  C_ARITHMETIC: 'C_ARITHMETIC',
  C_CALL: 'C_CALL',
  C_COMPARISON: 'C_COMPARISON',
  C_FUNCTION: 'C_FUNCTION',
  C_GOTO: 'C_GOTO',
  C_IF: 'C_IF',
  C_LABEL: 'C_LABEL',
  C_LOGIC: 'C_LOGIC',
  C_PUSH: 'C_PUSH',
  C_POP: 'C_POP',
  C_RETURN: 'C_RETURN'
});