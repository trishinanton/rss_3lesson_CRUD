const {deleteUser} = require("../repository");
const {getUsers} = require("../repository");

exports.deleteWithPersonId = async(res,validate, personId) =>{
    try {
        let users = await getUsers()
        if (validate.test(personId)) {
            const indexUser = users.findIndex(u => u.id === personId)
            if (indexUser > -1) {
                await deleteUser(indexUser)
                res.writeHead(204)
                res.end('user success delete')
            } else {
                res.writeHead(404)
                res.end(`user this ${personId} id not found`)
            }
        } else {
            res.writeHead(400)
            res.end('user id not valid')
        }
    } catch (err) {
        res.writeHead(500)
        res.end('Something went wrong. Internal server error')
    }
}
