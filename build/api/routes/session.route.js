"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_jsonschema_1 = require("express-jsonschema");
const user_controller_1 = require("../controllers/user.controller");
const user_schemas_1 = require("../schemas/user.schemas");
let sessionRoutes = express_1.Router();
sessionRoutes.post('/', express_jsonschema_1.validate(user_schemas_1.default.login), user_controller_1.default.login);
exports.default = sessionRoutes;
//# sourceMappingURL=session.route.js.map