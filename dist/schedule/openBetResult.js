'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var openBetResult = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
		var openBets;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context2.next = 2;
						return OpenBet.find({});

					case 2:
						openBets = _context2.sent;

						if (_lodash2.default.isEmpty(openBets)) {
							_context2.next = 8;
							break;
						}

						_context2.next = 6;
						return Promise.all(openBets.map(function () {
							var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(openBet) {
								var eventsHaveWon, eventsHaveLost, eventsHavePush, eventsHaveCanceled, eventsHavePostponed, eventsHaveReview, allEventsWon, allEventsLost, allEventsPush, allEventsCanceled, allEventsPostponed, allEventsReview, allEventsFinished, resultBet, parlayPoint, riskPoint, newHistoryBet, newReviewBet;
								return regeneratorRuntime.wrap(function _callee$(_context) {
									while (1) {
										switch (_context.prev = _context.next) {
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
													_context.next = 77;
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
													_context.next = 39;
													break;
												}

												_context.t0 = openBet.events[0].Status;
												_context.next = _context.t0 === 'Won' ? 19 : _context.t0 === 'Lost' ? 22 : _context.t0 === 'WonHalf' ? 25 : _context.t0 === 'LostHalf' ? 28 : _context.t0 === 'Push' ? 31 : _context.t0 === 'Postponed' ? 33 : _context.t0 === 'Canceled' ? 35 : 37;
												break;

											case 19:
												resultBet.orderStatus = 'Won';
												resultBet.orderResultAmount = openBet.eventsWagerDetail.WinAmount;
												return _context.abrupt('break', 39);

											case 22:
												resultBet.orderStatus = 'Lost';
												resultBet.orderResultAmount = -Number(openBet.eventsWagerDetail.RiskAmount);
												return _context.abrupt('break', 39);

											case 25:
												resultBet.orderStatus = 'WonHalf';
												resultBet.orderResultAmount = (Number(openBet.eventsWagerDetail.WinAmount) / 2).toFixed();
												return _context.abrupt('break', 39);

											case 28:
												resultBet.orderStatus = 'LostHalf';
												resultBet.orderResultAmount = -(Number(openBet.eventsWagerDetail.RiskAmount) / 2).toFixed();
												return _context.abrupt('break', 39);

											case 31:
												resultBet.orderStatus = 'Push';
												return _context.abrupt('break', 39);

											case 33:
												resultBet.orderStatus = 'Postponed';
												return _context.abrupt('break', 39);

											case 35:
												resultBet.orderStatus = 'Canceled';
												return _context.abrupt('break', 39);

											case 37:
												resultBet.orderStatus = 'Review';
												return _context.abrupt('return');

											case 39:
												if (!(openBet.betOption === 'Parlay')) {
													_context.next = 60;
													break;
												}

												_context.t1 = true;
												_context.next = _context.t1 === allEventsPush ? 43 : _context.t1 === allEventsCanceled ? 45 : _context.t1 === (!_lodash2.default.isEmpty(eventsHaveWon) && _lodash2.default.isEmpty(eventsHaveReview) && _lodash2.default.isEmpty(eventsHaveLost) && _lodash2.default.isEmpty(eventsHavePostponed) || allEventsWon) ? 47 : _context.t1 === !_lodash2.default.isEmpty(eventsHaveLost) ? 53 : _context.t1 === !_lodash2.default.isEmpty(eventsHavePostponed) ? 56 : 58;
												break;

											case 43:
												resultBet.orderStatus = 'Push';
												return _context.abrupt('break', 60);

											case 45:
												resultBet.orderStatus = 'Canceled';
												return _context.abrupt('break', 60);

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
												return _context.abrupt('break', 60);

											case 53:
												resultBet.orderStatus = 'Lost';
												resultBet.orderResultAmount = -Number(openBet.eventsWagerDetail.RiskAmount);
												return _context.abrupt('break', 60);

											case 56:
												resultBet.orderStatus = 'Postponed';
												return _context.abrupt('break', 60);

											case 58:
												resultBet.orderStatus = 'Review';
												return _context.abrupt('return');

											case 60:
												if (!(resultBet.orderStatus !== 'Pending')) {
													_context.next = 76;
													break;
												}

												if (!(resultBet.orderStatus !== 'Review' || resultBet.orderStatus !== 'Postponed')) {
													_context.next = 69;
													break;
												}

												newHistoryBet = new HistoryBet(resultBet);
												_context.next = 65;
												return newHistoryBet.save();

											case 65:
												_context.next = 67;
												return OpenBet.findOneAndRemove({ _id: openBet._id });

											case 67:
												_context.next = 74;
												break;

											case 69:
												newReviewBet = new ReviewBet(resultBet);
												_context.next = 72;
												return newReviewBet.save();

											case 72:
												_context.next = 74;
												return OpenBet.findOneAndRemove({ _id: openBet._id });

											case 74:
												_context.next = 77;
												break;

											case 76:
												console.log('open bet result calculate has error');

											case 77:
											case 'end':
												return _context.stop();
										}
									}
								}, _callee, this);
							}));

							return function (_x) {
								return _ref2.apply(this, arguments);
							};
						}())).then(function () {
							console.log('open bet result done');
						}).catch(function (error) {
							console.log('open bet result error');
							throw error;
						});

					case 6:
						_context2.next = 9;
						break;

					case 8:
						console.log('openBet is empty');

					case 9:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, this);
	}));

	return function openBetResult() {
		return _ref.apply(this, arguments);
	};
}();

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _BetOrder = require('../models/BetOrder');

var _BetOrder2 = _interopRequireDefault(_BetOrder);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var OpenBet = _BetOrder2.default.OpenBet;
var ReviewBet = _BetOrder2.default.ReviewBet;
var HistoryBet = _BetOrder2.default.HistoryBet;
exports.default = openBetResult;
//# sourceMappingURL=openBetResult.js.map