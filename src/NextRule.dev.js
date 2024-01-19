"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var NextRule =
/*#__PURE__*/
function () {
  function NextRule(textCode) {
    _classCallCheck(this, NextRule);

    this.textCode = textCode;
    this.lastIndex = 0;
  }

  _createClass(NextRule, [{
    key: "next",
    value: function next(rule) {
      rule.lastIndex = this.lastIndex;
      var result = rule.exec(this.textCode);
      if (!result) return null;
      this.lastIndex = rule.lastIndex;
      console.log(result);
      return result[0];
    }
  }, {
    key: "nextIf",
    value: function nextIf() {
      var result;

      for (var _len = arguments.length, rules = new Array(_len), _key = 0; _key < _len; _key++) {
        rules[_key] = arguments[_key];
      }

      for (var _i = 0, _rules = rules; _i < _rules.length; _i++) {
        var _rules$_i = _rules[_i],
            rule = _rules$_i.rule,
            func = _rules$_i.func;
        rule.lastIndex = this.lastIndex;
        result = rule.exec(this.textCode);
        if (!result) continue;
        this.lastIndex = rule.lastIndex;
        func(result[0]);
        break;
      }

      return result[0];
    }
  }]);

  return NextRule;
}();

var Store =
/*#__PURE__*/
function () {
  function Store() {
    _classCallCheck(this, Store);
  }

  _createClass(Store, null, [{
    key: "get",
    value: function get(key) {
      return JSON.parse(localStorage.getItem(key));
    }
  }, {
    key: "set",
    value: function set(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }]);

  return Store;
}();