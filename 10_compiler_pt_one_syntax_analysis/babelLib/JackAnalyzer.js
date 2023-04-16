#!/usr/bin/env node
/* eslint-disable import/extensions */
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _path = _interopRequireDefault(require("path"));
var _fs = require("fs");
var _JackTokenizer = _interopRequireDefault(require("./JackTokenizer.js"));
var _CompilationEngine = _interopRequireDefault(require("./CompilationEngine.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classStaticPrivateMethodGet(receiver, classConstructor, method) { _classCheckPrivateStaticAccess(receiver, classConstructor); return method; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { _classCheckPrivateStaticAccess(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor(descriptor, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classCheckPrivateStaticFieldDescriptor(descriptor, action) { if (descriptor === undefined) { throw new TypeError("attempted to " + action + " private static field before its declaration"); } }
function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
var _inputFiles = /*#__PURE__*/new WeakMap();
var JackAnalyzer = /*#__PURE__*/function () {
  function JackAnalyzer(inputName) {
    _classCallCheck(this, JackAnalyzer);
    _classPrivateFieldInitSpec(this, _inputFiles, {
      writable: true,
      value: void 0
    });
    var inputFilePath = _path["default"].resolve(inputName);
    _classPrivateFieldSet(this, _inputFiles, _classStaticPrivateMethodGet(JackAnalyzer, JackAnalyzer, _getFileNamesToCompile).call(JackAnalyzer, inputFilePath));
  }
  _createClass(JackAnalyzer, [{
    key: "compileFiles",
    value: function compileFiles() {
      var _iterator = _createForOfIteratorHelper(_classPrivateFieldGet(this, _inputFiles)),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var inputFile = _step.value;
          var tokenizer = new _JackTokenizer["default"](inputFile);
          var writeStream = (0, _fs.createWriteStream)(inputFile.replace('jack', 'xml'));
          var compilationEngine = new _CompilationEngine["default"](tokenizer, writeStream);
          compilationEngine.compileClass();
          writeStream.close();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      console.log("Finished compiling the following files: \n\n".concat(_classPrivateFieldGet(this, _inputFiles).join('\n\n')));
    }
  }]);
  return JackAnalyzer;
}();
function _getFileNamesToCompile(inputFilePath) {
  var files = [];
  if (_classStaticPrivateFieldSpecGet(JackAnalyzer, JackAnalyzer, _isSingleFile).call(JackAnalyzer, inputFilePath)) {
    files.push(_path["default"].resolve('./', inputFilePath));
  } else {
    (0, _fs.readdirSync)(inputFilePath).forEach(function (file) {
      if (file.endsWith('.jack')) {
        files.push(_path["default"].resolve(inputFilePath, file));
      }
    });
  }
  return files;
}
var _isSingleFile = {
  writable: true,
  value: function value(inputFilePath) {
    return /.jack$/.test(inputFilePath);
  }
};
var inputName = "".concat(process.argv[2]);
var analyzer = new JackAnalyzer(inputName);
analyzer.compileFiles();