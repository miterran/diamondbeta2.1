'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap


// /api/fetch-leagues
router.get('/fetch-leagues', function (req, res) {
  res.send('hi');
});

exports.default = router;

// import config from '../../config/config';
// import sportConfig from '../utils/sportConfig';
// import axios from 'axios';
// axios.defaults.headers.common['JsonOdds-API-Key'] = config.apiKey;

// const sortOddTypes = ["Game", "First Half", "Second Half", "First Quarter", "Second Quarter", "Third Quarter", "Fourth Quarter", "First Period", "Second Period", "Third Period", "First Five Innings", "First Inning"]

// function leaguesList(req, res) {

//         axios.get('https://jsonodds.com/api/odds').then(response => {
//         const masterData = response.data;

//         masterData.map(function(event, eventIdx){
//             switch(event.Sport){
//                 case 0: // MLB Baseball
//                 case 1: // NBA Basketball
//                 case 2: // NCAAB Basketball
//                 case 3: // NCAAF Football
//                 case 4: // NFL Football
//                 case 5: // NHL Hockey
//                 case 8: // WNBA Basketball
//                 case 10: // BOXING
//                 case 11: // MMA
//                 case 12: // CRICKET
//                 case 14: // KHL Hockey
//                 case 15: // AHL Hockey
//                 case 16: // SHL Hockey
//                 case 17: // HALL
//                 case 18: // LMP
//                 case 19: // NPB Baseball
//                 case 20: // KBO Baseball
//                 case 21: // Golf
//                 case 22: // RUGBY Football
//                 case 23: // WBC BaseBall
//                     Array.isArray(sportConfig[event.Sport].leagues) ? null : sportConfig[event.Sport].leagues = [{leagueName: '', region: '', details: '', oddTypes: []}];
//                     event.Odds.map(odd => {
//                         const addOdd = sportConfig[event.Sport].leagues[0].oddTypes.every(oddType => oddType !== odd.OddType);
//                         addOdd ? sportConfig[event.Sport].leagues[0].oddTypes.push(odd.OddType) : null;
//                         return odd;
//                     })
//                     sportConfig[event.Sport].leagues[0].oddTypes.sort((a, b) => sortOddTypes.indexOf(a) - sortOddTypes.indexOf(b))
//                     break;
//                 case 7: // SOCCER
//                     Array.isArray(sportConfig[7].leagues) ? null : sportConfig[7].leagues = [];
//                     const soccerDetail = { leagueName: event.League.Name , region: event.DisplayRegion, details: '', oddTypes: [] };
//                     const addSoccerDetail = sportConfig[7].leagues.every(detail => detail.name !== event.League.Name && detail.region !== event.DisplayRegion);
//                     addSoccerDetail ? sportConfig[7].leagues.push(soccerDetail) : null;
//                     event.Odds.map(odd => {
//                         sportConfig[7].leagues.map(detail => {
//                             if(detail.leagueName === event.League.Name && detail.region === event.DisplayRegion){
//                                 const addOdd = detail.oddTypes.every(oddType => oddType !== odd.OddType);
//                                 addOdd ? detail.oddTypes.push(odd.OddType) : null;
//                                 detail.oddTypes.sort((a, b) => sortOddTypes.indexOf(a) - sortOddTypes.indexOf(b))
//                             }
//                             return detail;
//                         })
//                         return odd;
//                     })

//                     break;
//                 default:
//                     return;
//             }  
//             return event;
//         })


//         return res.json(sportConfig);
//     }).catch(error => {
//         console.log('fetch leagues list failed')
//         return res.status(404).send('fetch leagues list failed')
//     })
// }


// export default { leaguesList };
//# sourceMappingURL=fetchLeagues.js.map