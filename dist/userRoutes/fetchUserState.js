'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _BetOrder = require('../models/BetOrder');

var _BetOrder2 = _interopRequireDefault(_BetOrder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var OpenBet = _BetOrder2.default.OpenBet;
var HistoryBet = _BetOrder2.default.HistoryBet;
var router = _express2.default.Router();

router.get('/fetch-user-state', function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
		var thisWeekBalance, openBetTotalRiskAmount, openBetTotalWinAmount, openBetStraight, openBetParlay, totalGamePending, thisWeekHistoryBets, openBets;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						thisWeekBalance = 0;
						openBetTotalRiskAmount = 0;
						openBetTotalWinAmount = 0;
						openBetStraight = 0;
						openBetParlay = 0;
						totalGamePending = 0;
						_context.next = 8;
						return HistoryBet.find({ user: req.user.username, createdAt: { $gte: (0, _moment2.default)().startOf('week'), $lte: (0, _moment2.default)().endOf('week') } });

					case 8:
						thisWeekHistoryBets = _context.sent;

						console.log('get user state history');
						if (!_lodash2.default.isEmpty(thisWeekHistoryBets)) {
							thisWeekHistoryBets.map(function (historyBet) {
								thisWeekBalance += Number(historyBet.orderResultAmount);
							});
						}

						_context.next = 13;
						return OpenBet.find({ user: req.user.username });

					case 13:
						openBets = _context.sent;

						console.log('get user state openbet');
						if (!_lodash2.default.isEmpty(openBets)) {
							openBets.map(function (openBet) {
								if (openBet.betOption === 'Straight') {
									openBetStraight++;
								}
								if (openBet.betOption === 'Parlay') {
									openBetParlay++;
								}
								totalGamePending++;
								openBetTotalRiskAmount += Number(openBet.eventsWagerDetail.RiskAmount);
								openBetTotalWinAmount += Number(openBet.eventsWagerDetail.WinAmount);
							});
						}

						_User2.default.findOne({ username: req.user.username }, 'accountType username accountActive thisWeekExtraCredit weeklyStartBalance maxWinAmount maxWagerAmount minRiskAmount passcode maxParlayTeam', function (err, result) {
							console.log('send all');
							var userState = {
								accountType: result.accountType,
								username: result.username,
								accountActive: result.accountActive,
								thisWeekExtraCredit: result.thisWeekExtraCredit,
								weeklyStartBalance: result.weeklyStartBalance,
								maxWinAmount: result.maxWinAmount,
								maxWagerAmount: result.maxWagerAmount,
								minRiskAmount: result.minRiskAmount,
								passcode: result.passcode,
								currentBalance: thisWeekBalance,
								pendingCredit: openBetTotalRiskAmount,
								maxParlayTeam: result.maxParlayTeam,
								availableCredit: Number(result.weeklyStartBalance) + Number(result.thisWeekExtraCredit) + Number(thisWeekBalance) - Number(openBetTotalRiskAmount),
								openBetStraight: openBetStraight,
								openBetParlay: openBetParlay,
								totalGamePending: totalGamePending,
								openBetTotalRiskAmount: openBetTotalRiskAmount,
								openBetTotalWinAmount: openBetTotalWinAmount

							};
							res.json(userState);
						});

					case 17:
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
//# sourceMappingURL=fetchUserState.js.map