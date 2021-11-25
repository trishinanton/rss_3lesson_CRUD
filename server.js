const {writeJsonToFile} = require("./fs-utils");
const {server} = require ('./index')

const PORT = process.env.PORT
server.listen(PORT, async () => {
    console.log(`Server has been started on ${PORT}`)

    //for testing
    await writeJsonToFile('db', [])
})