import { View, Text, TouchableOpacity, Dimensions, Platform, StyleSheet } from "react-native"
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../redux/actions/actionCreators'
import { ExecuteLeft, ExecuteRight } from './ClipExecute'
import CursorShifts from './Cursor'
import { ClipInitOrDeleteLeft, ClipInitOrDeleteRight } from './ClipInitOrDelete'
import GotSomething from './GotSomething'

export default (props) => {

    const redux = useDispatch()
    const { gotSomethingCursor } = useSelector(state => state.clipper)

    const setGotSomethingCursorOffset = () => {
        props.setPlaying(true)
        const newCursor = gotSomethingCursor - 10 // seems a good rewind amount
        redux(actions.setGotSomethingCursor(newCursor))
        props.player.current.seekTo(newCursor)
    }

    return (
        <View>
            <CursorPlacements
                {...props}
                setGotSomethingCursorOffset={setGotSomethingCursorOffset}
                />
            <CursorShifts
                {...props}
                />
        </View>
    )
}

const CursorPlacements = (props) => {

    const { handlingLeft, handlingRight } = useSelector(state => state.clipper)

    if (!handlingLeft && !handlingRight) return (
        <View style={styles.contentRow}>
            <ClipInitOrDeleteLeft {...props} />
            <GotSomething {...props} />
            <ClipInitOrDeleteRight {...props} />
        </View>
    )
    else if(handlingLeft) return  <ExecuteLeft {...props} />
    else if(handlingRight) return  <ExecuteRight {...props} />
}

const styles = StyleSheet.create({
    contentRow: {
        flexDirection:"row",
    },
})
