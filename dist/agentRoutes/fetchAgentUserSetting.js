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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = _express2.default.Router();

router.get('/fetch-user-setting', function (req, res) {

	var userList = [];

	Promise.all(req.user.userList.map(function () {
		var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(user) {
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.next = 2;
							return _User2.default.findOne({ username: user }, 'username createdAt accountActive maxParlayTeam weeklyStartBalance maxWinAmount maxWagerAmount minRiskAmount', function (err, userInfo) {
								userList.push(userInfo);
							});

						case 2:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, undefined);
		}));

		return function (_x) {
			return _ref.apply(this, arguments);
		};
	}())).then(function () {
		res.json(userList);
	});
});

exports.default = router;
//# sourceMappingURL=fetchAgentUserSetting.js.map