import { View, Text, TouchableOpacity, Dimensions, Platform } from "react-native"
import React from 'react'
import { styles } from "../styles"
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../redux/actions/actionCreators'

export const ClipInitOrDeleteLeft = (props) => {

    const redux = useDispatch()
    const { leftClipped, boundCount } = useSelector(state => state.app)

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
        <View>
        {
            leftClipped
            ?   <TouchableOpacity
                    style={[styles.controlButton, {width: props.buttonWidth, backgroundColor:"red"}]}
                    onPress={() => handleDeleteLeftClip()}
                    >
                    <Text style={styles.controlButtonText} >{"DELETE LEFT"}</Text>
                </TouchableOpacity>
            :   <TouchableOpacity
                    style={[styles.controlButton, {width: props.buttonWidth, backgroundColor:"green",}]}
                    onPress={() => handleLeftClip()}
                    >
                    <Text style={styles.controlButtonText}>{"PLACE LEFT"}</Text>
                </TouchableOpacity>
        }
        </View>
    )
}

export const ClipInitOrDeleteRight = (props) => {

    const redux = useDispatch()
    const { rightClipped, boundCount } = useSelector(state => state.app)

    const handleRightClip = () => {
        redux(actions.setHandlingRight(true))
        if(Platform.OS === 'web') redux(actions.setRightCursor(props.player.current.getCurrentTime()))
        else props.player.current.getCurrentTime().then(time => {
            redux(actions.setRightCursor(time))
        })
    }

    const handleDeleteRightClip = () => {
        redux(actions.setHandlingRight(false))
        redux(actions.setRightClipped(false))
        redux(actions.setBoundCount(boundCount - 1))
    }

    return (
        <View>
        {
            rightClipped
            ?   <TouchableOpacity
                    style={[styles.controlButton, {width: props.buttonWidth, backgroundColor:"red"}]}
                    onPress={() => handleDeleteRightClip()}
                    >
                    <Text style={styles.controlButtonText} >{"DELETE RIGHT"}</Text>
                </TouchableOpacity>
            :   <TouchableOpacity
                    style={[styles.controlButton, {width: props.buttonWidth, backgroundColor:"orange",}]}
                    onPress={() => handleRightClip()}
                    >
                    <Text style={styles.controlButtonText}>{"PLACE RIGHT"}</Text>
                </TouchableOpacity>
        }
        </View>
    )
}