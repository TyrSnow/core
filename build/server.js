"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const log4js = require("log4js");
const bodyParser = require("body-parser");
// 启动环境
require("./start");
const routes_1 = require("./api/routes");
const config_1 = require("./config");
let app = express();
// 配置连接日志
let logger = log4js.getLogger('default');
app.use(log4js.connectLogger(logger, {
    level: 'auto',
    format: ':method :url'
}));
// 处理参数
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes_1.default);
// 后置错误处理
let error = log4js.getLogger('error');
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(500).send({
        note: 'Unrecognized Error'
    });
});
// 启动服务器
app.listen(config_1.default.PORT, () => {
    console.log('Server start at port: ', config_1.default.PORT);
});
