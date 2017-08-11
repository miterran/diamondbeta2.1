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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_axios2.default.defaults.headers.common['JsonOdds-API-Key'] = _config2.default.apiKey;
var router = _express2.default.Router();

router.get('/fetch-leagues', function (req, res) {
    _axios2.default.get('https://jsonodds.com/api/odds').then(function (response) {
        var masterData = response.data;
        masterData.map(function (event) {
            switch (event.Sport) {
                case 0: // MLB Baseball
                case 1: // NBA Basketball
                case 2: // NCAAB Basketball
                case 3: // NCAAF Football
                case 4: // NFL Football
                case 5: // NHL Hockey
                case 8: // WNBA Basketball
                case 10: // BOXING
                case 11: // MMA
                //                case 12: // CRICKET
                case 14: // KHL Hockey
                case 15: // AHL Hockey
                case 16: // SHL Hockey
                //                case 17: // HALL
                //                case 18: // LMP
                case 19: // NPB Baseball
                case 20: // KBO Baseball
                //                case 21: // Golf
                case 22: // RUGBY Football
                case 23:
                    // WBC BaseBall
                    Array.isArray(_sportConfig2.default[event.Sport].leagues) ? null : _sportConfig2.default[event.Sport].leagues = [{ leagueName: '', region: '', details: '', oddTypes: [] }];
                    event.Odds.map(function (odd) {
                        var addOdd = _sportConfig2.default[event.Sport].leagues[0].oddTypes.every(function (oddType) {
                            return oddType !== odd.OddType;
                        });
                        addOdd ? _sportConfig2.default[event.Sport].leagues[0].oddTypes.push(odd.OddType) : null;
                        return odd;
                    });

                    break;
                // case 7: // SOCCER
                //     Array.isArray(sportConfig[7].leagues) ? null : sportConfig[7].leagues = [];
                //     const soccerDetail = { leagueName: event.League.Name , region: event.DisplayRegion, details: '', oddTypes: [] };
                //     const addSoccerDetail = sportConfig[7].leagues.every(detail => detail.name !== event.League.Name && detail.region !== event.DisplayRegion);
                //     addSoccerDetail ? sportConfig[7].leagues.push(soccerDetail) : null;
                //     event.Odds.map(odd => {
                //         sportConfig[7].leagues.map(detail => {
                //             if(detail.leagueName === event.League.Name && detail.region === event.DisplayRegion){
                //                 const addOdd = detail.oddTypes.every(oddType => oddType !== odd.OddType);
                //                 addOdd ? detail.oddTypes.push(odd.OddType) : null;
                //             }
                //             return detail;
                //         })
                //         return odd;
                //     })
                //     break;
                default:
                    return;
            }
            return event;
        });
        return res.json(_sportConfig2.default);
    }).catch(function (error) {
        console.log('fetch leagues list failed');
        return res.status(404).send('fetch leagues list failed');
    });
});

exports.default = router;

//detail.oddTypes.sort((a, b) => sortOddTypes.indexOf(a) - sortOddTypes.indexOf(b))
//# sourceMappingURL=fetchLeagues.js.map