'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

var Schema = _mongoose2.default.Schema;

var BetOrderSchema = new _mongoose2.default.Schema({
    orderNumber: {
        type: String,
        required: true
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
    user: {
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
        default: 'Pending'
    },
    orderResultAmount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    completedAt: {
        type: Date
    }
});

// const OpenBet = mongoose.model('openbet', OpenBetSchema);

exports.default = {
    OpenBet: _mongoose2.default.model('openbet', BetOrderSchema),
    HistoryBet: _mongoose2.default.model('historybet', BetOrderSchema),
    ReviewBet: _mongoose2.default.model('reviewbet', BetOrderSchema)
};
//# sourceMappingURL=BetOrder.js.map