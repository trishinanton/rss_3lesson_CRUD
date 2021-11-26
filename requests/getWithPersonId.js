const {getUsers} = require("../repository");

exports.getWithPersonId = async (res,validate, personId) => {
    try {
        let users = await getUsers()
        if (validate.test(personId)) {
            const user = users.filter(u => u.id === personId)
            if (user.length > 0) {
                res.writeHead(200)
                res.end(JSON.stringify(user))
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
