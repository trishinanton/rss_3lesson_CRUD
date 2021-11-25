const {addUser} = require("./repository");
const {getUsers} = require("./repository");
const qs = require('querystring');
const {deleteUser} = require("./repository");
const {updateUser} = require("./repository");

exports.usersController = async (req, res) => {


    if (req.method === "POST") {
        let body = '';
        await req.on('data', (data) => {
            body += data
        })
        let newUser = JSON.parse(body)

        newUser.id = new Date().getTime()
        newUser.age = 18
        newUser.hobbies = ['sport', 'drive']

        try {
            let result = await addUser(newUser)
            res.writeHead(200)
            res.end(JSON.stringify(newUser));
        } catch (err) {
            res.writeHead(500)
            res.end('Something went wrong. Internal server error');
        }

    } else {
        try {
            let users = await getUsers()
            res.writeHead(200)
            res.end(JSON.stringify(users));
        } catch (err) {
            res.writeHead(500)
            res.end('Something went wrong. Internal server error')
        }

    }
}
