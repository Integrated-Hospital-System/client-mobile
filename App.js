import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import  { createDrawerNavigator } from '@react-navigation/drawer'
import Home from './pages/Home'
import MaMed from './pages/MaMed'
import Doctors from './pages/Doctors'
import { DrawerContent } from './components/Drawer'

const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Mamed" component={MaMed} />
        <Drawer.Screen name="Doctors" component={Doctors} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
