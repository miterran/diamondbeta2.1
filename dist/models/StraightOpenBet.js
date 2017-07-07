'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _uniqid = require('uniqid');

var _uniqid2 = _interopRequireDefault(_uniqid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;


var Schema = _mongoose2.default.Schema;

var OpenBetSchema = new _mongoose2.default.Schema({
    orderNumber: {
        type: String,
        default: _uniqid2.default.process().toUpperCase()
    },
    betOption: {
        type: String,
        required: true
    },
    superAgent: {
        type: String,
        required: true
    },
    agent: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    events: {
        type: Array,
        required: true
    },
    eventsWagerDetail: {
        type: Object,
        required: true
    },
    orderStatus: {
        type: Object,
        default: 'open'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

var OpenBet = _mongoose2.default.model('openBet', OpenBetSchema);

exports.default = OpenBet;
//# sourceMappingURL=StraightOpenBet.js.map