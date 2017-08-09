'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _sportConfig = require('../utils/sportConfig');

var _sportConfig2 = _interopRequireDefault(_sportConfig);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _BetOrder = require('../models/BetOrder');

var _BetOrder2 = _interopRequireDefault(_BetOrder);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _uniqid = require('uniqid');

var _uniqid2 = _interopRequireDefault(_uniqid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_axios2.default.defaults.headers.common['JsonOdds-API-Key'] = _config2.default.apiKey;
_axios2.default.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
var router = _express2.default.Router();

var OpenBet = _BetOrder2.default.OpenBet;


router.post('/straight-wager-submit', function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(req, res) {
		var latestStraightOddsWagerList;
		return regeneratorRuntime.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						latestStraightOddsWagerList = [];
						_context4.next = 3;
						return Promise.all(req.body.map(function () {
							var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(event) {
								var existStraightOrders, queryOdd, response;
								return regeneratorRuntime.wrap(function _callee$(_context) {
									while (1) {
										switch (_context.prev = _context.next) {
											case 0:
												_context.next = 2;
												return OpenBet.find({ 'user': req.user.username, 'betOption': 'Straight', 'events.OddPickID': event.OddPickID });

											case 2:
												existStraightOrders = _context.sent;

												if (_lodash2.default.isEmpty(existStraightOrders)) {
													_context.next = 13;
													break;
												}

												event.WagerDetail.Status = 'Existed';
												event.WagerDetail.ErrMsg = 'Order Number ' + existStraightOrders[0].orderNumber;
												event.WagerDetail.RiskAmount = 0;
												event.WagerDetail.WinAmount = 0;
												event.WagerDetail.WagerAmount = 0;
												event.WagerDetail.BetConfirm = false;
												latestStraightOddsWagerList.push(event);
												_context.next = 88;
												break;

											case 13:
												queryOdd = _querystring2.default.stringify({ GameIDs: event.ID, Source: event.OddDetail.SiteID, Sport: _sportConfig2.default[event.Sport].sport, OddType: event.BetDetail.OddType.replace(/\s/g, '') });
												_context.next = 16;
												return _axios2.default.post('https://jsonodds.com/api/odds/bygames', queryOdd);

											case 16:
												response = _context.sent;
												_context.t0 = true;
												_context.next = _context.t0 === _lodash2.default.isEmpty(response.data) ? 20 : _context.t0 === (0, _moment2.default)().isAfter((0, _moment2.default)(event.MatchTimePST)) ? 29 : 38;
												break;

											case 20:
												event.WagerDetail.Status = 'NotFound';
												event.WagerDetail.ErrMsg = 'Event Not Found';
												event.WagerDetail.RiskAmount = 0;
												event.WagerDetail.WinAmount = 0;
												event.WagerDetail.WagerAmount = 0;
												event.WagerDetail.BetConfirm = false;
												delete event.PrevBetDetail;
												latestStraightOddsWagerList.push(event);
												return _context.abrupt('break', 88);

											case 29:
												event.WagerDetail.Status = 'TimeOut';
												event.WagerDetail.ErrMsg = 'Event Time Out';
												event.WagerDetail.RiskAmount = 0;
												event.WagerDetail.WinAmount = 0;
												event.WagerDetail.WagerAmount = 0;
												event.WagerDetail.BetConfirm = false;
												delete event.PrevBetDetail;
												latestStraightOddsWagerList.push(event);
												return _context.abrupt('break', 88);

											case 38:
												event.OddDetail = response.data[0].Odds[0];
												event.OddDetail.LastUpdatedPST = (0, _moment2.default)(response.data[0].Odds[0].lastUpdated).subtract('7', 'hours');
												delete event.OddDetail.LastUpdated;
												event.PrevBetDetail = Object.assign({}, event.BetDetail);
												_context.t1 = true;
												_context.next = _context.t1 === (event.BetDetail.BetType === 'M-Line' && event.BetDetail.OddTarget === 'Home') ? 45 : _context.t1 === (event.BetDetail.BetType === 'M-Line' && event.BetDetail.OddTarget === 'Away') ? 47 : _context.t1 === (event.BetDetail.BetType === 'Spread' && event.BetDetail.OddTarget === 'Home') ? 49 : _context.t1 === (event.BetDetail.BetType === 'Spread' && event.BetDetail.OddTarget === 'Away') ? 52 : _context.t1 === (event.BetDetail.BetType === 'Total' && event.BetDetail.OddTarget === 'Over') ? 55 : _context.t1 === (event.BetDetail.BetType === 'Total' && event.BetDetail.OddTarget === 'Under') ? 58 : _context.t1 === (event.BetDetail.BetType === 'Draw' && event.Sport === 7) ? 61 : 63;
												break;

											case 45:
												event.BetDetail.OddLine = event.OddDetail.MoneyLineHome;
												return _context.abrupt('break', 64);

											case 47:
												event.BetDetail.OddLine = event.OddDetail.MoneyLineAway;
												return _context.abrupt('break', 64);

											case 49:
												event.BetDetail.OddPoint = event.OddDetail.PointSpreadHome;
												event.BetDetail.OddLine = event.OddDetail.PointSpreadHomeLine;
												return _context.abrupt('break', 64);

											case 52:
												event.BetDetail.OddPoint = event.OddDetail.PointSpreadAway;
												event.BetDetail.OddLine = event.OddDetail.PointSpreadAwayLine;
												return _context.abrupt('break', 64);

											case 55:
												event.BetDetail.OddPoint = event.OddDetail.TotalNumber;
												event.BetDetail.OddLine = event.OddDetail.OverLine;
												return _context.abrupt('break', 64);

											case 58:
												event.BetDetail.OddPoint = event.OddDetail.TotalNumber;
												event.BetDetail.OddLine = event.OddDetail.UnderLine;
												return _context.abrupt('break', 64);

											case 61:
												event.BetDetail.OddLine = event.OddDetail.DrawLine;
												return _context.abrupt('break', 64);

											case 63:
												return _context.abrupt('return');

											case 64:
												_context.t2 = true;
												_context.next = _context.t2 === (Number(event.BetDetail.OddLine) === 0) ? 67 : _context.t2 === (JSON.stringify(event.BetDetail) !== JSON.stringify(event.PrevBetDetail)) ? 76 : 84;
												break;

											case 67:
												event.WagerDetail.Status = 'NotAvailable';
												event.WagerDetail.ErrMsg = 'Wager Currently Not Available';
												event.WagerDetail.RiskAmount = 0;
												event.WagerDetail.WinAmount = 0;
												event.WagerDetail.WagerAmount = 0;
												event.WagerDetail.BetConfirm = false;
												delete event.PrevBetDetail;
												latestStraightOddsWagerList.push(event);
												return _context.abrupt('break', 87);

											case 76:
												event.WagerDetail.Status = 'HasUpdated';
												event.WagerDetail.ErrMsg = 'Wager Has Been Updated';
												event.WagerDetail.RiskAmount = 0;
												event.WagerDetail.WinAmount = 0;
												event.WagerDetail.WagerAmount = 0;
												event.WagerDetail.BetConfirm = false;
												latestStraightOddsWagerList.push(event);
												return _context.abrupt('break', 87);

											case 84:
												delete event.PrevBetDetail;
												latestStraightOddsWagerList.push(event);
												return _context.abrupt('return');

											case 87:
												return _context.abrupt('return');

											case 88:
											case 'end':
												return _context.stop();
										}
									}
								}, _callee, undefined);
							}));

							return function (_x3) {
								return _ref2.apply(this, arguments);
							};
						}())).then(_asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
							var allBetConfirmed;
							return regeneratorRuntime.wrap(function _callee3$(_context3) {
								while (1) {
									switch (_context3.prev = _context3.next) {
										case 0:
											allBetConfirmed = latestStraightOddsWagerList.every(function (event) {
												return event.WagerDetail.BetConfirm === true;
											});

											if (!allBetConfirmed) {
												_context3.next = 6;
												break;
											}

											_context3.next = 4;
											return Promise.all(latestStraightOddsWagerList.map(function () {
												var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(event) {
													var newStraightOpenBet;
													return regeneratorRuntime.wrap(function _callee2$(_context2) {
														while (1) {
															switch (_context2.prev = _context2.next) {
																case 0:
																	newStraightOpenBet = new OpenBet({
																		orderNumber: _uniqid2.default.process().toUpperCase(),
																		superAgent: req.user.superAgent,
																		betOption: 'Straight',
																		agent: req.user.agent,
																		user: req.user.username,
																		events: [],
																		eventsWagerDetail: {
																			ErrMsg: '',
																			RiskAmount: event.WagerDetail.RiskAmount,
																			WinAmount: event.WagerDetail.WinAmount
																		},
																		createdAt: (0, _moment2.default)()
																	});

																	event.Status = 'Pending';
																	delete event.WagerDetail;
																	delete event.PrevBetDetail;
																	newStraightOpenBet.events.push(event);
																	_context2.next = 7;
																	return newStraightOpenBet.save();

																case 7:
																	console.log('saved straight open bet');

																case 8:
																case 'end':
																	return _context2.stop();
															}
														}
													}, _callee2, undefined);
												}));

												return function (_x4) {
													return _ref4.apply(this, arguments);
												};
											}())).then(function () {
												console.log('done all straight open bet save');
												return res.status(200).send('saved all open bet order');
											}).catch(function (error) {
												return res.status(404).send('straight wager order submit error, unable save to database');
											});

										case 4:
											_context3.next = 7;
											break;

										case 6:
											return _context3.abrupt('return', res.status(202).json(latestStraightOddsWagerList));

										case 7:
										case 'end':
											return _context3.stop();
									}
								}
							}, _callee3, undefined);
						}))).catch(function (error) {
							return res.status(404).send('enable to create latestStraightOddsWagerList');
						});

					case 3:
					case 'end':
						return _context4.stop();
				}
			}
		}, _callee4, undefined);
	}));

	return function (_x, _x2) {
		return _ref.apply(this, arguments);
	};
}());
exports.default = router;
//# sourceMappingURL=straightWagerSubmit.js.map