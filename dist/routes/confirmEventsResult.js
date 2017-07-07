'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _BetOrder = require('../models/BetOrder');

var _BetOrder2 = _interopRequireDefault(_BetOrder);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var OpenBet = _BetOrder2.default.OpenBet;
var ReviewBet = _BetOrder2.default.ReviewBet;
var HistoryBet = _BetOrder2.default.HistoryBet;

var router = _express2.default.Router();

_mongoose2.default.Promise = global.Promise;

_axios2.default.defaults.headers.common['JsonOdds-API-Key'] = _config2.default.apiKey;

var openBetPendingMiddleWare = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(req, res, next) {
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

													return function (_x5, _x6) {
														return _ref3.apply(this, arguments);
													};
												}())).then(function () {
													console.log('this bet result done');
												}).catch(function (err) {
													console.log('bet result update error');
													res.status(404).send('event update error');
												});

											case 2:
											case 'end':
												return _context2.stop();
										}
									}
								}, _callee2, _this);
							}));

							return function (_x4) {
								return _ref2.apply(this, arguments);
							};
						}())).then(function () {
							console.log('all open bets updated');
							next();
						}).catch(function (err) {
							console.log('all open bets updated error');
							res.status(404).send('all open bets updated error');
						});

					case 6:
						_context3.next = 10;
						break;

					case 8:
						console.log('openBet is empty');
						res.status(202).send('openBet is empty');

					case 10:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, this);
	}));

	return function openBetPendingMiddleWare(_x, _x2, _x3) {
		return _ref.apply(this, arguments);
	};
}();

