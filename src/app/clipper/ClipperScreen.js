import React, { useEffect, useState } from 'react'
import { View, TextInput, ScrollView, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { StatusBar } from 'expo-status-bar';
import Clipper from './components/Clipper'
import VideoSelector from './components/VideoSelector'
import { SafeAreaView } from 'react-native-safe-area-context'

export default () => {

    const { contentID, boundCount, videoSelectorFocused } = useSelector(state => state.clipper)
    const [pendingTitle, setPendingTitle] = useState('')

    useEffect(() => {
        if (boundCount == 0) setPendingTitle('')
    }, [boundCount])

    useEffect(() => {
        setPendingTitle('')
    }, [contentID])

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView>
            <StatusBar style="light" />
            <Clipper pendingTitle={pendingTitle} />
            <VideoSelector />
            {
                videoSelectorFocused || contentID.length == 0
                ?   null
                :   <TextInput
                        style={[styles.clipItemTextInput, styles.titleInput]}
                        onChangeText={text => setPendingTitle(text)}
                        value={pendingTitle}
                        placeholder={"PENDING TITLE"}
                        placeholderTextColor={"yellow"}
                        />
            }
        </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    clipItemTextInput: {
        color: 'white',
        fontSize:16,
        padding:15,
    },
    titleInput: {
        backgroundColor:'#444',
    },
})
