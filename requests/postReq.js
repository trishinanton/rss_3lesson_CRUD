const {addUser} = require("../repository");
const uuid = require('uuid');

exports.postReq = async (req, res)=>{
    let body = '';
    await req.on('data', (data) => {
        body += data
    })
    let newUser = JSON.parse(body)
    newUser.id = uuid.v1()

    //check required fields
    if(newUser.name && newUser.age && newUser.hobbies){
        try {
            let result = await addUser(newUser)
            res.writeHead(200)
            res.end(JSON.stringify(newUser));
        } catch (err) {
            res.writeHead(500)
            res.end('Something went wrong. Internal server error');
        }
    } else{
        res.writeHead(400)
        res.end('Specify required fields')
    }
}