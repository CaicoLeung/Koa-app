"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require("koa");
var app = new Koa();
var router_1 = require("./router/router");
var middleware_1 = require("./middleware");
middleware_1.default(app);
router_1.default(app);
app.listen(3000, function () {
    console.log("server is running at http://localhost:3000");
});
