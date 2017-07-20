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

var router = _express2.default.Router();

router.get('/fetch-open-bets', function (req, res) {
	OpenBet.find({ user: req.user.username }, function (err, result) {
		if (err) res.status(404).send('fetch user open bet error');
		res.json(result);
	});
});

exports.default = router;
//# sourceMappingURL=fetchUserOpenBets.js.map