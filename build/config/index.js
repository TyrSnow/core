"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const production_1 = require("./production");
const development_1 = require("./development");
let config;
if (process.env.NODE_ENV === 'develop') {
    config = production_1.default;
}
else {
    config = development_1.default;
}
exports.default = config;
//# sourceMappingURL=index.js.map