import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../redux/actions/actionCreators'
import GotSomething from './GotSomething'

export const ExecuteLeft = (props) => {

    const redux = useDispatch()
    const { boundCount } = useSelector(state => state.clipper)

    const handleExecuteLeft = () => {
        redux(actions.setLeftClipped(true))
        redux(actions.setBoundCount(boundCount + 1))
        redux(actions.setHandlingLeft(false))
    }

    const handleCancelLeft = () => {
        redux(actions.setHandlingLeft(false))
        props.setPlaying(true)
    }

    return (
        <View style={styles.contentRow}>
            <TouchableOpacity style={[styles.controlButton, {backgroundColor:"#666666"}]} onPress={() => handleExecuteLeft()}><Text style={styles.controlButtonText} >{"CLIP\nLEFT"}</Text></TouchableOpacity>
            <GotSomething {...props} />
            <TouchableOpacity style={[styles.controlButton, {backgroundColor:"#B30000"}]} onPress={() => handleCancelLeft()}><Text style={styles.controlButtonText} >{"CANCEL"}</Text></TouchableOpacity>
        </View>
    )
}

export const ExecuteRight = (props) => {

    const redux = useDispatch()
    const { boundCount } = useSelector(state => state.clipper)

    const handleExecuteRight = () => {
        if (boundCount + 1 == 1) props.setGotSomethingCursorOffset()
        redux(actions.setRightClipped(true))
        redux(actions.setBoundCount(boundCount + 1))
        redux(actions.setHandlingRight(false))
    }

    const handleCancelRight = () => {
        redux(actions.setHandlingRight(false))
        props.setPlaying(true)
    }

    return (
        <View style={styles.contentRow}>
            <TouchableOpacity style={[styles.controlButton, {backgroundColor:"#B30000"}]} onPress={() => handleCancelRight()}><Text style={styles.controlButtonText} >{"CANCEL"}</Text></TouchableOpacity>
            <GotSomething {...props} />
            <TouchableOpacity style={[styles.controlButton, {backgroundColor:"#666666"}]} onPress={() => handleExecuteRight()}><Text style={styles.controlButtonText} >{"CLIP\nRIGHT"}</Text></TouchableOpacity>
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
