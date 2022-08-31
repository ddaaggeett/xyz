import { useState, useEffect } from 'react'
import { TouchableOpacity, Text, Platform, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import * as Linking from 'expo-linking'
import { appName } from '../../../../config'
import { sourceCodeURL } from '../../../../config'

export const TitleText = () => {

    const [titleText, setTitleText] = useState(appName)
    const { user, webapp } = useSelector(state => state.account)

    useEffect(() => {
        if (user) setTitleText(`${appName}     ///     ${user.name}`)
        else setTitleText(appName)
    }, [user])

    if(Platform.OS === 'web') return <Text style={styles.username}>{titleText}</Text>
    else return <Text style={[styles.username, styles.usernameNative]}>{titleText}</Text>
}

export default () => {

    const { webapp, domain } = useSelector(state => state.account)
    const [fullAppDomain, setFullAppDomain] = useState(domain)

    useEffect(() => {
        if (webapp) setFullAppDomain(`http://${webapp}.${domain}`)
        else setFullAppDomain(domain)
    }, [])

    return (
        <TouchableOpacity
            onPress={() => Linking.openURL(fullAppDomain)}
            >
            <TitleText />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    username: {
        padding: 7,
        paddingLeft: 28,
        paddingRight: 28,
        color:'white',
    },
    usernameNative: {
        alignSelf: 'center',
        fontSize: 18,
    },

})