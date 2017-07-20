'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

var Schema = _mongoose2.default.Schema;

var AgentTransactionSchema = _mongoose2.default.Schema({
	superAgent: {
		type: String,
		required: true
	},
	agent: {
		type: String
	},
	user: {
		type: String
	},
	completedAt: {
		type: Date,
		required: true
	},
	description: {
		type: String
	},
	orderNumber: {
		type: String,
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	resultAmount: {
		type: Number,
		required: true
	},
	status: {
		type: String,
		required: true
	}
});

var AgentTransaction = _mongoose2.default.model('transaction', AgentTransactionSchema);

exports.default = AgentTransaction;
//# sourceMappingURL=AgentTransaction.js.map