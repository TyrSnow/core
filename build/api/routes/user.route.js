"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_jsonschema_1 = require("express-jsonschema");
const auth_1 = require("../tools/auth");
const user_controller_1 = require("../controllers/user.controller");
const user_schemas_1 = require("../schemas/user.schemas");
let userRoutes = express_1.Router();
userRoutes.post('/', express_jsonschema_1.validate(user_schemas_1.default.regist), user_controller_1.default.regist);
userRoutes.put('/Password', auth_1.requestUser, express_jsonschema_1.validate(user_schemas_1.default.changePassword), user_controller_1.default.change_password);
exports.default = userRoutes;
//# sourceMappingURL=user.route.js.map