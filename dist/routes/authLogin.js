'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/login', function (req, res) {
	console.log(req.body.username);
	_User2.default.findOne({ username: req.body.username.toLowerCase() }, function (err, result) {
		console.log(result);
		if (result) {
			if (result.password.toLowerCase() === req.body.password.toLowerCase() && result.accountActive) {
				var token = _jsonwebtoken2.default.sign({
					id: result._id,
					accountType: result.accountType,
					username: result.username
				}, _config2.default.jwtSecret);
				return res.status(200).send(token);
			} else {
				return res.status(404).send('password not correct');
			}
		} else {
			return res.status(404).send('user not found');
		}
	});
});

// router.get('/register', (req, res) => {
// 	let newUser = new User({
// 	accountType: 'user',
// 	username: 'user6',
// 	password: '1234',
// 	passcode: '4321',
// 	maxWagerAmount: 500,
// 	maxWinAmount: 5000,
// 	weeklyStartBalance: 5000,
// 	thisWeekExtraCredit: 0,
// 	maxParlayTeam: 6
// 	});
// 	newUser.save().then(function(){
// 		console.log('saved')
// 		res.json({ accountCreated: true })
// 	})
// })

exports.default = router;
//# sourceMappingURL=authLogin.js.map