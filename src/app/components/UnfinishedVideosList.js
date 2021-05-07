import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import { styles } from '../styles'
import { serverIP, expressPort } from '../../../config'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../redux/actions/actionCreators'
import { useNavigation } from '@react-navigation/native'

export default (props) => {

    const navigation = useNavigation()
    const { videoProgressions } = useSelector(state => state.library)
    const redux = useDispatch()

    const selectVideo = (item) => {
        navigation.navigate('Clipper')
        redux(actions.updateContentID(item.videoId))
        redux(actions.selectingUnfinishedVideo(false))
    }


    const renderItem = ({ item, index }) => {
        const thumbnailURI = `https://img.youtube.com/vi/${item.videoId}/0.jpg`
        return(
            <View style={styles.clipItem}>
                <TouchableOpacity
                    onPress={() => selectVideo(item)}
                    >
                    <View style={styles.contentRow}>
                        <Image source={{ uri: thumbnailURI }} style={styles.thumbnail} />
                        <View>
                            <Text style={styles.clipItemText}>{item.videoId}</Text>
                            <Text style={styles.clipItemText}>{item.progress}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    if (videoProgressions.length == 0) return null
    else return (
            <View style={styles.recentVideos}>
                <Text style={styles.recentVideosText}>RECENT VIDEOS</Text>
                <FlatList
                    data={videoProgressions}
                    renderItem={renderItem}
                    keyExtractor={item => item.videoId}
                    />
            </View>
    )
}
