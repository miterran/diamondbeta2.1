'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _Agent = require('../models/Agent');

var _Agent2 = _interopRequireDefault(_Agent);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportJwt = require('passport-jwt');

var _passportJwt2 = _interopRequireDefault(_passportJwt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ExtractJwt = _passportJwt2.default.ExtractJwt;
var JwtStrategy = _passportJwt2.default.Strategy;

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = _config2.default.jwtSecret;

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
	switch (jwt_payload.accountType) {
		case 'user':
			_User2.default.findOne({ username: jwt_payload.username }, function (err, user) {
				if (user) {
					next(null, user);
				} else {
					next(null, false);
				}
			});
			break;
		case 'agent':
			_Agent2.default.findOne({ username: jwt_payload.username }, function (err, agent) {
				if (agent) {
					next(null, agent);
				} else {
					next(null, false);
				}
			});
			break;
		default:
			next(null, false);
			return;
	}
});

exports.default = strategy;
//# sourceMappingURL=jwtStrategy.js.map