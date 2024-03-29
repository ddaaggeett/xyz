import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
const actions = require('../redux/actions/actionCreators')
const { useGroupSession, joinRoom } = require('../hooks')
import FindUser from './FindUser'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';

export default () => {

    useGroupSession()
    const { rooms } = useSelector(state => state.collaboration)

    return (
        <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.session}>
            <CreateGroupSession />
            { rooms.length == 0 ? null : <SelectGroupSession /> }
            <Text style={[styles.text, styles.or]}>OR</Text>
            <FindUser />
        </View>
        </SafeAreaView>
    )
}

const SelectGroupSession = () => {

    const { rooms } = useSelector(state => state.collaboration)
    const { user } = useSelector(state => state.account)
    const { setSelectedRoom } = joinRoom()

    const renderSessionUserList = (room) => room.users.map((user, key) => {
        return <Text style={styles.text} key={key}>{`${user.id}`}</Text>
    })

    const userInRoom = (room) => {
        for (var x = 0; x < room.users.length; x++) {
            if (room.users[x].id === user.id) return true
        }
        return false
    }

    const renderRoomSelections = rooms.map((room, key) => {
        if (userInRoom(room)) return null
        else return (
            <TouchableOpacity
                style={[styles.sessionButton, styles.button]}
                onPress={() => setSelectedRoom(room)}
                key={key}
                >
                <View style={styles.sessionButtons}>{renderSessionUserList(room)}</View>
            </TouchableOpacity>
        )
    })

    return (
        <View style={styles.session}>
            <Text style={[styles.sessionButton, styles.text, styles.or]}>{`or join another:`}</Text>
            <View style={styles.sessionButtons}>{renderRoomSelections}</View>
        </View>
    )
}

const CreateGroupSession = () => {

    const { setSelectedRoom } = joinRoom()

    return (
        <TouchableOpacity
            style={[styles.sessionButton, styles.button, styles.createGroup]}
            onPress={() => setSelectedRoom('new')}
            >
            <Text style={styles.text}>{`Start a conversation`}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    or: {
        marginTop: 10,
        alignSelf: 'center'
    },
    session: {
        flexDirection: 'column',
        margin: 3,
    },
    sessionButton: {
    },
    sessionButtons: {
        flexDirection: 'column',
    },
    createGroup: {
        backgroundColor: 'green'
    },
    button: {
        padding: 30,
        paddingTop: 11,
        paddingBottom: 11,
        backgroundColor:'#444',
        alignSelf: 'center',
        borderRadius: 5,
        margin: 1,
    },
    text: {
        color: 'white',
    },
})
