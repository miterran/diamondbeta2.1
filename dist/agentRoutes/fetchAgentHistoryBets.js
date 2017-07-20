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

var HistoryBet = _BetOrder2.default.HistoryBet;

var router = _express2.default.Router();

router.post('/fetch-history-bets', function (req, res) {
	var weekNum = req.body.weekNum;
	HistoryBet.find({ agent: req.user.username, completedAt: { $gte: (0, _moment2.default)().startOf('week').subtract(weekNum, 'day').add(0, 'day').format(), $lte: (0, _moment2.default)().endOf('week').subtract(weekNum, 'day').add(0, 'day').format() } }, function (err, result) {
		if (err) res.status(404).send('fetch agent history bet error');
		res.json(result);
	});
});

exports.default = router;
//# sourceMappingURL=fetchAgentHistoryBets.js.map