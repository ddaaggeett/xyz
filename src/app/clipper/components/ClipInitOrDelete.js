import { View, Text, TouchableOpacity, Dimensions, Platform, StyleSheet } from "react-native"
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../redux/actions/actionCreators'

export const ClipInitOrDeleteLeft = (props) => {

    const redux = useDispatch()
    const { leftClipped, boundCount } = useSelector(state => state.clipper)

    const handleLeftClip = () => {
        redux(actions.setHandlingLeft(true))
        if(Platform.OS === 'web') redux(actions.setLeftCursor(props.player.current.getCurrentTime()))
        else props.player.current.getCurrentTime().then(time => {
            redux(actions.setLeftCursor(time))
        })
    }

    const handleDeleteLeftClip = () => {
        redux(actions.setHandlingLeft(false))
        redux(actions.setLeftClipped(false))
        redux(actions.setBoundCount(boundCount - 1))
    }

    return (
        leftClipped
        ?   <TouchableOpacity
                style={[styles.controlButton, {backgroundColor:"red"}]}
                onPress={() => handleDeleteLeftClip()}
                >
                <Text style={styles.controlButtonText} >{"DELETE\nLEFT"}</Text>
            </TouchableOpacity>
        :   <TouchableOpacity
                style={[styles.controlButton, {backgroundColor:"#444444",}]}
                onPress={() => handleLeftClip()}
                >
                <Text style={styles.controlButtonText}>{"LEFT\nCURSOR"}</Text>
            </TouchableOpacity>
    )
}

export const ClipInitOrDeleteRight = (props) => {

    const redux = useDispatch()
    const { rightClipped, boundCount, rightCursor } = useSelector(state => state.clipper)

    const handleRightClip = () => {
        redux(actions.setHandlingRight(true))
        if(Platform.OS === 'web') redux(actions.setRightCursor(props.player.current.getCurrentTime()))
        else props.player.current.getCurrentTime().then(time => {
            redux(actions.setRightCursor(time))
        })
    }

    const handleDeleteRightClip = () => {
        props.player.current.seekTo(rightCursor)
        redux(actions.setHandlingRight(false))
        redux(actions.setRightClipped(false))
        redux(actions.setBoundCount(boundCount - 1))
    }

    return (
        rightClipped
        ?   <TouchableOpacity
                style={[styles.controlButton, {backgroundColor:"red"}]}
                onPress={() => handleDeleteRightClip()}
                >
                <Text style={styles.controlButtonText} >{"DELETE\nRIGHT"}</Text>
            </TouchableOpacity>
        :   <TouchableOpacity
                style={[styles.controlButton, {backgroundColor:"#444444",}]}
                onPress={() => handleRightClip()}
                >
                <Text style={styles.controlButtonText}>{"RIGHT\nCURSOR"}</Text>
            </TouchableOpacity>
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
})
