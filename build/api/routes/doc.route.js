"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_jsonschema_1 = require("express-jsonschema");
const auth_1 = require("../tools/auth");
const doc_controller_1 = require("../controllers/doc.controller");
const doc_schemas_1 = require("../schemas/doc.schemas");
let docRoutes = express_1.Router();
docRoutes.post('/', auth_1.requestUser, express_jsonschema_1.validate(doc_schemas_1.default.create), doc_controller_1.default.create);
docRoutes.get('/:docId', auth_1.requestUser, express_jsonschema_1.validate(doc_schemas_1.default.getOneDoc), doc_controller_1.default.get_one_doc);
docRoutes.get('/', auth_1.requestUser, express_jsonschema_1.validate(doc_schemas_1.default.queryDocs), doc_controller_1.default.query_docs);
exports.default = docRoutes;
//# sourceMappingURL=doc.route.js.map