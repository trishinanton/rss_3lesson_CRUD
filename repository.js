const fs = require('fs');
const {writeJsonToFile} = require("./fs-utils");
const {readJsonFromFile} = require("./fs-utils");


const getUsers = ()=>{
    return readJsonFromFile('db')

}
const addUser = async (name)=>{
    let users = await getUsers();
    console.log(users)
    users.push(name);
    return writeJsonToFile ('db',users)

}
const updateUser = async (newUser,indexUser)=>{
    let users = await getUsers();
    users[indexUser].name =newUser.name;
    return writeJsonToFile('db',users)
}
const deleteUser = async (indexUser)=>{
    let users = await getUsers();
    users.splice(indexUser, 1)
    return writeJsonToFile('db', users)
}

module.exports = {
    getUsers,
    addUser,
    updateUser,
    deleteUser
};
