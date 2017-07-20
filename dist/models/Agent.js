'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

var Schema = _mongoose2.default.Schema;

var AgentSchema = _mongoose2.default.Schema({
	accountType: {
		type: String,
		default: 'agent'
	},
	superAgent: {
		type: String,
		default: 'diamond'
	},
	username: {
		type: String,
		required: true
	},
	userList: {
		type: Array
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
	accountActive: {
		type: Boolean,
		default: true
	},
	creditBalance: {
		type: Number,
		default: 0
	},
	creditPending: {
		type: Number,
		default: 0
	},
	createdAt: {
		type: Date
	}
});

var Agent = _mongoose2.default.model('agent', AgentSchema);

exports.default = Agent;
//# sourceMappingURL=Agent.js.map