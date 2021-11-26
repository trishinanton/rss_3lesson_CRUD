const http = require('http');
const {userIdController} = require("./usersIdController");
const {usersController} = require("./usersController");



console.log(process.env.NODE_ENV)

let cors = (req, res) => {
    //Set CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Request-Method", "*");
    res.setHeader("Access-Control-Allow-Methods", 'OPTIONS, GET, PUT, DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader('Access-Control-Allow-Credentials', true);

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return
    }
}

//handle all error in app, then app not destroy
process.on('unhandledRejection', (reason, p) => {
    console.log(reason, p)
})

let server = http.createServer( (req, res) => {

    if (cors(req, res)) return;

    let param = req.url.split("/")
    let index = param.indexOf('person')
    let personId = param[index+1]

    switch (req.url) {
        case "/person":
            usersController(req, res);
            break;
        case `/person/${personId}`:
            userIdController(req, res, personId);
            break;
        default:
            res.writeHead(404)
            res.end("PAGE NOT FOUND, WRITE CORRECT URL")
    }
});

module.exports={
    server
}