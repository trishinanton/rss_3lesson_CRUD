const fs = require("fs");

exports.readJsonFromFile = (filePath)=>{
    return new Promise((resolve, reject)=>{
        fs.readFile(filePath, (err, buf)=>{
            if(err){
                reject(err)
            }else{
                resolve(JSON.parse(buf.toString()))
            }
        })
    })
}

exports.writeJsonToFile = (filePath, data) =>{
    return new Promise((res, rej)=>{
        fs.stat(filePath, (err, stats)=> {
            if (err) {
                rej(err)
            } else {
                fs.writeFile(filePath, JSON.stringify(data), err => {
                    res();
                })
            }
        })

    })
}