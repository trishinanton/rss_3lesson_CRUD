const {getUsers} = require("../repository");

exports.getReq = async(res)=>{
    try {
        let users = await getUsers()
        res.writeHead(200)
        res.end(JSON.stringify(users));
    } catch (err) {
        res.writeHead(500)
        res.end('Something went wrong. Internal server error')
    }
}