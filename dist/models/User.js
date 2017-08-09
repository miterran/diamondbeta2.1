'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

var Schema = _mongoose2.default.Schema;

var UserSchema = _mongoose2.default.Schema({
	accountType: {
		type: String,
		default: 'user'
	},
	username: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date
	},
	accountActive: {
		type: Boolean,
		default: true
	},

	maxParlayTeam: {
		type: Number,
		default: 6
	},
	thisWeekExtraCredit: {
		type: Number,
		default: 0
	},
	weeklyStartBalance: {
		type: Number,
		default: 20000
	},

	maxWinAmount: {
		type: Number,
		default: 10000
	},

	maxWagerAmount: {
		type: Number,
		default: 10000
	},

	minRiskAmount: {
		type: Number,
		default: 50
	},

	passcode: {
		type: String,
		default: '4321',
		required: true
	},

	password: {
		type: String,
		default: '4321',
		required: true
	},

	agent: {
		type: String,
		default: 'diamond'
	},
	superAgent: {
		type: String,
		default: 'diamond'
	}
});

var User = _mongoose2.default.model('user', UserSchema);

exports.default = User;
//# sourceMappingURL=User.js.map