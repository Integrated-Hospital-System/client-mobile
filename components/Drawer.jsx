import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer'
import {
    Drawer
} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/AntDesign'
import Icon3 from 'react-native-vector-icons/Fontisto'
import Mamed from '../pages/MedicineBox'
import Doctors from '../pages/Doctors'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function DrawerContent (props) {
    return (
    <View style={{flex:1}}>
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerContent}>
                <View style={styles.userInfoSection}>
                    <View style={{flexDirection:'row',marginTop: 15}}>
                        <Image
                        source={{uri: "https://i.imgur.com/RUjVrWs.png"}}
                        style={{width: 100, height: 100, marginTop: 50, marginLeft: 70, marginRight: 20}}
                        />
                    </View>
                </View>
                <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem 
                        icon={({color, size}) => (
                            <Icon 
                            name="home-outline" 
                            color={color}
                            size={size}
                            />
                        )}
                        label="Home"
                        onPress={() => {props.navigation.navigate('Home')}}
                    />
                    <DrawerItem 
                        icon={({color, size}) => (
                            <Icon2 
                            name="medicinebox" 
                            color={color}
                            size={size}
                            />
                        )}
                        label="Medicine Box"
                        onPress={() => {props.navigation.navigate('MaMed')}}
                    />
                    <DrawerItem 
                        icon={({color, size}) => (
                            <Icon3 
                            name="doctor" 
                            color={color}
                            size={size}
                            />
                        )}
                        label="Doctors"
                        onPress={() => {props.navigation.navigate('Doctors')}}
                    />
                </Drawer.Section>
            </View>
        </DrawerContentScrollView>
        <Drawer.Section style={styles.bottomDrawerSection}>
            <DrawerItem 
                icon={({color, size}) => (
                    <Icon 
                    name="exit-to-app" 
                    color={color}
                    size={size}
                    />
                )}
                label="Sign Out"
                onPress={async () => {
                    const cachefromsignout = await AsyncStorage.getItem('user-data')
                    await AsyncStorage.removeItem('user-data')
                    props.navigation.navigate('SignIn')
                }}
            />
        </Drawer.Section>
    </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
      },
      userInfoSection: {
        paddingLeft: 20,
      },
      title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
      },
      caption: {
        fontSize: 14,
        lineHeight: 14,
      },
      row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
      },
      section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
      },
      paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
      },
      drawerSection: {
        marginTop: 50,
      },
      bottomDrawerSection: {
          marginBottom: 15,
          borderTopColor: '#f4f4f4',
          borderTopWidth: 1
      },
      preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
      },
})