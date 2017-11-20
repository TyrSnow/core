"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let model = new Schema({
    name: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        rel: 'User'
    }
});
const Doc = mongoose.model('Doc', model);
exports.default = Doc;
//# sourceMappingURL=Doc.model.js.map