var openBetResultMiddleWare = function () {
	var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(req, res, next) {
		var openBets;
		return regeneratorRuntime.wrap(function _callee5$(_context5) {
			while (1) {
				switch (_context5.prev = _context5.next) {
					case 0:
						_context5.next = 2;
						return OpenBet.find({});

					case 2:
						openBets = _context5.sent;

						if (_lodash2.default.isEmpty(openBets)) {
							_context5.next = 8;
							break;
						}

						_context5.next = 6;
						return Promise.all(openBets.map(function () {
							var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(openBet) {
								var eventsHaveWon, eventsHaveLost, eventsHavePush, eventsHaveCanceled, eventsHavePostponed, eventsHaveReview, allEventsWon, allEventsLost, allEventsPush, allEventsCanceled, allEventsPostponed, allEventsReview, allEventsFinished, resultBet, parlayPoint, riskPoint, newHistoryBet, newReviewBet;
								return regeneratorRuntime.wrap(function _callee4$(_context4) {
									while (1) {
										switch (_context4.prev = _context4.next) {
											case 0:
												eventsHaveWon = _lodash2.default.find(openBet.events, function (event) {
													return event.Status === 'Won';
												});
												eventsHaveLost = _lodash2.default.find(openBet.events, function (event) {
													return event.Status === 'Lost';
												});
												eventsHavePush = _lodash2.default.find(openBet.events, function (event) {
													return event.Status === 'Push';
												});
												eventsHaveCanceled = _lodash2.default.find(openBet.events, function (event) {
													return event.Status === 'Canceled';
												});
												eventsHavePostponed = _lodash2.default.find(openBet.events, function (event) {
													return event.Status === 'Postponed';
												});
												eventsHaveReview = _lodash2.default.find(openBet.events, function (event) {
													return event.Status === 'Review';
												});
												allEventsWon = openBet.events.every(function (event) {
													return event.Status === 'Won';
												});
												allEventsLost = openBet.events.every(function (event) {
													return event.Status === 'Lost';
												});
												allEventsPush = openBet.events.every(function (event) {
													return event.Status === 'Push';
												});
												allEventsCanceled = openBet.events.every(function (event) {
													return event.Status === 'Canceled';
												});
												allEventsPostponed = openBet.events.every(function (event) {
													return event.Status === 'Postponed';
												});
												allEventsReview = openBet.events.every(function (event) {
													return event.Status === 'Review';
												});
												allEventsFinished = openBet.events.every(function (event) {
													return event.Result.Final === true;
												});

												if (!allEventsFinished) {
													_context4.next = 77;
													break;
												}

												resultBet = {
													orderNumber: openBet.orderNumber,
													betOption: openBet.betOption,
													superAgent: openBet.superAgent,
													agent: openBet.agent,
													user: openBet.user,
													events: openBet.events,
													eventsWagerDetail: openBet.eventsWagerDetail,
													orderStatus: 'Pending',
													createdAt: openBet.createdAt,
													completedAt: new Date(),
													orderResultAmount: 0
												};

												if (!(openBet.betOption === 'Straight')) {
													_context4.next = 39;
													break;
												}

												_context4.t0 = openBet.events[0].Status;
												_context4.next = _context4.t0 === 'Won' ? 19 : _context4.t0 === 'Lost' ? 22 : _context4.t0 === 'WonHalf' ? 25 : _context4.t0 === 'LostHalf' ? 28 : _context4.t0 === 'Push' ? 31 : _context4.t0 === 'Postponed' ? 33 : _context4.t0 === 'Canceled' ? 35 : 37;
												break;

											case 19:
												resultBet.orderStatus = 'Won';
												resultBet.orderResultAmount = openBet.eventsWagerDetail.WinAmount;
												return _context4.abrupt('break', 39);

											case 22:
												resultBet.orderStatus = 'Lost';
												resultBet.orderResultAmount = -Number(openBet.eventsWagerDetail.RiskAmount);
												return _context4.abrupt('break', 39);

											case 25:
												resultBet.orderStatus = 'WonHalf';
												resultBet.orderResultAmount = (Number(openBet.eventsWagerDetail.WinAmount) / 2).toFixed();
												return _context4.abrupt('break', 39);

											case 28:
												resultBet.orderStatus = 'LostHalf';
												resultBet.orderResultAmount = -(Number(openBet.eventsWagerDetail.RiskAmount) / 2).toFixed();
												return _context4.abrupt('break', 39);

											case 31:
												resultBet.orderStatus = 'Push';
												return _context4.abrupt('break', 39);

											case 33:
												resultBet.orderStatus = 'Postponed';
												return _context4.abrupt('break', 39);

											case 35:
												resultBet.orderStatus = 'Canceled';
												return _context4.abrupt('break', 39);

											case 37:
												resultBet.orderStatus = 'Review';
												return _context4.abrupt('return');

											case 39:
												if (!(openBet.betOption === 'Parlay')) {
													_context4.next = 60;
													break;
												}

												_context4.t1 = true;
												_context4.next = _context4.t1 === allEventsPush ? 43 : _context4.t1 === allEventsCanceled ? 45 : _context4.t1 === (!_lodash2.default.isEmpty(eventsHaveWon) && _lodash2.default.isEmpty(eventsHaveReview) && _lodash2.default.isEmpty(eventsHaveLost) && _lodash2.default.isEmpty(eventsHavePostponed) || allEventsWon) ? 47 : _context4.t1 === !_lodash2.default.isEmpty(eventsHaveLost) ? 53 : _context4.t1 === !_lodash2.default.isEmpty(eventsHavePostponed) ? 56 : 58;
												break;

											case 43:
												resultBet.orderStatus = 'Push';
												return _context4.abrupt('break', 60);

											case 45:
												resultBet.orderStatus = 'Canceled';
												return _context4.abrupt('break', 60);

											case 47:
												parlayPoint = [];

												openBet.events.map(function (event) {
													if (event.Status === 'Won') {
														if (event.BetDetail.OddLine > 0) {
															parlayPoint.push((Number(event.BetDetail.OddLine) + 100) / 100);
														} else {
															parlayPoint.push((Math.abs(event.BetDetail.OddLine) + 100) / Math.abs(event.BetDetail.OddLine));
														}
													}
												});
												riskPoint = parlayPoint.reduce(function (a, b) {
													return a * b;
												});

												resultBet.orderStatus = 'Won';
												resultBet.orderResultAmount = ((Number(openBet.eventsWagerDetail.RiskAmount) * Number(riskPoint) - Number(openBet.eventsWagerDetail.RiskAmount)) * 1).toFixed();
												return _context4.abrupt('break', 60);

											case 53:
												resultBet.orderStatus = 'Lost';
												resultBet.orderResultAmount = -Number(openBet.eventsWagerDetail.RiskAmount);
												return _context4.abrupt('break', 60);

											case 56:
												resultBet.orderStatus = 'Postponed';
												return _context4.abrupt('break', 60);

											case 58:
												resultBet.orderStatus = 'Review';
												return _context4.abrupt('return');

											case 60:
												if (!(resultBet.orderStatus !== 'Pending')) {
													_context4.next = 76;
													break;
												}

												if (!(resultBet.orderStatus !== 'Review' || resultBet.orderStatus !== 'Postponed')) {
													_context4.next = 69;
													break;
												}

												newHistoryBet = new HistoryBet(resultBet);
												_context4.next = 65;
												return newHistoryBet.save();

											case 65:
												_context4.next = 67;
												return OpenBet.findOneAndRemove({ _id: openBet._id });

											case 67:
												_context4.next = 74;
												break;

											case 69:
												newReviewBet = new ReviewBet(resultBet);
												_context4.next = 72;
												return newReviewBet.save();

											case 72:
												_context4.next = 74;
												return OpenBet.findOneAndRemove({ _id: openBet._id });

											case 74:
												_context4.next = 77;
												break;

											case 76:
												console.log('open bet result calculate has error');

											case 77:
											case 'end':
												return _context4.stop();
										}
									}
								}, _callee4, this);
							}));

							return function (_x10) {
								return _ref5.apply(this, arguments);
							};
						}())).then(function () {
							console.log('open bet result done');
							next();
						}).catch(function (error) {
							console.log('open bet result error');
							res.status(404).send('open bet result error');
						});

					case 6:
						_context5.next = 10;
						break;

					case 8:
						console.log('openBet is empty');
						next();

					case 10:
					case 'end':
						return _context5.stop();
				}
			}
		}, _callee5, this);
	}));

	return function openBetResultMiddleWare(_x7, _x8, _x9) {
		return _ref4.apply(this, arguments);
	};
}();

router.get('/confirm-events-result', openBetPendingMiddleWare, openBetResultMiddleWare, function (req, res) {
	res.send('confirm open bet result done');
});

router.get('/result', function () {
	var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(req, res) {
		var response;
		return regeneratorRuntime.wrap(function _callee6$(_context6) {
			while (1) {
				switch (_context6.prev = _context6.next) {
					case 0:
						_context6.next = 2;
						return _axios2.default.get('https://jsonodds.com/api/results');

					case 2:
						response = _context6.sent;

						res.json(response.data);

					case 4:
					case 'end':
						return _context6.stop();
				}
			}
		}, _callee6, undefined);
	}));

	return function (_x11, _x12) {
		return _ref6.apply(this, arguments);
	};
}());

exports.default = router;
//# sourceMappingURL=confirmEventsResult.js.map