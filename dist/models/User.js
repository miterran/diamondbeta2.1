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
		required: true
	},
	superAgent: {
		type: String,
		default: 'diamond',
		required: true
	},
	agent: {
		type: String,
		default: 'diamond',
		required: true
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		default: '1234',
		required: true
	},
	passcode: {
		type: String,
		default: '4321',
		required: true
	},
	email: {
		type: String
	},
	phoneNumber: {
		type: String
	},
	minRiskAmount: {
		type: Number,
		default: 50,
		required: true
	},
	maxWagerAmount: {
		type: Number,
		default: 500,
		required: true
	},
	maxWinAmount: {
		type: Number,
		default: 5000,
		required: true
	},
	weeklyStartBalance: {
		type: Number,
		default: 5000,
		required: true
	},
	thisWeekExtraCredit: {
		type: Number,
		default: 0
	},
	maxParlayTeam: {
		type: Number,
		default: 6
	},
	accountActive: {
		type: Boolean,
		default: true,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

var User = _mongoose2.default.model('user', UserSchema);

exports.default = User;
//# sourceMappingURL=User.js.map