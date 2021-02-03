var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})
var { port } = require('../../config')
var handleIncomingClips = require('./handleIncomingClips')
var {
    addClip,
    editClip,
    deleteClip,
} = require('./receiveSingleClip')
var fs = require('fs')
var { initData } = require('./storage')
var generateClip = require('./generateClip')
var {
    getPlaylist,
    getAllPlaylists,
} = require('./youtube')
require('./db')

var serverData
initData().then(storage => serverData = storage)

io.on('connection', (socket) => {
    socket.on('allClips', (incomingClips, updateAppClips) => {
        handleIncomingClips(incomingClips, serverData).then(newData => {
            serverData = newData
            updateAppClips(newData.clips)
        })
    })
    socket.on('addClip', (clip, sendBack) => {
        addClip(clip).then(clipWithID => sendBack(clipWithID))
        generateClip(clip)
    })
    socket.on('editClip', (clip, sendBack) => {
        editClip(clip).then(editedClip => sendBack(editedClip))
    })
    socket.on('deleteClip', (clip, sendBack) => {
        deleteClip(clip).then(deletedClip => sendBack(deletedClip))
    })
    socket.on('getPlaylist', (auth, returnPlaylist) => {
        getPlaylist(auth).then(playlist => {
            returnPlaylist(playlist)
        })
    })
    socket.on('getAllPlaylists', (accessToken, returnPlaylists) => {
        getAllPlaylists(accessToken).then(playlists => {
            returnPlaylists(playlists)
        })
    })
})

http.listen(port, function(){
    console.log('listening on *:' + port)
})
