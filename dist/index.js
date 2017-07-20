'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

require('babel-polyfill');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _methodOverride = require('method-override');

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _jwtStrategy = require('./middleware/jwtStrategy');

var _jwtStrategy2 = _interopRequireDefault(_jwtStrategy);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _fetchLeagues = require('./userRoutes/fetchLeagues');

var _fetchLeagues2 = _interopRequireDefault(_fetchLeagues);

var _queryOdds = require('./userRoutes/queryOdds');

var _queryOdds2 = _interopRequireDefault(_queryOdds);

var _straightWagerSubmit = require('./userRoutes/straightWagerSubmit');

var _straightWagerSubmit2 = _interopRequireDefault(_straightWagerSubmit);

var _parlayWagerSubmit = require('./userRoutes/parlayWagerSubmit');

var _parlayWagerSubmit2 = _interopRequireDefault(_parlayWagerSubmit);

var _fetchUserOpenBets = require('./userRoutes/fetchUserOpenBets');

var _fetchUserOpenBets2 = _interopRequireDefault(_fetchUserOpenBets);

var _fetchUserHistoryBets = require('./userRoutes/fetchUserHistoryBets');

var _fetchUserHistoryBets2 = _interopRequireDefault(_fetchUserHistoryBets);

var _fetchUserState = require('./userRoutes/fetchUserState');

var _fetchUserState2 = _interopRequireDefault(_fetchUserState);

var _userUtils = require('./userRoutes/userUtils');

var _userUtils2 = _interopRequireDefault(_userUtils);

var _fetchAgentState = require('./agentRoutes/fetchAgentState');

var _fetchAgentState2 = _interopRequireDefault(_fetchAgentState);

var _fetchAgentTransactions = require('./agentRoutes/fetchAgentTransactions');

var _fetchAgentTransactions2 = _interopRequireDefault(_fetchAgentTransactions);

var _fetchAgentOpenBets = require('./agentRoutes/fetchAgentOpenBets');

var _fetchAgentOpenBets2 = _interopRequireDefault(_fetchAgentOpenBets);

var _fetchAgentHistoryBets = require('./agentRoutes/fetchAgentHistoryBets');

var _fetchAgentHistoryBets2 = _interopRequireDefault(_fetchAgentHistoryBets);

var _fetchAgentUserSetting = require('./agentRoutes/fetchAgentUserSetting');

var _fetchAgentUserSetting2 = _interopRequireDefault(_fetchAgentUserSetting);

var _depositCreditToAgent = require('./superAgentRoutes/depositCreditToAgent');

var _depositCreditToAgent2 = _interopRequireDefault(_depositCreditToAgent);

var _authLogin = require('./routes/authLogin');

var _authLogin2 = _interopRequireDefault(_authLogin);

var _confirmEventsResult = require('./routes/confirmEventsResult');

var _confirmEventsResult2 = _interopRequireDefault(_confirmEventsResult);

var _nodeSchedule = require('node-schedule');

var _nodeSchedule2 = _interopRequireDefault(_nodeSchedule);

var _openBetPending = require('./schedule/openBetPending');

var _openBetPending2 = _interopRequireDefault(_openBetPending);

var _openBetResult = require('./schedule/openBetResult');

var _openBetResult2 = _interopRequireDefault(_openBetResult);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_passport2.default.use(_jwtStrategy2.default);

_mongoose2.default.Promise = global.Promise;;
_mongoose2.default.connect(_config2.default.mongoURL);

var app = (0, _express2.default)();
app.server = _http2.default.createServer(app);

// logger
app.use((0, _morgan2.default)('dev'));

// 3rd party middleware
app.use((0, _helmet2.default)());
app.use((0, _cors2.default)());
app.use((0, _compression2.default)());
app.use((0, _methodOverride2.default)());

app.use(_passport2.default.initialize());

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.use(_express2.default.static(_path2.default.resolve(__dirname, '../client/build')));

app.get('/api', function (req, res) {
	res.send('test api');
});

app.use('/api', _authLogin2.default);
app.use('/api', _confirmEventsResult2.default);

app.use('/api/user', _passport2.default.authenticate('jwt', { session: false }));
app.use('/api/user', _fetchLeagues2.default);
app.use('/api/user', _queryOdds2.default);
app.use('/api/user', _straightWagerSubmit2.default);
app.use('/api/user', _parlayWagerSubmit2.default);
app.use('/api/user', _fetchUserOpenBets2.default);
app.use('/api/user', _fetchUserHistoryBets2.default);
app.use('/api/user', _fetchUserState2.default);
app.use('/api/user', _userUtils2.default);

app.use('/api/agent', _passport2.default.authenticate('jwt', { session: false }));
app.use('/api/agent', _fetchAgentState2.default);
app.use('/api/agent', _fetchAgentTransactions2.default);
app.use('/api/agent', _fetchAgentOpenBets2.default);
app.use('/api/agent', _fetchAgentHistoryBets2.default);
app.use('/api/agent', _fetchAgentUserSetting2.default);

app.use('/api/super-agent', _depositCreditToAgent2.default);

app.get('*', function (request, response) {
	response.sendFile(_path2.default.resolve(__dirname, '../client/build', 'index.html'));
});

_nodeSchedule2.default.scheduleJob('59 * * * *', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
	return regeneratorRuntime.wrap(function _callee$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					console.log(new Date());
					_context.next = 3;
					return (0, _openBetPending2.default)();

				case 3:
					_context.next = 5;
					return (0, _openBetResult2.default)();

				case 5:
				case 'end':
					return _context.stop();
			}
		}
	}, _callee, this);
})));

app.server.listen(process.env.PORT || 8080, function () {
	console.log('Started on port ' + app.server.address().port);
});

exports.default = app;
//# sourceMappingURL=index.js.map