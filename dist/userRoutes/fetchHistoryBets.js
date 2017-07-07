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

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var HistoryBet = _BetOrder2.default.HistoryBet;

var router = _express2.default.Router();

router.get('/fetch-history-bets', function (req, res) {
	HistoryBet.find({ user: req.user.username, completedAt: { $gte: (0, _moment2.default)().startOf('week').subtract(7, 'day').utc('+07:00').format(), $lte: (0, _moment2.default)().endOf('week').utc('+07:00').format() } }, function (err, result) {
		if (err) res.status(404).send('fetch user history bet error');
		res.json(result);
	});
});

router.post('/fetch-history-summary', function (req, res) {
	var _datesData;

	var weekNum = req.body.weekNum;
	var datesData = (_datesData = {}, _defineProperty(_datesData, (0, _moment2.default)().startOf('week').subtract(weekNum, 'day').add(0, 'day').utc('+07:00').format('MMM DD'), 0), _defineProperty(_datesData, (0, _moment2.default)().startOf('week').subtract(weekNum, 'day').add(1, 'day').utc('+07:00').format('MMM DD'), 0), _defineProperty(_datesData, (0, _moment2.default)().startOf('week').subtract(weekNum, 'day').add(2, 'day').utc('+07:00').format('MMM DD'), 0), _defineProperty(_datesData, (0, _moment2.default)().startOf('week').subtract(weekNum, 'day').add(3, 'day').utc('+07:00').format('MMM DD'), 0), _defineProperty(_datesData, (0, _moment2.default)().startOf('week').subtract(weekNum, 'day').add(4, 'day').utc('+07:00').format('MMM DD'), 0), _defineProperty(_datesData, (0, _moment2.default)().startOf('week').subtract(weekNum, 'day').add(5, 'day').utc('+07:00').format('MMM DD'), 0), _defineProperty(_datesData, (0, _moment2.default)().startOf('week').subtract(weekNum, 'day').add(6, 'day').utc('+07:00').format('MMM DD'), 0), _defineProperty(_datesData, 'Total', 0), _datesData);

	HistoryBet.find({ user: req.user.username, completedAt: { $gte: (0, _moment2.default)().startOf('week').subtract(weekNum, 'day').add(0, 'day').utc('+07:00').format(), $lte: (0, _moment2.default)().endOf('week').subtract(weekNum, 'day').add(0, 'day').utc('+07:00').format() } }, function (err, weeklyHistoryResult) {
		if (err) throw err;
		if (!_lodash2.default.isEmpty(weeklyHistoryResult)) {
			weeklyHistoryResult.map(function (event, eventIdx) {
				datesData[(0, _moment2.default)(event.completedAt).format('MMM DD')] += event.orderResultAmount;
				datesData.Total += event.orderResultAmount;
			});
			res.json(datesData);
		} else {
			res.json(datesData);
		}
	});
});

exports.default = router;
//# sourceMappingURL=fetchHistoryBets.js.map