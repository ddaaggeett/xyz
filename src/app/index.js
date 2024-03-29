import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Platform, Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Account from './account'
import Drawer_Podware from './podware'
import { CollabDrawer } from './collaboration'
import Drawer_Clipper from './clipper'
import Drawer_Whitesocket from './whitesocket'
import { createDrawerNavigator } from '@react-navigation/drawer'

const Drawer = createDrawerNavigator()

export default () => {

    const { user, webapp } = useSelector(state => state.account)

    if(!user) return (
        <Drawer.Navigator screenOptions={{ headerShown: false }}>
            <Drawer.Screen name="Profile" component={Account} />
        </Drawer.Navigator>
    )
    else return (
        <Drawer.Navigator screenOptions={{ headerShown: false }}>
            <Drawer.Screen name="Profile" component={Account} />
            <Drawer.Screen name="Podware" component={Drawer_Podware} />
            <Drawer.Screen name="Collaboration" component={CollabDrawer} />
            <Drawer.Screen name="Clipper" component={Drawer_Clipper} />
            <Drawer.Screen name="Whitesocket" component={Drawer_Whitesocket} />
        </Drawer.Navigator>
    )
}
