"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (ctx, message, commonInfo) {
    var _a = ctx.request, method = _a.method, url = _a.url, host = _a.host, headers = _a.headers;
    var client = {
        method: method,
        url: url,
        host: host,
        message: message,
        referer: headers['referer'],
        userAgent: headers['user-agent']
    };
    return JSON.stringify(Object.assign(commonInfo, client));
});
