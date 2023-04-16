"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _fs = require("fs");
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { _classCheckPrivateStaticAccess(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor(descriptor, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classCheckPrivateStaticFieldDescriptor(descriptor, action) { if (descriptor === undefined) { throw new TypeError("attempted to " + action + " private static field before its declaration"); } }
function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
var _outputFile = /*#__PURE__*/new WeakMap();
var _staticFileName = /*#__PURE__*/new WeakMap();
var _comparisonJumps = /*#__PURE__*/new WeakMap();
var _createOutputFile = /*#__PURE__*/new WeakSet();
var _writeInitializePointers = /*#__PURE__*/new WeakSet();
var _writeArithmeticTopTwoElements = /*#__PURE__*/new WeakSet();
var _writeNegateTopElement = /*#__PURE__*/new WeakSet();
var _writeBitwiseNotTopElement = /*#__PURE__*/new WeakSet();
var _writeLogicTopTwoElements = /*#__PURE__*/new WeakSet();
var _writeComparisonPrivate = /*#__PURE__*/new WeakSet();
var _writePopPointer = /*#__PURE__*/new WeakSet();
var _writePopTemp = /*#__PURE__*/new WeakSet();
var _writePushTemp = /*#__PURE__*/new WeakSet();
var _writePopSegment = /*#__PURE__*/new WeakSet();
var _writePushConstant = /*#__PURE__*/new WeakSet();
var _writePushPointer = /*#__PURE__*/new WeakSet();
var _writePushSegment = /*#__PURE__*/new WeakSet();
var _writePopStatic = /*#__PURE__*/new WeakSet();
var _writePushStatic = /*#__PURE__*/new WeakSet();
var _setStaticVariable = /*#__PURE__*/new WeakSet();
var CodeWriter = /*#__PURE__*/function () {
  // LCL, ARG, THIS, THAT Later

  function CodeWriter(_outputFilePath) {
    _classCallCheck(this, CodeWriter);
    _classPrivateMethodInitSpec(this, _setStaticVariable);
    _classPrivateMethodInitSpec(this, _writePushStatic);
    _classPrivateMethodInitSpec(this, _writePopStatic);
    _classPrivateMethodInitSpec(this, _writePushSegment);
    _classPrivateMethodInitSpec(this, _writePushPointer);
    _classPrivateMethodInitSpec(this, _writePushConstant);
    _classPrivateMethodInitSpec(this, _writePopSegment);
    _classPrivateMethodInitSpec(this, _writePushTemp);
    _classPrivateMethodInitSpec(this, _writePopTemp);
    _classPrivateMethodInitSpec(this, _writePopPointer);
    _classPrivateMethodInitSpec(this, _writeComparisonPrivate);
    _classPrivateMethodInitSpec(this, _writeLogicTopTwoElements);
    _classPrivateMethodInitSpec(this, _writeBitwiseNotTopElement);
    _classPrivateMethodInitSpec(this, _writeNegateTopElement);
    _classPrivateMethodInitSpec(this, _writeArithmeticTopTwoElements);
    _classPrivateMethodInitSpec(this, _writeInitializePointers);
    _classPrivateMethodInitSpec(this, _createOutputFile);
    _classPrivateFieldInitSpec(this, _outputFile, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _staticFileName, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _comparisonJumps, {
      writable: true,
      value: 0
    });
    _classPrivateMethodGet(this, _createOutputFile, _createOutputFile2).call(this, _outputFilePath);
    _classPrivateMethodGet(this, _setStaticVariable, _setStaticVariable2).call(this, _outputFilePath);
  }
  _createClass(CodeWriter, [{
    key: "writeArithmetic",
    value: function () {
      var _writeArithmetic = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(command) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!(command === 'neg')) {
                _context.next = 4;
                break;
              }
              _context.next = 3;
              return _classPrivateMethodGet(this, _writeNegateTopElement, _writeNegateTopElement2).call(this);
            case 3:
              return _context.abrupt("return");
            case 4:
              _context.next = 6;
              return _classPrivateMethodGet(this, _writeArithmeticTopTwoElements, _writeArithmeticTopTwoElements2).call(this, command);
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function writeArithmetic(_x) {
        return _writeArithmetic.apply(this, arguments);
      }
      return writeArithmetic;
    }()
  }, {
    key: "writeComparison",
    value: function () {
      var _writeComparison = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(command) {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _classPrivateMethodGet(this, _writeComparisonPrivate, _writeComparisonPrivate2).call(this, command);
            case 2:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function writeComparison(_x2) {
        return _writeComparison.apply(this, arguments);
      }
      return writeComparison;
    }()
  }, {
    key: "writeLogic",
    value: function () {
      var _writeLogic = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(command) {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (!(command === 'not')) {
                _context3.next = 4;
                break;
              }
              _context3.next = 3;
              return _classPrivateMethodGet(this, _writeBitwiseNotTopElement, _writeBitwiseNotTopElement2).call(this, command);
            case 3:
              return _context3.abrupt("return");
            case 4:
              _context3.next = 6;
              return _classPrivateMethodGet(this, _writeLogicTopTwoElements, _writeLogicTopTwoElements2).call(this, command);
            case 6:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function writeLogic(_x3) {
        return _writeLogic.apply(this, arguments);
      }
      return writeLogic;
    }()
  }, {
    key: "writePushPop",
    value: function () {
      var _writePushPop = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(_ref) {
        var command, segment, index, numberIndex, variable;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              command = _ref.command, segment = _ref.segment, index = _ref.index;
              numberIndex = Number(index);
              _context4.next = 4;
              return _classPrivateFieldGet(this, _outputFile).write("// ".concat(command, " ").concat(segment, " ").concat(index, "\n"));
            case 4:
              if (!(segment === 'constant')) {
                _context4.next = 8;
                break;
              }
              _context4.next = 7;
              return _classPrivateMethodGet(this, _writePushConstant, _writePushConstant2).call(this, index);
            case 7:
              return _context4.abrupt("return");
            case 8:
              if (!(command === 'push' && segment === 'temp')) {
                _context4.next = 12;
                break;
              }
              _context4.next = 11;
              return _classPrivateMethodGet(this, _writePushTemp, _writePushTemp2).call(this, numberIndex);
            case 11:
              return _context4.abrupt("return");
            case 12:
              if (!(command === 'pop' && segment === 'temp')) {
                _context4.next = 16;
                break;
              }
              _context4.next = 15;
              return _classPrivateMethodGet(this, _writePopTemp, _writePopTemp2).call(this, numberIndex);
            case 15:
              return _context4.abrupt("return");
            case 16:
              if (!(command === 'push' && segment === 'pointer')) {
                _context4.next = 20;
                break;
              }
              _context4.next = 19;
              return _classPrivateMethodGet(this, _writePushPointer, _writePushPointer2).call(this, index);
            case 19:
              return _context4.abrupt("return");
            case 20:
              if (!(command === 'pop' && segment === 'pointer')) {
                _context4.next = 25;
                break;
              }
              variable = index === '0' ? 'THIS' : 'THAT';
              _context4.next = 24;
              return _classPrivateMethodGet(this, _writePopPointer, _writePopPointer2).call(this, variable);
            case 24:
              return _context4.abrupt("return");
            case 25:
              if (!(command === 'pop' && segment === 'static')) {
                _context4.next = 29;
                break;
              }
              _context4.next = 28;
              return _classPrivateMethodGet(this, _writePopStatic, _writePopStatic2).call(this, numberIndex);
            case 28:
              return _context4.abrupt("return");
            case 29:
              if (!(command === 'push' && segment === 'static')) {
                _context4.next = 33;
                break;
              }
              _context4.next = 32;
              return _classPrivateMethodGet(this, _writePushStatic, _writePushStatic2).call(this, numberIndex);
            case 32:
              return _context4.abrupt("return");
            case 33:
              if (!(command === 'push')) {
                _context4.next = 37;
                break;
              }
              _context4.next = 36;
              return _classPrivateMethodGet(this, _writePushSegment, _writePushSegment2).call(this, {
                index: index,
                segment: segment
              });
            case 36:
              return _context4.abrupt("return");
            case 37:
              if (!(command === 'pop')) {
                _context4.next = 40;
                break;
              }
              _context4.next = 40;
              return _classPrivateMethodGet(this, _writePopSegment, _writePopSegment2).call(this, {
                segment: segment,
                index: numberIndex
              });
            case 40:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function writePushPop(_x4) {
        return _writePushPop.apply(this, arguments);
      }
      return writePushPop;
    }()
  }, {
    key: "close",
    value: function () {
      var _close = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var _classPrivateFieldGet2;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return (_classPrivateFieldGet2 = _classPrivateFieldGet(this, _outputFile)) === null || _classPrivateFieldGet2 === void 0 ? void 0 : _classPrivateFieldGet2.end();
            case 2:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function close() {
        return _close.apply(this, arguments);
      }
      return close;
    }()
  }]);
  return CodeWriter;
}();
exports["default"] = CodeWriter;
function _createOutputFile2(_x5) {
  return _createOutputFile3.apply(this, arguments);
}
function _createOutputFile3() {
  _createOutputFile3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(outputFilePath) {
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _classPrivateFieldSet(this, _outputFile, (0, _fs.createWriteStream)(outputFilePath));
        case 1:
        case "end":
          return _context6.stop();
      }
    }, _callee6, this);
  }));
  return _createOutputFile3.apply(this, arguments);
}
function _writeInitializePointers2() {
  return _writeInitializePointers3.apply(this, arguments);
}
function _writeInitializePointers3() {
  _writeInitializePointers3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return _classPrivateFieldGet(this, _outputFile).write("// initializing @SP to 256\n@256\nD=A\n@SP\nM=D\n// initializing @LCL to 300\n@300\nD=A\n@LCL\nM=D\n// initializing @ARG to 400\n@400\nD=A\n@ARG\nM=D\n// initializing @THIS to 3000\n@3000\nD=A\n@THIS\nM=D\n// initializing @THAT to 3010 \n@3010\nD=A\n@THAT\nM=D\n");
        case 2:
        case "end":
          return _context7.stop();
      }
    }, _callee7, this);
  }));
  return _writeInitializePointers3.apply(this, arguments);
}
function _writeArithmeticTopTwoElements2(_x6) {
  return _writeArithmeticTopTwoElements3.apply(this, arguments);
}
function _writeArithmeticTopTwoElements3() {
  _writeArithmeticTopTwoElements3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(command) {
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return _classPrivateFieldGet(this, _outputFile).write("// ".concat(command, "\n@SP \nM=M-1 \nA=M \nD=M \n@SP \nM=M-1 \nA=M\n").concat(command === 'add' ? 'D=M+D' : 'D=M-D', "\n@SP\nA=M\nM=D\n@SP\nM=M+1\n"));
        case 2:
        case "end":
          return _context8.stop();
      }
    }, _callee8, this);
  }));
  return _writeArithmeticTopTwoElements3.apply(this, arguments);
}
function _writeNegateTopElement2() {
  return _writeNegateTopElement3.apply(this, arguments);
}
function _writeNegateTopElement3() {
  _writeNegateTopElement3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return _classPrivateFieldGet(this, _outputFile).write("// neg\n@SP\nM=M-1\nA=M\nM=-M\n@SP\nM=M+1\n");
        case 2:
        case "end":
          return _context9.stop();
      }
    }, _callee9, this);
  }));
  return _writeNegateTopElement3.apply(this, arguments);
}
function _writeBitwiseNotTopElement2() {
  return _writeBitwiseNotTopElement3.apply(this, arguments);
}
function _writeBitwiseNotTopElement3() {
  _writeBitwiseNotTopElement3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return _classPrivateFieldGet(this, _outputFile).write("// not\n@SP\nM=M-1\nA=M\nD=M\nD=!D\nM=D\n@SP\nM=M+1\n");
        case 2:
        case "end":
          return _context10.stop();
      }
    }, _callee10, this);
  }));
  return _writeBitwiseNotTopElement3.apply(this, arguments);
}
function _writeLogicTopTwoElements2(_x7) {
  return _writeLogicTopTwoElements3.apply(this, arguments);
}
function _writeLogicTopTwoElements3() {
  _writeLogicTopTwoElements3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(command) {
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return _classPrivateFieldGet(this, _outputFile).write("// ".concat(command, "\n@SP\nM=M-1\nA=M\nD=M\n@SP\nM=M-1\nA=M\nA=M\nD=A").concat(command === 'and' ? '&' : '|', "D\n@SP\nA=M\nM=D\n@SP\nM=M+1\n"));
        case 2:
        case "end":
          return _context11.stop();
      }
    }, _callee11, this);
  }));
  return _writeLogicTopTwoElements3.apply(this, arguments);
}
function _writeComparisonPrivate2(_x8) {
  return _writeComparisonPrivate3.apply(this, arguments);
}
function _writeComparisonPrivate3() {
  _writeComparisonPrivate3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(command) {
    var jumpCondition;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          if (command === 'lt') {
            jumpCondition = 'JLT';
          } else if (command === 'eq') {
            jumpCondition = 'JEQ';
          } else {
            jumpCondition = 'JGT';
          }
          _context12.next = 3;
          return _classPrivateFieldGet(this, _outputFile).write("@SP\nAM=M-1\nD=M\n@SP\nAM=M-1\nA=M\nD=A-D\n@TRUE".concat(_classPrivateFieldGet(this, _comparisonJumps), "\nD;").concat(jumpCondition, "\n@FALSE").concat(_classPrivateFieldGet(this, _comparisonJumps), "\n0;JMP\n\n(TRUE").concat(_classPrivateFieldGet(this, _comparisonJumps), ")\n  @0\n  D=A\n  @1\n  D=D-A\n  @SP\n  A=M\n  M=D\n  @END_COMPARISON").concat(_classPrivateFieldGet(this, _comparisonJumps), "\n  0;JMP\n\n(FALSE").concat(_classPrivateFieldGet(this, _comparisonJumps), ")\n  @SP\n  A=M\n  M=0\n\n(END_COMPARISON").concat(_classPrivateFieldGet(this, _comparisonJumps), ")\n  @SP\n  M=M+1 \n"));
        case 3:
          _classPrivateFieldSet(this, _comparisonJumps, _classPrivateFieldGet(this, _comparisonJumps) + 1);
        case 4:
        case "end":
          return _context12.stop();
      }
    }, _callee12, this);
  }));
  return _writeComparisonPrivate3.apply(this, arguments);
}
function _writePopPointer2(_x9) {
  return _writePopPointer3.apply(this, arguments);
}
function _writePopPointer3() {
  _writePopPointer3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(variable) {
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return _classPrivateFieldGet(this, _outputFile).write("@SP\nM=M-1\nA=M\nD=M\n@".concat(variable, "\nM=D\n"));
        case 2:
        case "end":
          return _context13.stop();
      }
    }, _callee13, this);
  }));
  return _writePopPointer3.apply(this, arguments);
}
function _writePopTemp2(_x10) {
  return _writePopTemp3.apply(this, arguments);
}
function _writePopTemp3() {
  _writePopTemp3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(index) {
    var tempAddress;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          tempAddress = 5 + index;
          _context14.next = 3;
          return _classPrivateFieldGet(this, _outputFile).write("@SP\nM=M-1\nA=M\nD=M\n@".concat(tempAddress, "\nM=D\n"));
        case 3:
        case "end":
          return _context14.stop();
      }
    }, _callee14, this);
  }));
  return _writePopTemp3.apply(this, arguments);
}
function _writePushTemp2(_x11) {
  return _writePushTemp3.apply(this, arguments);
}
function _writePushTemp3() {
  _writePushTemp3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(index) {
    var tempAddress;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          tempAddress = 5 + index;
          _context15.next = 3;
          return _classPrivateFieldGet(this, _outputFile).write("@".concat(tempAddress, "\nD=M\n@SP\nA=M\nM=D\n@SP\nM=M+1\n"));
        case 3:
        case "end":
          return _context15.stop();
      }
    }, _callee15, this);
  }));
  return _writePushTemp3.apply(this, arguments);
}
function _writePopSegment2(_x12) {
  return _writePopSegment3.apply(this, arguments);
}
function _writePopSegment3() {
  _writePopSegment3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(_ref2) {
    var index, segment, segmentSymbol;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          index = _ref2.index, segment = _ref2.segment;
          segmentSymbol = _classStaticPrivateFieldSpecGet(CodeWriter, CodeWriter, _segmentSymbols)[segment];
          _context16.next = 4;
          return _classPrivateFieldGet(this, _outputFile).write("@".concat(segmentSymbol, "\nA=M\nD=A\n@").concat(index, "\nD=D+A \n@SP\nM=M-1\nA=M\nA=M \nD=D+A \nA=D-A \nD=D-A \nM=D\n"));
        case 4:
        case "end":
          return _context16.stop();
      }
    }, _callee16, this);
  }));
  return _writePopSegment3.apply(this, arguments);
}
function _writePushConstant2(_x13) {
  return _writePushConstant3.apply(this, arguments);
}
function _writePushConstant3() {
  _writePushConstant3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(index) {
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          _context17.next = 2;
          return _classPrivateFieldGet(this, _outputFile).write("@".concat(index, "\nD=A\n@SP\nA=M\nM=D\n@SP\nM=M+1\n"));
        case 2:
        case "end":
          return _context17.stop();
      }
    }, _callee17, this);
  }));
  return _writePushConstant3.apply(this, arguments);
}
function _writePushPointer2(_x14) {
  return _writePushPointer3.apply(this, arguments);
}
function _writePushPointer3() {
  _writePushPointer3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(index) {
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          _context18.next = 2;
          return _classPrivateFieldGet(this, _outputFile).write("@".concat(index === '0' ? 'THIS' : 'THAT', "\nD=M\n@SP\nA=M\nM=D\n@SP\nM=M+1\n"));
        case 2:
        case "end":
          return _context18.stop();
      }
    }, _callee18, this);
  }));
  return _writePushPointer3.apply(this, arguments);
}
function _writePushSegment2(_x15) {
  return _writePushSegment3.apply(this, arguments);
}
function _writePushSegment3() {
  _writePushSegment3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(_ref3) {
    var index, segment;
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          index = _ref3.index, segment = _ref3.segment;
          _context19.next = 3;
          return _classPrivateFieldGet(this, _outputFile).write("@".concat(index, "\nD=A\n@").concat(_classStaticPrivateFieldSpecGet(CodeWriter, CodeWriter, _segmentSymbols)[segment], "\nA=M\nA=A+D\nD=M\n@SP\nA=M\nM=D\n@SP\nM=M+1\n"));
        case 3:
        case "end":
          return _context19.stop();
      }
    }, _callee19, this);
  }));
  return _writePushSegment3.apply(this, arguments);
}
function _writePopStatic2(_x16) {
  return _writePopStatic3.apply(this, arguments);
}
function _writePopStatic3() {
  _writePopStatic3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(index) {
    return _regeneratorRuntime().wrap(function _callee20$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          _context20.next = 2;
          return _classPrivateFieldGet(this, _outputFile).write("@SP\nM=M-1\nA=M\nD=M\n@".concat(_classPrivateFieldGet(this, _staticFileName), ".").concat(index, "\nM=D\n"));
        case 2:
        case "end":
          return _context20.stop();
      }
    }, _callee20, this);
  }));
  return _writePopStatic3.apply(this, arguments);
}
function _writePushStatic2(_x17) {
  return _writePushStatic3.apply(this, arguments);
}
function _writePushStatic3() {
  _writePushStatic3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21(index) {
    return _regeneratorRuntime().wrap(function _callee21$(_context21) {
      while (1) switch (_context21.prev = _context21.next) {
        case 0:
          _context21.next = 2;
          return _classPrivateFieldGet(this, _outputFile).write("@".concat(_classPrivateFieldGet(this, _staticFileName), ".").concat(index, "\nD=M\n@SP\nA=M\nM=D\n@SP\nM=M+1\n"));
        case 2:
        case "end":
          return _context21.stop();
      }
    }, _callee21, this);
  }));
  return _writePushStatic3.apply(this, arguments);
}
function _setStaticVariable2(outputFilePath) {
  var pathArray = outputFilePath.split('/');
  _classPrivateFieldSet(this, _staticFileName, pathArray[pathArray.length - 1].split('.')[0]);
}
var _segmentSymbols = {
  writable: true,
  value: {
    argument: 'ARG',
    local: 'LCL',
    temp: 'TEMP',
    "this": 'THIS',
    that: 'THAT'
  }
};