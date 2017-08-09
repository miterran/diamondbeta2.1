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


router.post('/parlay-wager-submit', function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(req, res) {
		var latestParlayOddsWagerList, reqBodyParlayEvents, orderExist, existParlayOrders;
		return regeneratorRuntime.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						latestParlayOddsWagerList = [];
						reqBodyParlayEvents = [];
						orderExist = false;


						req.body.parlayList.map(function (event) {
							return reqBodyParlayEvents.push(event.OddPickID);
						});

						_context3.next = 6;
						return OpenBet.find({ 'user': req.user.username, 'betOption': 'Parlay' });

					case 6:
						existParlayOrders = _context3.sent;

						existParlayOrders.map(function (parlayOrder) {
							var existParlayOrderEvents = [];
							parlayOrder.events.map(function (event) {
								return existParlayOrderEvents.push(event.OddPickID);
							});

							if (orderExist) return;
							if (_lodash2.default.difference(reqBodyParlayEvents, existParlayOrderEvents).length === 0) {
								req.body.parlayList.map(function (event) {
									event.WagerDetail.Status = 'Existed';
									event.WagerDetail.ErrMsg = 'Order Existed ' + parlayOrder.orderNumber;
									event.WagerDetail.RiskAmount = 0;
									event.WagerDetail.WinAmount = 0;
									event.WagerDetail.WagerAmount = 0;
									event.WagerDetail.BetConfirm = false;
									latestParlayOddsWagerList.push(event);
								});
								orderExist = true;
							}
						});

						if (!orderExist) {
							_context3.next = 12;
							break;
						}

						res.status(202).json(latestParlayOddsWagerList);
						_context3.next = 14;
						break;

					case 12:
						_context3.next = 14;
						return Promise.all(req.body.parlayList.map(function () {
							var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(event) {
								var queryOdd, response, quarter;
								return regeneratorRuntime.wrap(function _callee$(_context) {
									while (1) {
										switch (_context.prev = _context.next) {
											case 0:
												queryOdd = _querystring2.default.stringify({ GameIDs: event.ID, Source: event.OddDetail.SiteID, Sport: _sportConfig2.default[event.Sport].sport, OddType: event.BetDetail.OddType.replace(/\s/g, '') });
												_context.next = 3;
												return _axios2.default.post('https://jsonodds.com/api/odds/bygames', queryOdd);

											case 3:
												response = _context.sent;
												_context.t0 = true;
												_context.next = _context.t0 === _lodash2.default.isEmpty(response.data) ? 7 : _context.t0 === (0, _moment2.default)().isAfter((0, _moment2.default)(event.MatchTimePST)) ? 16 : 25;
												break;

											case 7:
												event.WagerDetail.Status = 'NotFound';
												event.WagerDetail.ErrMsg = 'Event Not Found';
												event.WagerDetail.RiskAmount = 0;
												event.WagerDetail.WinAmount = 0;
												event.WagerDetail.WagerAmount = 0;
												event.WagerDetail.BetConfirm = false;
												delete event.PrevBetDetail;
												latestParlayOddsWagerList.push(event);
												return _context.abrupt('break', 84);

											case 16:
												event.WagerDetail.Status = 'TimeOut';
												event.WagerDetail.ErrMsg = 'Event Time Out';
												event.WagerDetail.RiskAmount = 0;
												event.WagerDetail.WinAmount = 0;
												event.WagerDetail.WagerAmount = 0;
												event.WagerDetail.BetConfirm = false;
												delete event.PrevBetDetail;
												latestParlayOddsWagerList.push(event);
												return _context.abrupt('break', 84);

											case 25:
												event.OddDetail = response.data[0].Odds[0];
												event.OddDetail.LastUpdatedPST = (0, _moment2.default)(response.data[0].Odds[0].lastUpdated).subtract('7', 'hours');
												delete event.OddDetail.LastUpdated;
												event.PrevBetDetail = Object.assign({}, event.BetDetail);
												_context.t1 = true;
												_context.next = _context.t1 === (event.BetDetail.BetType === 'M-Line' && event.BetDetail.OddTarget === 'Home') ? 32 : _context.t1 === (event.BetDetail.BetType === 'M-Line' && event.BetDetail.OddTarget === 'Away') ? 34 : _context.t1 === (event.BetDetail.BetType === 'Spread' && event.BetDetail.OddTarget === 'Home') ? 36 : _context.t1 === (event.BetDetail.BetType === 'Spread' && event.BetDetail.OddTarget === 'Away') ? 39 : _context.t1 === (event.BetDetail.BetType === 'Total' && event.BetDetail.OddTarget === 'Over') ? 42 : _context.t1 === (event.BetDetail.BetType === 'Total' && event.BetDetail.OddTarget === 'Under') ? 45 : _context.t1 === (event.BetDetail.BetType === 'Draw' && event.Sport === 7) ? 48 : 50;
												break;

											case 32:
												event.BetDetail.OddLine = event.OddDetail.MoneyLineHome;
												return _context.abrupt('break', 51);

											case 34:
												event.BetDetail.OddLine = event.OddDetail.MoneyLineAway;
												return _context.abrupt('break', 51);

											case 36:
												event.BetDetail.OddPoint = event.OddDetail.PointSpreadHome;
												event.BetDetail.OddLine = event.OddDetail.PointSpreadHomeLine;
												return _context.abrupt('break', 51);

											case 39:
												event.BetDetail.OddPoint = event.OddDetail.PointSpreadAway;
												event.BetDetail.OddLine = event.OddDetail.PointSpreadAwayLine;
												return _context.abrupt('break', 51);

											case 42:
												event.BetDetail.OddPoint = event.OddDetail.TotalNumber;
												event.BetDetail.OddLine = event.OddDetail.OverLine;
												return _context.abrupt('break', 51);

											case 45:
												event.BetDetail.OddPoint = event.OddDetail.TotalNumber;
												event.BetDetail.OddLine = event.OddDetail.UnderLine;
												return _context.abrupt('break', 51);

											case 48:
												event.BetDetail.OddLine = event.OddDetail.DrawLine;
												return _context.abrupt('break', 51);

											case 50:
												return _context.abrupt('return');

											case 51:
												quarter = (event.BetDetail.OddPoint % 1).toFixed(2);
												_context.t2 = true;
												_context.next = _context.t2 === (Number(event.BetDetail.OddLine) === 0) ? 55 : _context.t2 === (Number(quarter) === 0.25 || Number(quarter) === 0.75) ? 64 : _context.t2 === (JSON.stringify(event.BetDetail) !== JSON.stringify(event.PrevBetDetail)) ? 72 : 80;
												break;

											case 55:
												event.WagerDetail.Status = 'NotAvailable';
												event.WagerDetail.ErrMsg = 'Wager Currently Not Available';
												event.WagerDetail.RiskAmount = 0;
												event.WagerDetail.WinAmount = 0;
												event.WagerDetail.WagerAmount = 0;
												event.WagerDetail.BetConfirm = false;
												delete event.PrevBetDetail;
												latestParlayOddsWagerList.push(event);
												return _context.abrupt('break', 83);

											case 64:
												event.WagerDetail.Status = 'Quarter';
												event.WagerDetail.ErrMsg = 'Wager Currently Not Available';
												event.WagerDetail.RiskAmount = 0;
												event.WagerDetail.WinAmount = 0;
												event.WagerDetail.WagerAmount = 0;
												event.WagerDetail.BetConfirm = false;
												latestParlayOddsWagerList.push(event);
												return _context.abrupt('break', 83);

											case 72:
												event.WagerDetail.Status = 'HasUpdated';
												event.WagerDetail.ErrMsg = 'Wager Has Been Updated';
												event.WagerDetail.RiskAmount = 0;
												event.WagerDetail.WinAmount = 0;
												event.WagerDetail.WagerAmount = 0;
												event.WagerDetail.BetConfirm = false;
												latestParlayOddsWagerList.push(event);
												return _context.abrupt('break', 83);

											case 80:
												delete event.PrevBetDetail;
												latestParlayOddsWagerList.push(event);
												return _context.abrupt('return');

											case 83:
												return _context.abrupt('return');

											case 84:
											case 'end':
												return _context.stop();
										}
									}
								}, _callee, undefined);
							}));

							return function (_x3) {
								return _ref2.apply(this, arguments);
							};
						}())).then(_asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
							var allBetConfirmed, newParlayOpenBet;
							return regeneratorRuntime.wrap(function _callee2$(_context2) {
								while (1) {
									switch (_context2.prev = _context2.next) {
										case 0:
											allBetConfirmed = latestParlayOddsWagerList.every(function (event) {
												return event.WagerDetail.BetConfirm === true;
											});

											if (!allBetConfirmed) {
												_context2.next = 10;
												break;
											}

											newParlayOpenBet = new OpenBet({
												orderNumber: _uniqid2.default.process().toUpperCase(),
												superAgent: req.user.superAgent,
												betOption: 'Parlay',
												agent: req.user.agent,
												user: req.user.username,
												events: [],
												eventsWagerDetail: {
													ErrMsg: '',
													RiskAmount: req.body.riskAmount,
													WinAmount: req.body.winAmount,
													Result: ''
												},
												createdAt: (0, _moment2.default)()
											});

											latestParlayOddsWagerList.map(function (event) {
												event.Status = 'Pending';
												delete event.WagerDetail;
												delete event.PrevBetDetail;
												newParlayOpenBet.events.push(event);
											});
											_context2.next = 6;
											return newParlayOpenBet.save();

										case 6:
											console.log('saved parpaly open bet');
											return _context2.abrupt('return', res.status(200).send('saved a parlay open bet order'));

										case 10:
											return _context2.abrupt('return', res.status(202).json(latestParlayOddsWagerList));

										case 11:
										case 'end':
											return _context2.stop();
									}
								}
							}, _callee2, undefined);
						}))).catch(function (error) {
							return res.status(404).send('parlay wager order submit error, unable save to database');
						});

					case 14:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, undefined);
	}));

	return function (_x, _x2) {
		return _ref.apply(this, arguments);
	};
}());

exports.default = router;
//# sourceMappingURL=parlayWagerSubmit.js.map