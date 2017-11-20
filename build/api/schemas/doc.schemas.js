"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * DocCtrl对应的schemas
 */
const DocSchemas = {
    create: {
        body: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    required: true
                }
            }
        }
    },
    getOneDoc: {},
    queryDocs: {}
};
exports.default = DocSchemas;
//# sourceMappingURL=doc.schemas.js.map