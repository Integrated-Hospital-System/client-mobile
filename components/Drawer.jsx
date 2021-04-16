import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer'
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper'


export function DrawerContent () {
    return (
        <View>
            <Text> HALO HALO BANDUNG </Text>
            {/* <Image source="https://i.imgur.com/RUjVrWs.png"/> */}
        </View>
    )
}

styles = StyleSheet.create({
    
})