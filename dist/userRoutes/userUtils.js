'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _BetOrder = require('../models/BetOrder');

var _BetOrder2 = _interopRequireDefault(_BetOrder);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OpenBet = _BetOrder2.default.OpenBet;
var HistoryBet = _BetOrder2.default.HistoryBet;

var router = _express2.default.Router();

router.post('/utils-fetch-single-bet', function (req, res) {
	if (req.body.status === 'Pending') {
		OpenBet.find({ user: req.user.username, orderNumber: req.body.orderNumber }, function (err, result) {
			if (err) res.status(404).send('fetch user single open bet error');
			res.json(result[0]);
		});
	} else {
		HistoryBet.find({ user: req.user.username, orderNumber: req.body.orderNumber }, function (err, result) {
			if (err) res.status(404).send('fetch user single history bet error');
			res.json(result[0]);
		});
	}
});

exports.default = router;
//# sourceMappingURL=userUtils.js.map