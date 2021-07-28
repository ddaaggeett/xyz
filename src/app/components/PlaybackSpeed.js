/*
license MIT
copyright Dave Daggett @ ddaaggeett.xyz
date 2021
*/
import { View, Text, TouchableOpacity } from "react-native"
import React from 'react'
import { styles } from "../styles"
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../redux/actions/actionCreators'

export default () => {

    const redux = useDispatch()
    const { speed } = useSelector(state => state.app)

    const selectedSpeed = (selectedSpeed) => {
        if (selectedSpeed != speed) return "#440075"
    }

    const handleSetSpeed = (newSpeed) => redux(actions.updateSpeed(newSpeed))

    return (
        <View style={styles.contentRow}>
            <TouchableOpacity style={[styles.controlButton, {backgroundColor: selectedSpeed(1)}]} onPress={() => {handleSetSpeed(1)}}><Text style={styles.controlButtonText}>{"x 1.0"}</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.controlButton, {backgroundColor: selectedSpeed(1.5)}]} onPress={() => {handleSetSpeed(1.5)}}><Text style={styles.controlButtonText}>{"x 1.5"}</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.controlButton, {backgroundColor: selectedSpeed(2)}]} onPress={() => {handleSetSpeed(2)}}><Text style={styles.controlButtonText}>{"x 2.0"}</Text></TouchableOpacity>
        </View>
    )
}
