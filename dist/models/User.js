'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

var Schema = _mongoose2.default.Schema;

var UserSchema = _mongoose2.default.Schema({});

var User = _mongoose2.default.model('user', UserSchema);

exports.default = User;
//# sourceMappingURL=User.js.map