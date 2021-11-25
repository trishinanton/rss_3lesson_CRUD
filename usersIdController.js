const {deleteWithPersonId} = require("./requests/deleteWithPersonId");
const {putWithPersonId} = require("./requests/putWithPersonId");
const {getWithPersonId} = require("./requests/getWithPersonId");
const {deleteUser} = require("./repository");
const {updateUser} = require("./repository");
const {getUsers} = require("./repository");

exports.userIdController = async (req, res, personId) => {
    const validate = /^[0-9A-F]{8}-[0-9A-F]{4}-[1][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

    if (req.method === "GET") {
        getWithPersonId(res,validate, personId)
    }

    if (req.method === "PUT") {
        putWithPersonId(req,res,validate, personId)
    }

    if (req.method === "DELETE") {
        deleteWithPersonId(res,validate, personId)
    }

}