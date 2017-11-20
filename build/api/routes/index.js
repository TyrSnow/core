"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("./user.route");
const session_route_1 = require("./session.route");
const doc_route_1 = require("./doc.route");
let routes = express_1.Router();
routes.use('/Users', user_route_1.default);
routes.use('/Sessions', session_route_1.default);
routes.use('/Documents', doc_route_1.default);
routes.use((req, res) => {
    res.status(404).json({
        note: 'Can not find resources.'
    });
});
exports.default = routes;
//# sourceMappingURL=index.js.map