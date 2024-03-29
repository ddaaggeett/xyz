import React, { useRef, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../redux/actions/actionCreators'
import Thumbnail from './Thumbnail'

export default (props) => {

    const redux = useDispatch()

    const selectClip = () => {
        redux(actions.setEditIndex(props.index))
        props.navigation.navigate('ClipDetails')
    }

    return (
        <View style={styles.clipItem}>
            <TouchableOpacity
                onPress={() => selectClip()}
                onLongPress={props.drag}
                >
                <View style={styles.contentRow}>
                    <Thumbnail clip={props.clip} />
                    {
                        props.clip.who.length == 0
                        ?   <Text style={styles.clipItemText}>
                                {props.clip.title}
                            </Text>
                        :   <Text style={styles.clipItemText}>
                                {`${props.clip.title} /// ${props.clip.who}`}
                            </Text>
                    }
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    contentRow: {
        flexDirection:"row",
    },
    clipItem: {
        backgroundColor:'#222',
        marginBottom: 3,
    },
    clipItemText: {
        flex: 1,
        color: 'white',
        fontSize:16,
        padding:5,
    },
})
