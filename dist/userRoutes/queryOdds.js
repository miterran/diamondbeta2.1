'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_axios2.default.defaults.headers.common['JsonOdds-API-Key'] = _config2.default.apiKey;
var router = _express2.default.Router();

router.post('/query-odds', function (req, res) {
	_axios2.default.get('https://jsonodds.com/api/odds').then(function (response) {
		var querys = req.body;
		var source3 = response.data;
		var eventOddList = [];
		source3.map(function (event) {
			event.Odds.map(function (odd) {
				var newEvent = Object.assign({}, event);
				newEvent.OddDetail = odd;
				querys.map(function (query) {
					switch (true) {
						case newEvent.OddDetail.SiteID === 3 && query.sportIdx === 7 && newEvent.Sport === 7 && query.oddType === newEvent.OddDetail.OddType && query.leagueName === newEvent.League.Name && query.region === newEvent.DisplayRegion:
							newEvent.LeagueName = newEvent.League.Name;
							eventOddList.push(newEvent);
							break;
						case newEvent.OddDetail.SiteID === 3 && query.sportIdx !== 7 && newEvent.Sport !== 7 && query.sportIdx === newEvent.Sport && query.oddType === newEvent.OddDetail.OddType:
							eventOddList.push(newEvent);
							break;
						default:
							return;
					}
				});
			});
		});
		eventOddList.map(function (event) {
			event.HomeTeam = event.HomeTeam.toLowerCase().replace(/\b[a-z]/g, function (letter) {
				return letter.toUpperCase();
			});
			event.AwayTeam = event.AwayTeam.toLowerCase().replace(/\b[a-z]/g, function (letter) {
				return letter.toUpperCase();
			});
			event.WagerDetail = {
				WagerAmount: 0,
				BetConfirm: false,
				WinAmount: 0,
				RiskAmount: 0,
				ErrMsg: '',
				Status: 'Pending'
			};
			delete event.Odds;
			delete event.League;
			return event;
		});
		return res.json(eventOddList);
	}).catch(function (error) {
		console.log('query odd list failed');
		return res.status(404).send('query odd list failed');
	});
});

exports.default = router;

// import config from '../../config/config';
// // import sportConfig from '../utils/sportConfig';
// import _ from 'lodash';
// //import querystring from 'querystring';
// import axios from 'axios';
// axios.defaults.headers.common['JsonOdds-API-Key'] = config.apiKey;

// // const sortOddTypes = ["Game", "First Half", "Second Half", "First Quarter", "Second Quarter", "Third Quarter", "Fourth Quarter", "First Period", "Second Period", "Third Period", "First Five Innings", "First Inning"]

// function oddsList(req, res) {


// 	axios.get('https://jsonodds.com/api/odds').then(response => {
// 		const querys = req.body;
// 		const source3 = response.data;
// 		const eventList = [];
// 		source3.map(event => { event.Odds.map(odd => {
// 				const newEvent = Object.assign({}, event);
// 				newEvent.OddDetail = odd;
// 				querys.map(query => {
// 					switch(true){
// 						case newEvent.OddDetail.SiteID === 3 && query.sportIdx === 7 && newEvent.Sport === 7 && query.oddType === newEvent.OddDetail.OddType && query.leagueName === newEvent.League.Name && query.region === newEvent.DisplayRegion:
// 								newEvent.LeagueName = newEvent.League.Name;
// 								eventList.push(newEvent);
// 							break;
// 						case newEvent.OddDetail.SiteID === 3 && query.sportIdx !== 7 && newEvent.Sport !== 7 && query.sportIdx === newEvent.Sport && query.oddType === newEvent.OddDetail.OddType:
// 								eventList.push(newEvent);
// 							break;
// 						default:
// 							return
// 					}
// 				})
// 			})
// 		})
// 		eventList.map(event => {
// 			event.HomeTeam = event.HomeTeam.toLowerCase().replace(/\b[a-z]/g, letter => letter.toUpperCase())
// 			event.AwayTeam = event.AwayTeam.toLowerCase().replace(/\b[a-z]/g, letter => letter.toUpperCase())
// 			event.WagerDetail = {
// 				WagerAmount: 0, 
// 				BetConfirm: false, 
// 				WinAmount: 0, 
// 				RiskAmount: 0,
// 				ErrMsg: ''
// 			};
// 			delete event.Odds
// 			delete event.League
// 			return event
// 		})
// 		return res.json(eventList)
// 	}).catch(error => {
//         console.log('query odd list failed')
//         return res.status(404).send('query odd list failed')
//     })
// }


// export default { oddsList };
//# sourceMappingURL=queryOdds.js.map