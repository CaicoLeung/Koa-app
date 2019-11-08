"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var staticFiles = require("koa-static");
var nunjucks = require("koa-nunjucks-2");
var bodyParser = require("koa-bodyparser");
var mi_send_1 = require("./mi-send");
var mi_log_1 = require("./mi-log");
exports.default = (function (app) {
    app.use(mi_log_1.default());
    // 指定 public目录为静态资源目录，用来存放 js css images 等
    app.use(staticFiles(path.resolve(__dirname, '..', './public')));
    app.use(nunjucks({
        ext: 'html',
        path: path.join(__dirname, '..', 'views'),
        nunjucksConfig: {
            trimBlocks: true //开启转义, 防XSS攻击
        }
    }));
    // 解析request body
    app.use(bodyParser());
    app.use(mi_send_1.default());
});
