import { StatusBar } from 'expo-status-bar';
import React  from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Home from './pages/Home'
import MaMed from './pages/MedicineBox'
import Doctors from './pages/Doctors'
import SetAlarm from './pages/SetAlarm'
import { DrawerContent } from './components/Drawer'
import { Provider } from 'react-redux'
import store from './store'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import AppointmentForm from './pages/AppointmentForm'
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
    <PaperProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Set Alarm" drawerContent={(props) => <DrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Mamed" component={MaMed} />
            <Drawer.Screen name="Doctors" component={Doctors} />
            <Drawer.Screen name="SignIn" component={SignIn} />
            <Drawer.Screen name="SignUp" component={SignUp} />
            <Drawer.Screen name="Set Alarm" component={SetAlarm} />
            <Drawer.Screen name="AppointmentForm" component={AppointmentForm} />
          </Drawer.Navigator>
        </NavigationContainer>
      </Provider>
    </PaperProvider>
  );
}
