const fs = require('fs');
const path = require('path');
const {writeJsonToFile} = require("./fs-utils");
const {server} = require ('./index')
let nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = [
    {
        mode: 'production',
        name: 'server',
        target: 'node',
        entry: './index.js',
        output: {
            path: path.resolve(__dirname,'dist'),
            filename: 'bundle.js'
        },
        externals: nodeModules,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader'

                },
                {
                    test:  /\.json$/,
                    loader: 'json-loader'
                }
            ]
        }
    }
]

const PORT = process.env.PORT
server.listen(PORT, async () => {
    console.log(`Server has been started on ${PORT}`)

    //for testing
    await writeJsonToFile('db', [])
})


//second config
// const path = require('path')
// const  webpack  = require('webpack')
//
// module.exports = {
//     mode: 'production',
//     entry: './index.js',
//     output: {
//         filename: 'bundle.js',
//         path: path.resolve(__dirname,'dist')
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 loader: 'babel-loader'
//             }
//         ]
//     },
//     externals: ["fs","http"],
//
// }