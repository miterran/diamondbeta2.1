'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var openBetPending = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
		var _this = this;

		var openBets;
		return regeneratorRuntime.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						_context3.next = 2;
						return OpenBet.find({});

					case 2:
						openBets = _context3.sent;

						if (_lodash2.default.isEmpty(openBets)) {
							_context3.next = 8;
							break;
						}

						_context3.next = 6;
						return Promise.all(openBets.map(function () {
							var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(openBet) {
								return regeneratorRuntime.wrap(function _callee2$(_context2) {
									while (1) {
										switch (_context2.prev = _context2.next) {
											case 0:
												_context2.next = 2;
												return Promise.all(openBet.events.map(function () {
													var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(event, eventIdx) {
														var eventStatus, response, result;
														return regeneratorRuntime.wrap(function _callee$(_context) {
															while (1) {
																switch (_context.prev = _context.next) {
																	case 0:
																		eventStatus = 'Pending';

																		if (event.BetDetail.OddType === 'FirstFiveInnings') {
																			event.BetDetail.OddType === 'First Five Innings';
																		}
																		_context.next = 4;
																		return _axios2.default.get('https://jsonodds.com/api/results/getbyeventid/' + event.ID + '?oddType=' + event.BetDetail.OddType);

																	case 4:
																		response = _context.sent;

																		if (!(response.data.length === 1)) {
																			_context.next = 89;
																			break;
																		}

																		result = Object.assign({}, response.data[0]);

																		if (_lodash2.default.isEmpty(result)) {
																			_context.next = 83;
																			break;
																		}

																		if (!result.Final) {
																			_context.next = 80;
																			break;
																		}

																		_context.t0 = result.FinalType;
																		_context.next = _context.t0 === 'Finished' ? 12 : _context.t0 === 'Canceled' ? 72 : _context.t0 === 'Postponed' ? 74 : 76;
																		break;

																	case 12:
																		_context.t1 = event.BetDetail.BetType;
																		_context.next = _context.t1 === 'M-Line' ? 15 : _context.t1 === 'Spread' ? 27 : _context.t1 === 'Total' ? 43 : _context.t1 === 'Draw' ? 59 : 69;
																		break;

																	case 15:
																		_context.t2 = true;
																		_context.next = _context.t2 === (event.BetDetail.OddTarget === 'Home' && result.BinaryScore === '1-0') ? 18 : _context.t2 === (event.BetDetail.OddTarget === 'Home' && Number(result.HomeScore) > Number(result.AwayScore)) ? 18 : _context.t2 === (event.BetDetail.OddTarget === 'Away' && result.BinaryScore === '0-1') ? 18 : _context.t2 === (event.BetDetail.OddTarget === 'Away' && Number(result.HomeScore) < Number(result.AwayScore)) ? 18 : _context.t2 === (event.BetDetail.OddTarget === 'Home' && result.BinaryScore === '0-1') ? 20 : _context.t2 === (event.BetDetail.OddTarget === 'Home' && Number(result.HomeScore) < Number(result.AwayScore)) ? 20 : _context.t2 === (event.BetDetail.OddTarget === 'Away' && result.BinaryScore === '1-0') ? 20 : _context.t2 === (event.BetDetail.OddTarget === 'Away' && Number(result.HomeScore) > Number(result.AwayScore)) ? 20 : _context.t2 === (result.BinaryScore === '0-0') ? 22 : _context.t2 === (Number(result.HomeScore) === Number(result.AwayScore)) ? 22 : 24;
																		break;

																	case 18:
																		eventStatus = 'Won';
																		return _context.abrupt('break', 26);

																	case 20:
																		eventStatus = 'Lost';
																		return _context.abrupt('break', 26);

																	case 22:
																		if (event.Sport === 7) {
																			eventStatus = 'Lost';
																		} else {
																			eventStatus = 'Push';
																		}
																		return _context.abrupt('break', 26);

																	case 24:
																		eventStatus = 'Review';
																		return _context.abrupt('return');

																	case 26:
																		return _context.abrupt('break', 71);

																	case 27:
																		_context.t3 = true;
																		_context.next = _context.t3 === (event.Sport === 7 && event.BetDetail.OddTarget === 'Home' && Number(result.HomeScore) + Number(event.BetDetail.OddPoint) - Number(result.AwayScore) === 0.25) ? 30 : _context.t3 === (event.Sport === 7 && event.BetDetail.OddTarget === 'Away' && Number(result.AwayScore) + Number(event.BetDetail.OddPoint) - Number(result.HomeScore) === 0.25) ? 30 : _context.t3 === (event.Sport === 7 && event.BetDetail.OddTarget === 'Home' && Number(result.HomeScore) + Number(event.BetDetail.OddPoint) - Number(result.AwayScore) === -0.25) ? 32 : _context.t3 === (event.Sport === 7 && event.BetDetail.OddTarget === 'Away' && Number(result.AwayScore) + Number(event.BetDetail.OddPoint) - Number(result.HomeScore) === -0.25) ? 32 : _context.t3 === (event.BetDetail.OddTarget === 'Home' && Number(result.HomeScore) + Number(event.BetDetail.OddPoint) > Number(result.AwayScore)) ? 34 : _context.t3 === (event.BetDetail.OddTarget === 'Away' && Number(result.AwayScore) + Number(event.BetDetail.OddPoint) > Number(result.HomeScore)) ? 34 : _context.t3 === (event.BetDetail.OddTarget === 'Home' && Number(result.HomeScore) + Number(event.BetDetail.OddPoint) < Number(result.AwayScore)) ? 36 : _context.t3 === (event.BetDetail.OddTarget === 'Away' && Number(result.AwayScore) + Number(event.BetDetail.OddPoint) < Number(result.HomeScore)) ? 36 : _context.t3 === (event.BetDetail.OddTarget === 'Home' && Number(result.HomeScore) + Number(event.BetDetail.OddPoint) === Number(result.AwayScore)) ? 38 : _context.t3 === (event.BetDetail.OddTarget === 'Away' && Number(result.AwayScore) + Number(event.BetDetail.OddPoint) === Number(result.HomeScore)) ? 38 : 40;
																		break;

																	case 30:
																		eventStatus = 'WonHalf';
																		return _context.abrupt('break', 42);

																	case 32:
																		eventStatus = 'LostHalf';
																		return _context.abrupt('break', 42);

																	case 34:
																		eventStatus = 'Won';
																		return _context.abrupt('break', 42);

																	case 36:
																		eventStatus = 'Lost';
																		return _context.abrupt('break', 42);

																	case 38:
																		eventStatus = 'Push';
																		return _context.abrupt('break', 42);

																	case 40:
																		eventStatus = 'Review';
																		return _context.abrupt('return');

																	case 42:
																		return _context.abrupt('break', 71);

																	case 43:
																		_context.t4 = true;
																		_context.next = _context.t4 === (event.Sport === 7 && event.BetDetail.OddTarget === 'Over' && Number(result.HomeScore) + Number(result.AwayScore) - Number(event.BetDetail.OddPoint) === 0.25) ? 46 : _context.t4 === (event.Sport === 7 && event.BetDetail.OddTarget === 'Under' && Number(event.BetDetail.OddPoint) - (Number(result.HomeScore) + Number(result.AwayScore)) === 0.25) ? 46 : _context.t4 === (event.Sport === 7 && event.BetDetail.OddTarget === 'Over' && Number(result.HomeScore) + Number(result.AwayScore) - Number(event.BetDetail.OddPoint) === -0.25) ? 48 : _context.t4 === (event.Sport === 7 && event.BetDetail.OddTarget === 'Under' && Number(event.BetDetail.OddPoint) - (Number(result.HomeScore) + Number(result.AwayScore)) === -0.25) ? 48 : _context.t4 === (event.BetDetail.OddTarget === 'Over' && Number(result.HomeScore) + Number(result.AwayScore) > Number(event.BetDetail.OddPoint)) ? 50 : _context.t4 === (event.BetDetail.OddTarget === 'Under' && Number(result.HomeScore) + Number(result.AwayScore) < Number(event.BetDetail.OddPoint)) ? 50 : _context.t4 === (event.BetDetail.OddTarget === 'Over' && Number(result.HomeScore) + Number(result.AwayScore) < Number(event.BetDetail.OddPoint)) ? 52 : _context.t4 === (event.BetDetail.OddTarget === 'Under' && Number(result.HomeScore) + Number(result.AwayScore) > Number(event.BetDetail.OddPoint)) ? 52 : _context.t4 === (event.BetDetail.OddTarget === 'Over' && Number(result.HomeScore) + Number(result.AwayScore) === Number(event.BetDetail.OddPoint)) ? 54 : _context.t4 === (event.BetDetail.OddTarget === 'Under' && Number(result.HomeScore) + Number(result.AwayScore) === Number(event.BetDetail.OddPoint)) ? 54 : 56;
																		break;

																	case 46:
																		eventStatus = 'WonHalf';
																		return _context.abrupt('break', 58);

																	case 48:
																		eventStatus = 'LostHalf';
																		return _context.abrupt('break', 58);

																	case 50:
																		eventStatus = 'Won';
																		return _context.abrupt('break', 58);

																	case 52:
																		eventStatus = 'Lost';
																		return _context.abrupt('break', 58);

																	case 54:
																		eventStatus = 'Push';
																		return _context.abrupt('break', 58);

																	case 56:
																		eventStatus = 'Review';
																		return _context.abrupt('return');

																	case 58:
																		return _context.abrupt('break', 71);

																	case 59:
																		_context.t5 = true;
																		_context.next = _context.t5 === (result.BinaryScore === '0-0') ? 62 : _context.t5 === (Number(result.HomeScore) === Number(result.AwayScore)) ? 62 : _context.t5 === (result.BinaryScore === '1-0') ? 64 : _context.t5 === (result.BinaryScore === '0-1') ? 64 : _context.t5 === (Number(result.HomeScore) !== Number(result.AwayScore)) ? 64 : 66;
																		break;

																	case 62:
																		eventStatus = 'Won';
																		return _context.abrupt('break', 68);

																	case 64:
																		eventStatus = 'Lost';
																		return _context.abrupt('break', 68);

																	case 66:
																		eventStatus = 'Review';
																		return _context.abrupt('return');

																	case 68:
																		return _context.abrupt('break', 71);

																	case 69:
																		eventStatus = 'Review';
																		return _context.abrupt('return');

																	case 71:
																		return _context.abrupt('break', 78);

																	case 72:
																		eventStatus = 'Canceled';
																		return _context.abrupt('break', 78);

																	case 74:
																		eventStatus = 'Postponed';
																		return _context.abrupt('break', 78);

																	case 76:
																		eventStatus = 'Review';
																		return _context.abrupt('return');

																	case 78:
																		_context.next = 81;
																		break;

																	case 80:
																		eventStatus = 'Pending';

																	case 81:
																		_context.next = 84;
																		break;

																	case 83:
																		eventStatus = 'Review';

																	case 84:
																		_context.next = 86;
																		return OpenBet.findOneAndUpdate({ orderNumber: openBet.orderNumber, events: { $elemMatch: { 'ID': event.ID, 'OddPickID': event.OddPickID, 'BetDetail.OddType': event.BetDetail.OddType } } }, { '$set': { 'events.$.Status': eventStatus, 'events.$.Result': result } });

																	case 86:
																		console.log('updated event result');
																		_context.next = 90;
																		break;

																	case 89:
																		console.log(response.data);

																	case 90:
																	case 'end':
																		return _context.stop();
																}
															}
														}, _callee, _this);
													}));

													return function (_x2, _x3) {
														return _ref3.apply(this, arguments);
													};
												}())).then(function () {
													console.log('this bet result done');
												}).catch(function (error) {
													console.log('bet result update error');
													throw error;
												});

											case 2:
											case 'end':
												return _context2.stop();
										}
									}
								}, _callee2, _this);
							}));

							return function (_x) {
								return _ref2.apply(this, arguments);
							};
						}())).then(function () {
							console.log('all open bets updated');
						}).catch(function (error) {
							console.log('all open bets updated error');
							throw error;
						});

					case 6:
						_context3.next = 9;
						break;

					case 8:
						console.log('openBet is empty');

					case 9:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, this);
	}));

	return function openBetPending() {
		return _ref.apply(this, arguments);
	};
}();

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _BetOrder = require('../models/BetOrder');

var _BetOrder2 = _interopRequireDefault(_BetOrder);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var OpenBet = _BetOrder2.default.OpenBet;

_axios2.default.defaults.headers.common['JsonOdds-API-Key'] = _config2.default.apiKey;

exports.default = openBetPending;
//# sourceMappingURL=openBetPending.js.map