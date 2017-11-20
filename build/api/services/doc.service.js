"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Doc_model_1 = require("../models/Doc.model");
const Code_enum_1 = require("../constants/Code.enum");
class DocSrv {
    static create_one(userId, name) {
        let doc = new Doc_model_1.default({
            name: name,
            creator: userId
        });
        return doc.save().then(_doc => Promise.resolve(_doc._id));
    }
    static list_user_doc(userId, index, size) {
        return Doc_model_1.default.find({
            creator: userId
        }).skip(size * (index - 1)).limit(size - 0).then(res => Promise.resolve(res));
    }
    static count_user_doc(userId) {
        return Doc_model_1.default.count({
            creator: userId
        }).exec();
    }
    static get_doc_info(userId, docId) {
        return Doc_model_1.default.findOne({
            _id: docId
        }).then((res) => {
            if (res) {
                if (res.creator == userId) {
                    return Promise.resolve(res);
                }
                else {
                    return Promise.reject(Code_enum_1.default.NO_AUTH_TO_ACCESS_RESOURCE);
                }
            }
            else {
                return Promise.reject(Code_enum_1.default.DOC_NOT_EXIST);
            }
        });
    }
    static delete_doc(docId) {
        return Doc_model_1.default.findOneAndRemove({
            _id: docId
        }).then((doc) => {
            if (doc) {
                return Promise.resolve(doc);
            }
            else {
                return Promise.reject(Code_enum_1.default.DOC_NOT_EXIST);
            }
        });
    }
}
exports.default = DocSrv;
//# sourceMappingURL=doc.service.js.map