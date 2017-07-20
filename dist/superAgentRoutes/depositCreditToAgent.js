'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _uniqid = require('uniqid');

var _uniqid2 = _interopRequireDefault(_uniqid);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Agent = require('../models/Agent');

var _Agent2 = _interopRequireDefault(_Agent);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _AgentTransaction = require('../models/AgentTransaction');

var _AgentTransaction2 = _interopRequireDefault(_AgentTransaction);

var _BetOrder = require('../models/BetOrder');

var _BetOrder2 = _interopRequireDefault(_BetOrder);

var _Deposit = require('../models/Deposit');

var _Deposit2 = _interopRequireDefault(_Deposit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = _express2.default.Router();

var HistoryBet = _BetOrder2.default.HistoryBet;
var OpenBet = _BetOrder2.default.OpenBet;

router.get('/deposit-credit-to-agent', function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
		var newDeposit;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						newDeposit = new _Deposit2.default({
							completedAt: (0, _moment2.default)(),
							orderResultAmount: 2000,
							orderNumber: _uniqid2.default.process().toUpperCase(),
							agent: 'plio517',
							superAgent: 'diamond'
						});
						_context.next = 3;
						return newDeposit.save();

					case 3:
						_context.next = 5;
						return _Agent2.default.findOneAndUpdate({ username: 'plio517' }, { $inc: { creditBalance: 2000 } }, { new: true }, function (err, agent) {
							var newTransaction = new _AgentTransaction2.default({
								superAgent: 'diamond',
								agent: newDeposit.agent,
								user: newDeposit.agent,
								completedAt: newDeposit.completedAt,
								orderNumber: newDeposit.orderNumber,
								amount: newDeposit.orderResultAmount,
								resultAmount: agent.creditBalance,
								status: 'Deposited'
							});
							newTransaction.save().then(function () {
								res.send('deposit save');
							});
						});

					case 5:
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

router.get('/recal-agent-credit', function () {
	var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res) {
		var creditBalance, creditPending, historyBets, deposits, openBets, agent;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						creditBalance = 0;
						creditPending = 0;
						_context2.next = 4;
						return HistoryBet.find({ $or: [{ agent: 'plio517', orderStatus: 'Lost' }, { agent: 'plio517', orderStatus: 'LostHalf' }] });

					case 4:
						historyBets = _context2.sent;

						if (!_lodash2.default.isEmpty(historyBets)) historyBets.map(function (historyBet) {
							return creditBalance += historyBet.orderResultAmount;
						});

						_context2.next = 8;
						return _Deposit2.default.find({ agent: 'plio517' });

					case 8:
						deposits = _context2.sent;

						if (!_lodash2.default.isEmpty(deposits)) deposits.map(function (deposit) {
							return creditBalance += deposit.orderResultAmount;
						});

						_context2.next = 12;
						return OpenBet.find({ agent: 'plio517' });

					case 12:
						openBets = _context2.sent;

						if (!_lodash2.default.isEmpty(openBets)) openBets.map(function (openBet) {
							return creditPending += openBet.eventsWagerDetail.RiskAmount;
						});

						_context2.next = 16;
						return _Agent2.default.findOneAndUpdate({ username: 'plio517' }, { $set: { creditBalance: creditBalance, creditPending: creditPending } }, { new: true });

					case 16:
						agent = _context2.sent;

						res.json(agent);

					case 18:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined);
	}));

	return function (_x3, _x4) {
		return _ref2.apply(this, arguments);
	};
}());

router.get('/recal-agent-transactions', function () {
	var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(req, res) {
		var transactions, agentCreditAmount, historyBets, deposits;
		return regeneratorRuntime.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						transactions = [];
						agentCreditAmount = 0;
						_context4.next = 4;
						return HistoryBet.find({ agent: 'plio517' });

					case 4:
						historyBets = _context4.sent;
						_context4.next = 7;
						return _Deposit2.default.find({ agent: 'plio517' });

					case 7:
						deposits = _context4.sent;


						transactions = historyBets.concat(deposits);

						transactions.sort(function (a, b) {
							return new Date(a.completedAt) - new Date(b.completedAt);
						});

						_context4.next = 12;
						return Promise.all(transactions.map(function () {
							var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(transaction) {
								var result, newTransaction;
								return regeneratorRuntime.wrap(function _callee3$(_context3) {
									while (1) {
										switch (_context3.prev = _context3.next) {
											case 0:
												if (transaction.orderStatus === 'Lost' || transaction.orderStatus === 'LostHalf' || transaction.orderStatus === 'Deposited') {
													agentCreditAmount += transaction.orderResultAmount;
												} else {
													agentCreditAmount += 0;
												}
												_context3.next = 3;
												return _AgentTransaction2.default.findOneAndUpdate({ orderNumber: transaction.orderNumber }, { $set: { amount: transaction.orderResultAmount, resultAmount: agentCreditAmount } }, { new: true });

											case 3:
												result = _context3.sent;

												if (result) {
													_context3.next = 8;
													break;
												}

												newTransaction = new _AgentTransaction2.default({
													superAgent: 'diamond',
													agent: transaction.agent,
													user: transaction.user || transaction.agent,
													completedAt: transaction.completedAt,
													orderNumber: transaction.orderNumber,
													amount: transaction.orderResultAmount,
													resultAmount: agentCreditAmount,
													status: transaction.orderStatus
												});
												_context3.next = 8;
												return newTransaction.save();

											case 8:
											case 'end':
												return _context3.stop();
										}
									}
								}, _callee3, this);
							}));

							return function (_x7) {
								return _ref4.apply(this, arguments);
							};
						}())).then(function () {
							res.json('done');
						});

					case 12:
					case 'end':
						return _context4.stop();
				}
			}
		}, _callee4, undefined);
	}));

	return function (_x5, _x6) {
		return _ref3.apply(this, arguments);
	};
}());

exports.default = router;
//# sourceMappingURL=depositCreditToAgent.js.map