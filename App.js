import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import  { createDrawerNavigator } from '@react-navigation/drawer'
import Home from './pages/Home'
import MaMed from './pages/MedicineBox'
import Doctors from './pages/Doctors'
import SetAlarm from './pages/SetAlarm'
import { DrawerContent } from './components/Drawer'

const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="MaMed" component={MaMed} />
        <Drawer.Screen name="Doctors" component={Doctors} />
        <Drawer.Screen name="Set Alarm" component={SetAlarm} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
