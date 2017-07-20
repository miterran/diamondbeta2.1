'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

var Schema = _mongoose2.default.Schema;

var DepositSchema = _mongoose2.default.Schema({
	superAgent: {
		type: String,
		required: true
	},
	agent: {
		type: String,
		required: true
	},
	completedAt: {
		type: Date,
		required: true
	},
	orderResultAmount: {
		type: Number,
		required: true
	},
	orderNumber: {
		type: String,
		required: true
	},
	orderStatus: {
		type: String,
		default: 'Deposited'
	}
});

var Deposit = _mongoose2.default.model('deposit', DepositSchema);

exports.default = Deposit;
//# sourceMappingURL=Deposit.js.map