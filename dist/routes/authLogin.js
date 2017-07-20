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

var _Agent = require('../models/Agent');

var _Agent2 = _interopRequireDefault(_Agent);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = _express2.default.Router();

router.post('/login', function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
		var userResult, token, agentResult, _token;

		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.next = 2;
						return _User2.default.findOne({ username: { $regex: new RegExp('^' + req.body.username, 'i') } });

					case 2:
						userResult = _context.sent;

						if (_lodash2.default.isEmpty(userResult)) {
							_context.next = 10;
							break;
						}

						if (!(userResult.password.toLowerCase() === req.body.password.toLowerCase() && userResult.accountActive)) {
							_context.next = 9;
							break;
						}

						token = _jsonwebtoken2.default.sign({
							id: userResult._id,
							accountType: userResult.accountType,
							username: userResult.username
						}, _config2.default.jwtSecret);
						return _context.abrupt('return', res.status(200).send(token));

					case 9:
						return _context.abrupt('return', res.status(404).send('password not correct'));

					case 10:
						_context.next = 12;
						return _Agent2.default.findOne({ username: { $regex: new RegExp('^' + req.body.username, 'i') } });

					case 12:
						agentResult = _context.sent;

						if (_lodash2.default.isEmpty(agentResult)) {
							_context.next = 20;
							break;
						}

						if (!(agentResult.password.toLowerCase() === req.body.password.toLowerCase() && agentResult.accountActive)) {
							_context.next = 19;
							break;
						}

						_token = _jsonwebtoken2.default.sign({
							id: agentResult._id,
							accountType: agentResult.accountType,
							username: agentResult.username
						}, _config2.default.jwtSecret);
						return _context.abrupt('return', res.status(200).send(_token));

					case 19:
						return _context.abrupt('return', res.status(404).send('password not correct'));

					case 20:
						return _context.abrupt('return', res.status(404).send('user not found'));

					case 21:
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

router.get('/register-user', function (req, res) {
	var newUser = new _User2.default({
		username: 'user6',
		password: '1234',
		passcode: '4321',
		maxWagerAmount: 500,
		maxWinAmount: 5000,
		weeklyStartBalance: 5000,
		thisWeekExtraCredit: 0,
		maxParlayTeam: 6,
		createAt: (0, _moment2.default)()
	});
	newUser.save().then(function () {
		console.log('user acc saved');
		res.json({ accountCreated: true });
	});
});

router.get('/register-agent', function (req, res) {
	var newAgent = new _Agent2.default({
		username: 'diamond',
		password: '1234',
		createAt: (0, _moment2.default)()
	});
	newAgent.save().then(function () {
		console.log('agent acc saved');
		res.json({ accountCreated: true });
	});
});

exports.default = router;
//# sourceMappingURL=authLogin.js.map