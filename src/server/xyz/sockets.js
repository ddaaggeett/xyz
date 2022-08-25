var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http, { cors: { origin: "*", methods: ["GET", "POST"] } })
var { socketPort } = require('../../../config')
const user = require('./user')

io.on('connection', (socket) => {
    socket.on('create account', (account, returnObject) => {
        user.createAccount(account).then(object => {
            returnObject(object)
        })
    })
    socket.on('userLog', (log, sendBack) => {
        user.userLog(log)
        .then(userData => sendBack(userData))
        .catch(error => {})
    })

})

http.listen(socketPort.xyz, function(){
    console.log('socket.io listening on *:' + socketPort.xyz)
})
