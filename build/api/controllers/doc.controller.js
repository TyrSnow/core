"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const doc_service_1 = require("../services/doc.service");
const response_1 = require("../tools/response");
class DocCtrl {
    static create(req, res) {
        let { _id } = req.user;
        let { name } = req.body;
        doc_service_1.default.create_one(_id, name).then(response_1.SUCCESS(req, res, '[DocCtrl.create]')).catch(response_1.ERROR(req, res, '[DocCtrl.create]'));
    }
    static get_one_doc(req, res) {
        let { _id } = req.user;
        let { docId } = req.params;
        doc_service_1.default.get_doc_info(_id, docId).then(response_1.SUCCESS(req, res, '[DocCtrl.get_one_doc]')).catch(response_1.ERROR(req, res, '[DocCtrl.get_one_doc]'));
    }
    static query_docs(req, res) {
        let { _id } = req.user;
        let { i = 1, s = 10 } = req.query;
        doc_service_1.default.count_user_doc(_id).then((count) => {
            if (count < (i - 1) * s) {
                return Promise.resolve({
                    list: [],
                    page: {
                        i: i,
                        s: s,
                        c: count
                    }
                });
            }
            else {
                return doc_service_1.default.list_user_doc(_id, i, s).then((list) => {
                    return Promise.resolve({
                        list: list,
                        page: {
                            i: i,
                            s: s,
                            c: count
                        }
                    });
                });
            }
        }).then(response_1.SUCCESS(req, res, '[DocCtrl.query_docs]')).catch(response_1.ERROR(req, res, '[DocCtrl.query_docs]'));
    }
}
exports.default = DocCtrl;
//# sourceMappingURL=doc.controller.js.map