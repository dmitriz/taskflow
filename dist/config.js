"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SIGNATURE = exports.QUERY_FILTERS = exports.SETTINGS = void 0;
var SETTINGS;
(function (SETTINGS) {
    SETTINGS[SETTINGS["MAX_EMAILS_TO_FETCH"] = 10] = "MAX_EMAILS_TO_FETCH";
})(SETTINGS || (exports.SETTINGS = SETTINGS = {}));
var QUERY_FILTERS;
(function (QUERY_FILTERS) {
    QUERY_FILTERS["SELF_SENT_UNREAD"] = "is:unread from:me to:me";
})(QUERY_FILTERS || (exports.QUERY_FILTERS = QUERY_FILTERS = {}));
var SIGNATURE;
(function (SIGNATURE) {
    SIGNATURE["SEPARATOR"] = "Best wishes";
})(SIGNATURE || (exports.SIGNATURE = SIGNATURE = {}));
