"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var VMWriter = /*#__PURE__*/function () {
  function VMWriter(writeStream) {
    _classCallCheck(this, VMWriter);
    this.writeStream = writeStream;
  }
  /* Writes a VM push command */
  _createClass(VMWriter, [{
    key: "writePush",
    value: function writePush(pushObject) {
      var segment = pushObject.segment,
        number = pushObject.number;
      if (segment && typeof number === 'number') {
        this.writeStream.write("push ".concat(segment, " ").concat(number, "\n"));
      } else if (typeof number === 'number') {
        this.writeStream.write("push ".concat(number, "\n"));
      } else {
        this.writeStream.write("push ".concat(segment, "\n"));
      }
    }
    /* Writes a VM pop command */
  }, {
    key: "writePop",
    value: function writePop(popObject) {
      var segment = popObject.segment,
        number = popObject.number;
      this.writeStream.write("pop ".concat(segment, " ").concat(number, "\n"));
    }
    /* Writes a VM arithmetic-logical command */
  }, {
    key: "writeArithmetic",
    value: function writeArithmetic(command) {
      this.writeStream.write("".concat(command, "\n"));
    }
    /* Writes a VM label command */
  }, {
    key: "writeLabel",
    value: function writeLabel(label) {
      this.writeStream.write("label ".concat(label, "\n"));
    }
    /* Writes a VM goto command */
  }, {
    key: "writeGoTo",
    value: function writeGoTo(label) {
      this.writeStream.write("goto ".concat(label, "\n"));
    }
    /* Writes a VM if-goto command */
  }, {
    key: "writeIf",
    value: function writeIf(label) {
      this.writeStream.write("if-goto ".concat(label, "\n"));
    }
    /* Writes a VM call command */
  }, {
    key: "writeCall",
    value: function writeCall(callObject) {
      this.writeStream.write("call ".concat(callObject.segment, " ").concat(callObject.number, "\n"));
    }
    /* Writes a VM function command */
  }, {
    key: "writeFunction",
    value: function writeFunction(name, nArgs) {
      this.writeStream.write("function ".concat(name, " ").concat(nArgs, "\n"));
    }
    /* Writes a VM return command */
  }, {
    key: "writeReturn",
    value: function writeReturn() {
      this.writeStream.write("return\n");
    }
    /* Closes the output file / stream */
  }, {
    key: "close",
    value: function close() {
      this.writeStream.close();
    }
  }]);
  return VMWriter;
}();
exports["default"] = VMWriter;