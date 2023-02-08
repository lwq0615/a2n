"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Body", {
  enumerable: true,
  get: function get() {
    return _ParamType.Body;
  }
});
Object.defineProperty(exports, "Controll", {
  enumerable: true,
  get: function get() {
    return _Controll["default"];
  }
});
Object.defineProperty(exports, "Delete", {
  enumerable: true,
  get: function get() {
    return _RequestMethod.Delete;
  }
});
Object.defineProperty(exports, "Get", {
  enumerable: true,
  get: function get() {
    return _RequestMethod.Get;
  }
});
Object.defineProperty(exports, "Post", {
  enumerable: true,
  get: function get() {
    return _RequestMethod.Post;
  }
});
Object.defineProperty(exports, "Put", {
  enumerable: true,
  get: function get() {
    return _RequestMethod.Put;
  }
});
Object.defineProperty(exports, "Query", {
  enumerable: true,
  get: function get() {
    return _ParamType.Query;
  }
});
Object.defineProperty(exports, "RequestMapping", {
  enumerable: true,
  get: function get() {
    return _RequestMethod.RequestMapping;
  }
});
exports["default"] = void 0;
Object.defineProperty(exports, "start", {
  enumerable: true,
  get: function get() {
    return _start["default"];
  }
});
var _start = _interopRequireDefault(require("./core/start"));
var _RequestMethod = require("./decorators/RequestMethod");
var _ParamType = require("./decorators/ParamType");
var _Controll = _interopRequireDefault(require("./decorators/Controll"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = _start["default"];
exports["default"] = _default;