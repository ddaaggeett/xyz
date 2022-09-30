import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Whiteboard from './Whiteboard'
import Arucos from './Arucos'
import { borderWidth } from '../../../../config'

export default () => {

    return (
        <View style={styles.container}>
            <View style={styles.arucos}><Arucos /></View>
            <View style={styles.whiteboard}><Whiteboard /></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: borderWidth,
        bottom: borderWidth,
        left: borderWidth,
        right: borderWidth,
    },
    arucos: {
        position: 'absolute',
        zIndex: 1,
    },
    whiteboard: {
        position: 'absolute',
        zIndex: 0,
    },
})
