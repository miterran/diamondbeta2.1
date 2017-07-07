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
																		_context.next = 3;
																		return _axios2.default.get('https://jsonodds.com/api/results/getbyeventid/' + event.ID + '?oddType=' + event.BetDetail.OddType);

																	case 3:
																		response = _context.sent;
																		result = Object.assign({}, response.data[0]);

																		if (_lodash2.default.isEmpty(result)) {
																			_context.next = 81;
																			break;
																		}

																		if (!result.Final) {
																			_context.next = 78;
																			break;
																		}

																		_context.t0 = result.FinalType;
																		_context.next = _context.t0 === 'Finished' ? 10 : _context.t0 === 'Canceled' ? 70 : _context.t0 === 'Postponed' ? 72 : 74;
																		break;

																	case 10:
																		_context.t1 = event.BetDetail.BetType;
																		_context.next = _context.t1 === 'M-Line' ? 13 : _context.t1 === 'Spread' ? 25 : _context.t1 === 'Total' ? 41 : _context.t1 === 'Draw' ? 57 : 67;
																		break;

																	case 13:
																		_context.t2 = true;
																		_context.next = _context.t2 === (event.BetDetail.OddTarget === 'Home' && result.BinaryScore === '1-0') ? 16 : _context.t2 === (event.BetDetail.OddTarget === 'Home' && Number(result.HomeScore) > Number(result.AwayScore)) ? 16 : _context.t2 === (event.BetDetail.OddTarget === 'Away' && result.BinaryScore === '0-1') ? 16 : _context.t2 === (event.BetDetail.OddTarget === 'Away' && Number(result.HomeScore) < Number(result.AwayScore)) ? 16 : _context.t2 === (event.BetDetail.OddTarget === 'Home' && result.BinaryScore === '0-1') ? 18 : _context.t2 === (event.BetDetail.OddTarget === 'Home' && Number(result.HomeScore) < Number(result.AwayScore)) ? 18 : _context.t2 === (event.BetDetail.OddTarget === 'Away' && result.BinaryScore === '1-0') ? 18 : _context.t2 === (event.BetDetail.OddTarget === 'Away' && Number(result.HomeScore) > Number(result.AwayScore)) ? 18 : _context.t2 === (result.BinaryScore === '0-0') ? 20 : _context.t2 === (Number(result.HomeScore) === Number(result.AwayScore)) ? 20 : 22;
																		break;

																	case 16:
																		eventStatus = 'Won';
																		return _context.abrupt('break', 24);

																	case 18:
																		eventStatus = 'Lost';
																		return _context.abrupt('break', 24);

																	case 20:
																		if (event.Sport === 7) {
																			eventStatus = 'Lost';
																		} else {
																			eventStatus = 'Push';
																		}
																		return _context.abrupt('break', 24);

																	case 22:
																		eventStatus = 'Review';
																		return _context.abrupt('return');

																	case 24:
																		return _context.abrupt('break', 69);

																	case 25:
																		_context.t3 = true;
																		_context.next = _context.t3 === (event.Sport === 7 && event.BetDetail.OddTarget === 'Home' && Number(result.HomeScore) + Number(event.BetDetail.OddPoint) - Number(result.AwayScore) === 0.25) ? 28 : _context.t3 === (event.Sport === 7 && event.BetDetail.OddTarget === 'Away' && Number(result.AwayScore) + Number(event.BetDetail.OddPoint) - Number(result.HomeScore) === 0.25) ? 28 : _context.t3 === (event.Sport === 7 && event.BetDetail.OddTarget === 'Home' && Number(result.HomeScore) + Number(event.BetDetail.OddPoint) - Number(result.AwayScore) === -0.25) ? 30 : _context.t3 === (event.Sport === 7 && event.BetDetail.OddTarget === 'Away' && Number(result.AwayScore) + Number(event.BetDetail.OddPoint) - Number(result.HomeScore) === -0.25) ? 30 : _context.t3 === (event.BetDetail.OddTarget === 'Home' && Number(result.HomeScore) + Number(event.BetDetail.OddPoint) > Number(result.AwayScore)) ? 32 : _context.t3 === (event.BetDetail.OddTarget === 'Away' && Number(result.AwayScore) + Number(event.BetDetail.OddPoint) > Number(result.HomeScore)) ? 32 : _context.t3 === (event.BetDetail.OddTarget === 'Home' && Number(result.HomeScore) + Number(event.BetDetail.OddPoint) < Number(result.AwayScore)) ? 34 : _context.t3 === (event.BetDetail.OddTarget === 'Away' && Number(result.AwayScore) + Number(event.BetDetail.OddPoint) < Number(result.HomeScore)) ? 34 : _context.t3 === (event.BetDetail.OddTarget === 'Home' && Number(result.HomeScore) + Number(event.BetDetail.OddPoint) === Number(result.AwayScore)) ? 36 : _context.t3 === (event.BetDetail.OddTarget === 'Away' && Number(result.AwayScore) + Number(event.BetDetail.OddPoint) === Number(result.HomeScore)) ? 36 : 38;
																		break;

																	case 28:
																		eventStatus = 'WonHalf';
																		return _context.abrupt('break', 40);

																	case 30:
																		eventStatus = 'LostHalf';
																		return _context.abrupt('break', 40);

																	case 32:
																		eventStatus = 'Won';
																		return _context.abrupt('break', 40);

																	case 34:
																		eventStatus = 'Lost';
																		return _context.abrupt('break', 40);

																	case 36:
																		eventStatus = 'Push';
																		return _context.abrupt('break', 40);

																	case 38:
																		eventStatus = 'Review';
																		return _context.abrupt('return');

																	case 40:
																		return _context.abrupt('break', 69);

																	case 41:
																		_context.t4 = true;
																		_context.next = _context.t4 === (event.Sport === 7 && event.BetDetail.OddTarget === 'Over' && Number(result.HomeScore) + Number(result.AwayScore) - Number(event.BetDetail.OddPoint) === 0.25) ? 44 : _context.t4 === (event.Sport === 7 && event.BetDetail.OddTarget === 'Under' && Number(event.BetDetail.OddPoint) - (Number(result.HomeScore) + Number(result.AwayScore)) === 0.25) ? 44 : _context.t4 === (event.Sport === 7 && event.BetDetail.OddTarget === 'Over' && Number(result.HomeScore) + Number(result.AwayScore) - Number(event.BetDetail.OddPoint) === -0.25) ? 46 : _context.t4 === (event.Sport === 7 && event.BetDetail.OddTarget === 'Under' && Number(event.BetDetail.OddPoint) - (Number(result.HomeScore) + Number(result.AwayScore)) === -0.25) ? 46 : _context.t4 === (event.BetDetail.OddTarget === 'Over' && Number(result.HomeScore) + Number(result.AwayScore) > Number(event.BetDetail.OddPoint)) ? 48 : _context.t4 === (event.BetDetail.OddTarget === 'Under' && Number(result.HomeScore) + Number(result.AwayScore) < Number(event.BetDetail.OddPoint)) ? 48 : _context.t4 === (event.BetDetail.OddTarget === 'Over' && Number(result.HomeScore) + Number(result.AwayScore) < Number(event.BetDetail.OddPoint)) ? 50 : _context.t4 === (event.BetDetail.OddTarget === 'Under' && Number(result.HomeScore) + Number(result.AwayScore) > Number(event.BetDetail.OddPoint)) ? 50 : _context.t4 === (event.BetDetail.OddTarget === 'Over' && Number(result.HomeScore) + Number(result.AwayScore) === Number(event.BetDetail.OddPoint)) ? 52 : _context.t4 === (event.BetDetail.OddTarget === 'Under' && Number(result.HomeScore) + Number(result.AwayScore) === Number(event.BetDetail.OddPoint)) ? 52 : 54;
																		break;

																	case 44:
																		eventStatus = 'WonHalf';
																		return _context.abrupt('break', 56);

																	case 46:
																		eventStatus = 'LostHalf';
																		return _context.abrupt('break', 56);

																	case 48:
																		eventStatus = 'Won';
																		return _context.abrupt('break', 56);

																	case 50:
																		eventStatus = 'Lost';
																		return _context.abrupt('break', 56);

																	case 52:
																		eventStatus = 'Push';
																		return _context.abrupt('break', 56);

																	case 54:
																		eventStatus = 'Review';
																		return _context.abrupt('return');

																	case 56:
																		return _context.abrupt('break', 69);

																	case 57:
																		_context.t5 = true;
																		_context.next = _context.t5 === (result.BinaryScore === '0-0') ? 60 : _context.t5 === (Number(result.HomeScore) === Number(result.AwayScore)) ? 60 : _context.t5 === (result.BinaryScore === '1-0') ? 62 : _context.t5 === (result.BinaryScore === '0-1') ? 62 : _context.t5 === (Number(result.HomeScore) !== Number(result.AwayScore)) ? 62 : 64;
																		break;

																	case 60:
																		eventStatus = 'Won';
																		return _context.abrupt('break', 66);

																	case 62:
																		eventStatus = 'Lost';
																		return _context.abrupt('break', 66);

																	case 64:
																		eventStatus = 'Review';
																		return _context.abrupt('return');

																	case 66:
																		return _context.abrupt('break', 69);

																	case 67:
																		eventStatus = 'Review';
																		return _context.abrupt('return');

																	case 69:
																		return _context.abrupt('break', 76);

																	case 70:
																		eventStatus = 'Canceled';
																		return _context.abrupt('break', 76);

																	case 72:
																		eventStatus = 'Postponed';
																		return _context.abrupt('break', 76);

																	case 74:
																		eventStatus = 'Review';
																		return _context.abrupt('return');

																	case 76:
																		_context.next = 79;
																		break;

																	case 78:
																		eventStatus = 'Pending';

																	case 79:
																		_context.next = 82;
																		break;

																	case 81:
																		eventStatus = 'Review';

																	case 82:
																		_context.next = 84;
																		return OpenBet.findOneAndUpdate({ orderNumber: openBet.orderNumber, events: { $elemMatch: { 'ID': event.ID, 'OddPickID': event.OddPickID, 'BetDetail.OddType': event.BetDetail.OddType } } }, { '$set': { 'events.$.Status': eventStatus, 'events.$.Result': result } });

																	case 84:
																		console.log('updated event result');

																	case 85:
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