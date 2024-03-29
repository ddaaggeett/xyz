import { useEffect, useState } from 'react'
import { StyleSheet } from "react-native"
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as Linking from 'expo-linking'
import * as actions from '../redux/actions/actionCreators'
import { apps } from '../../../../config'

export default () => {

    const redux = useDispatch()

    return (
        <View style={styles.appnav}>
        {
            apps.map((app, index) => {
                if (app.name !== 'account') return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => redux(actions.updateWebApp(app.name))}
                        style={styles.button}
                        >
                        <AppNavButtonText app={app} />
                    </TouchableOpacity>
                )
            })
        }
        </View>
    )
}

const AppNavButtonText = (props) => {

    const { webapp, user } = useSelector(state => state.account)

    if (user && props.app.name === webapp) return <Text style={[styles.buttonText, styles.selectedButtonText]}>{props.app.name.toUpperCase()}</Text>
    else return <Text style={styles.buttonText}>{props.app.name}</Text>
}

const styles = StyleSheet.create({
    appnav: {
        flex: 1,
        flexDirection: 'row',
        marginRight: 100,
        marginLeft: 100,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        padding: 0,
    },
    buttonText: {
        color: 'white',
        alignSelf: 'center',
    },
    selectedButtonText: {
        fontWeight: 'bold',
    },
})
