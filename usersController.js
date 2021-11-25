const {addUser} = require("./repository");
const {getUsers} = require("./repository");
const qs = require('querystring');
const {deleteUser} = require("./repository");
const {updateUser} = require("./repository");
const uuid = require('uuid');
const {getReq} = require("./requests/getReq");
const {postReq} = require("./requests/postReq");

exports.usersController = async (req, res) => {

    if (req.method === "POST") {
        postReq(req,res)

    } else {
        getReq(res)

    }
}
