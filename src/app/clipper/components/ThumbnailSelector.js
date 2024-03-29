import { View, Text, TouchableOpacity, Platform, StyleSheet } from "react-native"
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../redux/actions/actionCreators'
import { useSocket } from '../hooks'

export default (props) => {

    const [thumbnailTime, setThumbnailTime] = useState(null)

    const redux = useDispatch()
    const { clips } = useSelector(state => state.clips)
    const { editIndex } = useSelector(state => state.clipper)
    const socket = useSocket()

    useEffect(() => {
        return () => setThumbnailTime(null)
    }, [])

    useEffect(() => {
        if (thumbnailTime != null) {
            props.setPlaying(false)
            props.player.current.seekTo(thumbnailTime)
        }
    }, [thumbnailTime])

    const handleThumbnailTime = () => {
        if(Platform.OS === 'web') setThumbnailTime(props.player.current.getCurrentTime())
        else props.player.current.getCurrentTime().then(time => {
            setThumbnailTime(time)
        })
    }

    const handleCreateThumbnail = () => {
        const updatedClip = {
            ...clips[editIndex],
            thumbnailTime
        }
        redux(actions.updatePendingClip(updatedClip))
        socket.volatile.emit('updateClip', updatedClip, returnedClip => {
            redux(actions.fulfillPendingClip(returnedClip))
        })
        setThumbnailTime(null)
    }

    if (thumbnailTime == null) return (
        <TouchableOpacity
            style={styles.controlButton}
            onPress={() => handleThumbnailTime()}
            >
            <Text style={styles.controlButtonText}>Thumbnail HERE</Text>
        </TouchableOpacity>
    )
    else return (
        <View>
            <View style={styles.contentRow}>
                <TouchableOpacity style={[styles.controlButton, {backgroundColor: '#440075'}]} onPress={() => setThumbnailTime(thumbnailTime - 0.5)}><Text style={styles.controlButtonText}>{"<<\n0.50\nsec"}</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.controlButton, {backgroundColor: '#2d004e'}]} onPress={() => setThumbnailTime(thumbnailTime - 0.1)}><Text style={styles.controlButtonText}>{"<<\n0.10\nsec"}</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.controlButton, {backgroundColor: '#2d004e'}]} onPress={() => setThumbnailTime(thumbnailTime + 0.1)}><Text style={styles.controlButtonText}>{">>\n0.10\nsec"}</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.controlButton, {backgroundColor: '#440075'}]} onPress={() => setThumbnailTime(thumbnailTime + 0.5)}><Text style={styles.controlButtonText}>{">>\n0.50\nsec"}</Text></TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.controlButton}
                onPress={() => handleCreateThumbnail()}
                >
                <Text style={styles.controlButtonText}>EXECUTE Thumbnail</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    controlButton: {
        flex: 1,
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor:'black',
    },
    controlButtonText: {
        textAlign:"center",
        color: 'white',
        fontWeight:"bold",
    },
    contentRow: {
        flexDirection:"row",
    },
})
