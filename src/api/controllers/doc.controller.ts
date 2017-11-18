export default class DocCtrl {
    static create(req, res) {
        let { _id } = req.user;
        let { name } = req.name;


    }
    static get_one_doc(req, res) {
        let { _id } = req.user;
        let { id } = req.params;

    }
    static query_docs(req, res) {
        
    }
}