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
var SymbolTable = /*#__PURE__*/function () {
  /* Creates a new symbol table */
  function SymbolTable() {
    _classCallCheck(this, SymbolTable);
    this.indexCounter = {
      STATIC: 0,
      FIELD: 0,
      ARG: 0,
      VAR: 0
    };
    this.table = {};
  }
  /* Defines a new variable, adds it to the table and increments the index for that kind */
  _createClass(SymbolTable, [{
    key: "define",
    value: function define(_ref) {
      var name = _ref.name,
        type = _ref.type,
        kind = _ref.kind;
      var index = this.indexCounter[kind];
      this.table[name] = {
        type: type,
        kind: kind,
        index: index
      };
      this.indexCounter[kind] += 1;
    }
    /* Returns the index of the named variable */
  }, {
    key: "indexOf",
    value: function indexOf(name) {
      var _this$table$name;
      return (_this$table$name = this.table[name]) === null || _this$table$name === void 0 ? void 0 : _this$table$name.index;
    }
    /* Returns the kind of the named identifier.
     *
     * @param  name     name of the kind of symbol
     * @return string   STATIC, FIELD, ARG, VAR or NONE
     */
  }, {
    key: "kindOf",
    value: function kindOf(name) {
      var _this$table$name2;
      return ((_this$table$name2 = this.table[name]) === null || _this$table$name2 === void 0 ? void 0 : _this$table$name2.kind) || 'NONE';
    }
    /* Empties symbol table and resets indexes to zero */
  }, {
    key: "reset",
    value: function reset() {
      var _this = this;
      Object.keys(this.indexCounter).forEach(function (index) {
        return _this.indexCounter[index] = 0;
      });
    }
    /* Returns the type of the named variable */
  }, {
    key: "typeOf",
    value: function typeOf(name) {
      var _this$table$name3;
      return ((_this$table$name3 = this.table[name]) === null || _this$table$name3 === void 0 ? void 0 : _this$table$name3.type) || 'NONE';
    }
    /* Returns the number of variables of the given kind defined in the table */
  }, {
    key: "varCount",
    value: function varCount(kind) {
      return this.indexCounter[kind];
    }
  }]);
  return SymbolTable;
}();
exports["default"] = SymbolTable;