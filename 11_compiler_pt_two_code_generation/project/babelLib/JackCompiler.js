#!/usr/bin/env node
/* eslint-disable import/extensions */
"use strict";

var path = _interopRequireWildcard(require("path"));
var _fs = require("fs");
var _JackTokenizer = _interopRequireDefault(require("./JackTokenizer.js"));
var _CompilationEngine = _interopRequireDefault(require("./CompilationEngine.js"));
var _SymbolTable = _interopRequireDefault(require("./SymbolTable.js"));
var _VMWriter = _interopRequireDefault(require("./VMWriter.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var JackAnalyzer = /*#__PURE__*/function () {
  function JackAnalyzer(inputName) {
    _classCallCheck(this, JackAnalyzer);
    var inputFilePath = path.resolve(inputName);
    this.inputFiles = JackAnalyzer.getFileNamesToCompile(inputFilePath);
  }
  /* Orchestration engine that iterates and ensures the compilation of each input file */
  _createClass(JackAnalyzer, [{
    key: "compileFiles",
    value: function compileFiles() {
      var _iterator = _createForOfIteratorHelper(this.inputFiles),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var inputFile = _step.value;
          var tokenizer = new _JackTokenizer["default"](inputFile);
          var writeStream = (0, _fs.createWriteStream)(inputFile.replace('jack', 'vm'));
          var classSymbolTable = new _SymbolTable["default"]();
          var methodSymbolTable = new _SymbolTable["default"]();
          var vmWriter = new _VMWriter["default"](writeStream);
          var compilationEngine = new _CompilationEngine["default"](tokenizer, methodSymbolTable, classSymbolTable, vmWriter);
          compilationEngine.compileClass();
          vmWriter.close();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      console.log("Finished compiling the following files: \n\n".concat(this.inputFiles.join('\n\n')));
    }
  }], [{
    key: "getFileNamesToCompile",
    value: function getFileNamesToCompile(inputFilePath) {
      var files = [];
      if (JackAnalyzer.isSingleFile(inputFilePath)) {
        files.push(path.resolve('./', inputFilePath));
      } else {
        (0, _fs.readdirSync)(inputFilePath).forEach(function (file) {
          if (file.endsWith('.jack')) {
            files.push(path.resolve(inputFilePath, file));
          }
        });
      }
      return files;
    }
  }]);
  return JackAnalyzer;
}();
JackAnalyzer.isSingleFile = function (inputFilePath) {
  return /.jack$/.test(inputFilePath);
};
var inputName = "".concat(process.argv[2]);
var analyzer = new JackAnalyzer(inputName);
analyzer.compileFiles();