const path = require('path')
const fs = require('fs')
const config = require('../../../config')
const whitesocket = require('./whitesocket')
const r = require('rethinkdb')

const apply = (diff) => {
    return new Promise((resolve, reject) => {
        whitesocket(diff)
        .then(() => resolve())
        .catch(error => reject(error))
    })
}

const getPrevDiff = user => {
    return new Promise((resolve, reject) => {
        r.connect(config.dbConnxConfig).then(connection => {
            r.table('users').get(user).run(connection)
            .then(user => {
                if (user.current.id == undefined) { // first diff
                    const id = null
                    const uri = user.current.result_uri
                    resolve({id,uri})
                }
                else r.table('diffs').get(user.current.id).run(connection)
                .then(diff => {
                    const id = user.current.id
                    const uri = diff.result_uri
                    resolve({id,uri})
                })
                .catch(error => {})
            })
            .catch(error => {})
        })
    })
}

const getOutputShape = user => {
    return new Promise((resolve, reject) => {
        r.connect(config.dbConnxConfig).then(connection => {
            r.table('users').get(user).run(connection)
            .then(user => resolve(user.outputShape))
            .catch(error => {})
        })
    })
}

const save = (diff) => {
    return new Promise((resolve, reject) => {
        r.connect(config.dbConnxConfig).then(connection => {
            r.table('diffs').insert(diff, { returnChanges: true, conflict: 'update' }).run(connection)
            .then(result => {
                resolve(result.changes[0].new_val)
            })
            .catch(error => {
                console.log(`\ndiff save error\n${error}`)
                reject()
            })
        })
        .catch(error => {
            console.log(`\ndiff save db connection error\n${error}`)
            reject()
        })
    })
}

const binaryStringToFile = (diff, imageBinaryString) => {
    return new Promise((resolve,reject) => {
        const dir = path.join(config.imageData, path.dirname(diff.uri))
        const uri = path.join(config.imageData, diff.uri)
        fs.mkdir(dir, {recursive:true}, error => {
            if(!error) {
                const buffer = Buffer.from(imageBinaryString, 'base64')
                fs.writeFile(uri, buffer, (error) => {
                    if (!error) resolve()
                })
            }
        })
    })
}

const handle = (data) => {
    return new Promise((resolve, reject) => {
        const dir = path.join(data.timestamp.toString())
        const uri = path.join(dir,'diff.jpg')
        const result_uri = path.join(dir,'result.jpg')
        let diff = {
            uri,
            result_uri,
            mode: data.mode,
            user: data.user,
        }
        binaryStringToFile(diff, data.imageBinaryString).then(() => {
            getPrevDiff(diff.user)
            .then(prev => {
                getOutputShape(diff.user)
                .then(shape => {
                    diff = {
                        ...diff,
                        prev_id: prev.id,
                        prev_uri: prev.uri,
                        shape,
                    }
                    apply(diff)
                    .then(() => {
                        save(diff).then(result => resolve(result))
                    })
                    .catch(error => reject(error))
                })


            })
            .catch(error => {})
        })
    })
}

module.exports = {
    handle,
}
