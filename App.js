import { StatusBar } from 'expo-status-bar';
import React  from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Home from './pages/Home'
import MaMed from './pages/MaMed'
import Doctors from './pages/Doctors'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { DrawerContent } from './components/Drawer'
import AppContainer from './navigation'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const Drawer = createDrawerNavigator()
// const theme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: 'green',
//     accent: 'blue',
//   },
// };


export default function App() {
  
  
    let [fontsLoaded] = useFonts({
      'coolvetica-rg': require('./assets/fonts/coolvetica-rg.ttf'),
      'coolvetica-condensed-rg': require('./assets/fonts/coolvetica-condensed-rg.ttf')
    });

  if(!fontsLoaded){
    return <AppLoading></AppLoading>
  }

  return (
    // <AppContainer>
    // </AppContainer>
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <DrawerContent {...props} />}>
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Mamed" component={MaMed} />
          <Drawer.Screen name="Doctors" component={Doctors} />
          <Drawer.Screen name="SignIn" component={SignIn} />
          <Drawer.Screen name="SignUp" component={SignUp} />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
