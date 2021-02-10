import React, { useState, useEffect } from 'react'
import { Text, TouchableOpacity, View, Platform } from 'react-native'
import { styles } from '../../styles'
import { androidClientId, webClientId, webClientSecret } from '../../../../config'
import * as AuthSession from 'expo-auth-session'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import * as actions from '../../redux/actions/actionCreators'
import { useSelector, useDispatch } from 'react-redux'

WebBrowser.maybeCompleteAuthSession()

export default (props) => {

    const redux = useDispatch()
    const loggedIn = useSelector(state => state.account.loggedIn)
    const { user, accessToken, refreshToken, accessExpirationTime, authentication, params } = useSelector(state => state.account)

    const [refreshInterval, setRefreshInterval] = useState()

    useEffect(() => {
        if(loggedIn) {
            const intervalTime = 1000
            setRefreshInterval(setInterval(() => {
                if ((accessExpirationTime - Date.now()) < intervalTime) {
                    handleRefreshTokens()
                }
            }, intervalTime))
        }
        else clearInterval(refreshInterval)
    }, [loggedIn])

    const handleRefreshTokens = () => {
        if (Platform.OS === 'web') {}// TODO:
        else refreshAccessToken().then(data => {
            const accessExpirationTime = Date.parse(data.accessTokenExpirationDate)
            redux(actions.setAccessToken(data.accessToken, accessExpirationTime))
        }).catch(error => console.log(error))
    }

    const refreshAccessToken = async () => {
        return new Promise((resolve, reject) => {
            AppAuth.refreshAsync({
                issuer: 'https://accounts.google.com',
                clientId: androidClientId, // TODO: iosClientId, etc.
            }, refreshToken).then(result => {
                const authInfo = {
                    accessToken: result.accessToken,
                    accessTokenExpirationDate: result.accessTokenExpirationDate,
                }
                resolve(authInfo)
            })
        })
    }

    const accountAccessConfig = {
        webClientId: webClientId,
        clientSecret: webClientSecret,
        // androidClientId: androidClientId,
        // iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: [
            'profile',
            'email',
            'https://www.googleapis.com/auth/youtube',
            // 'offline' // TODO: for refreshToken retrieval
        ],
    }

    const [request, response, promptAsync] = Google.useAuthRequest(accountAccessConfig)

    const handleLogin = async () => promptAsync()

    const handleLogout = async () => {
        // TODO: AuthSession.revokeAsync()
        redux(actions.logout())
    }

    useEffect(() => {
        if (response?.type === 'success') {
            const { authentication, params } = response;
            const accountObject = {
                accessToken: authentication.accessToken,
                refreshToken: authentication.refresh,
                user: JSON.parse(window.atob(authentication.idToken.split('.')[1]))
            }
            const accessExpirationTime = (authentication.issuedAt + authentication.expiresIn) * 1000
            redux(actions.login(accountObject, accessExpirationTime))
        }
    }, [response])

    return (
        <View>
        {
            loggedIn
            ?   <View>
                    <Text style={{color:'white'}}>{`you are logged into YouTube, ${user.name}`}</Text>
                    <TouchableOpacity
                        style={[styles.controlButton, {backgroundColor: 'red'}]}
                        onPress={() => handleLogout()}
                        >
                        <Text style={styles.controlButtonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            :   <View>
                    <TouchableOpacity
                        style={styles.controlButton}
                        onPress={() => handleLogin()}
                        disabled={!request}
                        >
                        <Text style={styles.controlButtonText}>Login with Google</Text>
                    </TouchableOpacity>
                </View>
        }
        </View>
    )
}
