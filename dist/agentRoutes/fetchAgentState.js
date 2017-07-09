'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Agent = require('../models/Agent');

var _Agent2 = _interopRequireDefault(_Agent);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = _express2.default.Router();

router.get('/fetch-agent-state', function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_Agent2.default.findOne({ username: req.user.username }, 'username accountActive passcode accountType creditBalance', function (err, result) {
							res.json(result);
						});

					case 1:
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
//# sourceMappingURL=fetchAgentState.js.map