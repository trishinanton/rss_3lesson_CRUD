const {getReq} = require("./requests/getReq");
const {postReq} = require("./requests/postReq");

exports.usersController = async (req, res) => {
    if (req.method === "POST") postReq(req,res)
    else getReq(res)
}
