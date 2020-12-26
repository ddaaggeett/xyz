const {
    exec,
} = require('child_process')
const fs = require('fs')
const downloadVideo = require('./downloadVideo')
const clip = require('./clip')

const handleClip = (clipObject) => {
    const videoDirectory = './video_data/' + clipObject.videoId
    fs.mkdir(videoDirectory,{recursive:true}, err => {
        if (err) throw err;
        else {
            downloadVideo(videoDirectory, clipObject.videoId).then(() => {
                clip(videoDirectory, clipObject)
            })
        }
    })
}

module.exports = handleClip