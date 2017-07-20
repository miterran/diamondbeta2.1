'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _BetOrder = require('../models/BetOrder');

var _BetOrder2 = _interopRequireDefault(_BetOrder);

var _Agent = require('../models/Agent');

var _Agent2 = _interopRequireDefault(_Agent);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var HistoryBet = _BetOrder2.default.HistoryBet;
var OpenBet = _BetOrder2.default.OpenBet;

var router = _express2.default.Router();

router.get('/fetch-agent-state', function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
		var agentCreditPending, openBetTotalRiskAmount, openBetTotalWinAmount, openBetStraight, openBetParlay, totalGamePending, openBets;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						agentCreditPending = 0;
						openBetTotalRiskAmount = 0;
						openBetTotalWinAmount = 0;
						openBetStraight = 0;
						openBetParlay = 0;
						totalGamePending = 0;
						_context.next = 8;
						return OpenBet.find({ agent: req.user.username });

					case 8:
						openBets = _context.sent;

						if (!_lodash2.default.isEmpty(openBets)) {
							openBets.map(function (openBet) {
								if (openBet.betOption === 'Straight') {
									openBetStraight++;
								}
								if (openBet.betOption === 'Parlay') {
									openBetParlay++;
								}
								totalGamePending++;
								openBetTotalWinAmount += Number(openBet.eventsWagerDetail.RiskAmount);
								openBetTotalRiskAmount += Number(openBet.eventsWagerDetail.WinAmount);

								agentCreditPending += Number(openBet.eventsWagerDetail.RiskAmount);
							});
						}

						_Agent2.default.findOneAndUpdate({ username: req.user.username }, { $set: { creditPending: agentCreditPending } }, { new: true }, function (err, result) {
							var agent = _lodash2.default.pick(result, ['accountActive', 'accountType', 'creditBalance', 'creditPending', 'passcode', 'username']);
							agent.openBetTotalRiskAmount = openBetTotalRiskAmount;
							agent.openBetTotalWinAmount = openBetTotalWinAmount;
							agent.openBetStraight = openBetStraight;
							agent.openBetParlay = openBetParlay;
							agent.totalGamePending = totalGamePending;
							res.json(agent);
						});

					case 11:
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

router.post('/fetch-weekly-summary', function (req, res) {
	var _datesData;

	var weekNum = req.body.weekNum;
	var datesData = (_datesData = {}, _defineProperty(_datesData, (0, _moment2.default)().startOf('week').subtract(weekNum, 'day').add(0, 'day').format('MMM DD'), 0), _defineProperty(_datesData, (0, _moment2.default)().startOf('week').subtract(weekNum, 'day').add(1, 'day').format('MMM DD'), 0), _defineProperty(_datesData, (0, _moment2.default)().startOf('week').subtract(weekNum, 'day').add(2, 'day').format('MMM DD'), 0), _defineProperty(_datesData, (0, _moment2.default)().startOf('week').subtract(weekNum, 'day').add(3, 'day').format('MMM DD'), 0), _defineProperty(_datesData, (0, _moment2.default)().startOf('week').subtract(weekNum, 'day').add(4, 'day').format('MMM DD'), 0), _defineProperty(_datesData, (0, _moment2.default)().startOf('week').subtract(weekNum, 'day').add(5, 'day').format('MMM DD'), 0), _defineProperty(_datesData, (0, _moment2.default)().startOf('week').subtract(weekNum, 'day').add(6, 'day').format('MMM DD'), 0), _defineProperty(_datesData, 'Total', 0), _datesData);
	HistoryBet.find({ agent: req.user.username, completedAt: { $gte: (0, _moment2.default)().startOf('week').subtract(weekNum, 'day').add(0, 'day').format(), $lte: (0, _moment2.default)().endOf('week').subtract(weekNum, 'day').add(0, 'day').format() } }, function (err, weeklyHistoryResult) {
		if (err) throw err;
		if (!_lodash2.default.isEmpty(weeklyHistoryResult)) {
			weeklyHistoryResult.map(function (event, eventIdx) {
				datesData[(0, _moment2.default)(event.completedAt).format('MMM DD')] += Number(event.orderResultAmount);
				datesData.Total += Number(event.orderResultAmount);
			});
			res.json(datesData);
		} else {
			res.json(datesData);
		}
	});
});

exports.default = router;
//# sourceMappingURL=fetchAgentState.js.map