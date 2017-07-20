'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _AgentTransaction = require('../models/AgentTransaction');

var _AgentTransaction2 = _interopRequireDefault(_AgentTransaction);

var _BetOrder = require('../models/BetOrder');

var _BetOrder2 = _interopRequireDefault(_BetOrder);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var OpenBet = _BetOrder2.default.OpenBet;

var router = _express2.default.Router();

router.post('/fetch-weekly-transactions', function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
		var weekNum, openBetTransactions, transactions, agentOpenBets, agentTransactions;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						weekNum = req.body.weekNum;
						openBetTransactions = [];
						transactions = [];
						_context.next = 5;
						return OpenBet.find({ agent: req.user.username, createdAt: { $gte: (0, _moment2.default)().startOf('week').subtract(weekNum, 'day').add(0, 'day').format(), $lte: (0, _moment2.default)().endOf('week').subtract(weekNum, 'day').add(0, 'day').format() } });

					case 5:
						agentOpenBets = _context.sent;

						if (!_lodash2.default.isEmpty(agentOpenBets)) {
							openBetTransactions = agentOpenBets;
						}

						_context.next = 9;
						return _AgentTransaction2.default.find({ agent: req.user.username, completedAt: { $gte: (0, _moment2.default)().startOf('week').subtract(weekNum, 'day').add(0, 'day').format(), $lte: (0, _moment2.default)().endOf('week').subtract(weekNum, 'day').add(0, 'day').format() } });

					case 9:
						agentTransactions = _context.sent;

						if (!_lodash2.default.isEmpty(agentTransactions)) {
							transactions = agentTransactions;
						}

						res.json({ openBetTransactions: openBetTransactions, transactions: transactions });

					case 12:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function (_x, _x2) {
		return _ref.apply(this, arguments);
	};
}());

exports.default = router;
//# sourceMappingURL=fetchAgentTransactions.js.map