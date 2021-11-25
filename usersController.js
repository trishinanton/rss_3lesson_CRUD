const {addUser} = require("./repository");
const {getUsers} = require("./repository");
const qs = require('querystring');
const {deleteUser} = require("./repository");
const {updateUser} = require("./repository");

exports.usersController = async (req, res)=>{


    if (req.method === "POST"){

        let body = '';
        await req.on('data',  (data)=>{
            body +=data
        })
        let newUser = JSON.parse(body)

        newUser.id = new Date().getTime()
        newUser.age = 18
        newUser.hobbies = ['sport', 'drive']

        try{
            let result = await addUser(newUser)
            res.writeHead(200)
            res.end(JSON.stringify(newUser));
        }
        catch (err){
            res.writeHead(500)
            res.end('Something went wrong. Internal server error');
        }




    }else{
        try{
            let users = await getUsers()
            res.writeHead(200)
            res.end(JSON.stringify(users));
        }
        catch (err){
            res.writeHead(500)
            res.end('Something went wrong. Internal server error')
        }

    }
}
exports.userIdController = async (req, res, personId)=>{

    if (req.method === "GET"){
        let users = await getUsers()
        if (Number(personId)){
            const user = users.filter(u=>u.id === Number(personId))
            if (user.length>0) {
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
    }

    if (req.method === "PUT"){

        let body = '';
        await req.on('data',  (data)=>{
            body +=data
        })
        let newUser = JSON.parse(body)

        let users = await getUsers()
        if (Number(personId)){
            const indexUser = users.findIndex(u=>u.id === Number(personId))
            if (indexUser>-1) {
                users[indexUser].name =newUser.name
                // console.log(users[indexUser])
                await updateUser(newUser,indexUser)
                res.writeHead(200)
                res.end(JSON.stringify(newUser))
            } else {
                res.writeHead(404)
                res.end(`user this ${personId} id not found`)
            }
        } else {
            res.writeHead(400)
            res.end('user id not valid')
        }
    }

    if(req.method === "DELETE"){
        let users = await getUsers()
        if (Number(personId)){
            const indexUser = users.findIndex(u=>u.id === Number(personId))
            if (indexUser>-1) {
                await deleteUser(indexUser)
                res.writeHead(200)
                res.end('user success delete')
            } else {
                res.writeHead(404)
                res.end(`user this ${personId} id not found`)
            }
        } else {
            res.writeHead(400)
            res.end('user id not valid')
        }
    }


}