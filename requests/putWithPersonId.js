const {updateUser} = require("../repository");
const {getUsers} = require("../repository");

exports.putWithPersonId = async (req,res,validate, personId) => {
    try {
        let body = '';
        await req.on('data', (data) => {
            body += data
        })
        let newUser = JSON.parse(body)

        let users = await getUsers()
        if (validate.test(personId)) {
            const indexUser = users.findIndex(u => u.id === personId)
            if (indexUser > -1) {
                users[indexUser].name = newUser.name
                // console.log(users[indexUser])
                await updateUser(newUser, indexUser)
                res.writeHead(200)
                res.end(JSON.stringify(users[indexUser]))
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