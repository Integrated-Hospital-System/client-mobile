import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import * as Notifications from 'expo-notifications';
import { asyncFetchMeds, asyncFetchDoctors, getUpcomingAppointment, getHistory } from '../store/actions'
import { TouchableOpacity, Text, Image, View, StyleSheet, ImageBackground, TouchableHighlight, ScrollView } from 'react-native';
import { Button, TextInput, Avatar } from 'react-native-paper';
import { Ionicons } from "@expo/vector-icons"
import { BoxShadow } from "react-native-shadow";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Homepage({navigation}) {
  const [cache, setCache] = useState('')
  const dispatch = useDispatch()
  const upcomingApp = useSelector(state => state.doctorReducer.upcomingAppointment)
  const medicines = useSelector(state => state.medicineReducer.medicines)
  const doctors = useSelector(state => state.doctorReducer.doctors)
  useEffect(() => {
    dispatch(asyncFetchMeds())
    dispatch(asyncFetchDoctors())
    dispatch(getUpcomingAppointment())
    dispatch(getHistory())
    console.log(medicines, '<<< medicines');
    // console.log(doctors, '<<< doctors');
  }, [])
  const userData = null

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response, '<<<<<<<< response from clickable local notif');
      const {name, doses, totalMed} = response.notification.request.content.data
      console.log(response.notification.request.content.data, '<<<<<<<<<<<<<< data from push notif')
      navigation.navigate('Confirmation', {name, doses, totalMed})
    });
    return () => subscription.remove();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('user-data')
      if(value !== null) {
        setCache(JSON.parse(value))
        console.log(cache, '<<<<< cache di home');
      }
    } catch(e) {
      console.log(e);
      navigation.navigate('SignIn')
    }
  }
  useEffect(() => {
    getData()
  }, [])

  if (!cache) return (<Text>Loading...</Text>)

  return (
    <ScrollView
      vertical
    >
      <ImageBackground source={require('../src/images/home-background-edited.png')} style={{ width: "100%", height: '100%', zIndex: 5000, backgroundColor: '#daf0eb'}}>

        <View style={styles.topContainer}>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.nameText}>{cache.account.name}</Text>
          <Text style={styles.emailText}>{cache.account.email}</Text>
        </View>
        <Text style={{
          textAlign: 'center',
          fontFamily: 'coolvetica-rg',
          fontSize: 15,
          marginBottom: 10
        }}>
          Upcoming Appointment Schedule:
        </Text>
        <View 
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: "white",
          marginHorizontal: 40,
          borderRadius: 20,
          height: 60,
          marginBottom: 180,
          alignItems: 'center'          
        }}>
          <Text style={{
            fontFamily: 'coolvetica-rg',
            fontSize: 20,

          }}>{upcomingApp === '' ? '-' : upcomingApp}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: "center"
          }}
        >
          <Image source={require('../src/images/make-appointment-edited.png')} style={{ width: 250, height: 300, marginHorizontal: 20 }} />
        </View>
        {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginHorizontal: 30
        }}>
        <Text style={{
          padding: 10,
          fontFamily: 'coolvetica-rg',
          fontSize: 20,
          color: '#474747'
        }}>History</Text>

        <TouchableHighlight
          style={{
            position: "relative",
            width: 160,
            height: 170,
            backgroundColor: "#fff",
            borderRadius: 3,
            // marginVertical: 5,
            overflow: "hidden"
          }}
        >
        <Avatar.Icon size={80} icon="note" color="white" style={{ backgroundColor: "#0a678c" }} />

        </TouchableHighlight>

      </View> */}

        <Button
          mode="contained"
          icon="plus-circle"
          // onPress={onSubmitLogin}
          style={{
            marginHorizontal: 50,
            height: 70,
            marginTop: 10,
            color: "white",
            borderRadius: 50,
            justifyContent: 'center'
          }}
          color='#1d7a57'
          onPress={() => navigation.navigate('Doctors')}
        >
          New Appointment
          </Button>
          <View
          style={{
            flexDirection: 'row',
            justifyContent: "center",
            marginTop: 30
          }}
        >
          <Image source={require('../src/images/history-edited.png')} style={{ width: 250, height: 200, marginHorizontal: 20 }} />
        </View>
        <Button
          mode="contained"
          icon="check-circle"
          onPress={() => navigation.navigate('History')}
          style={{
            marginHorizontal: 50,
            marginTop: 10,
            height: 70,
            marginBottom: 60,
            color: "white",
            borderRadius: 50,
            justifyContent: 'center'
          }}
          color='#1d7a57'
        >
          History
          </Button>
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginHorizontal: 50,
            marginTop: 30
          }}>
          <Text style={{
            padding: 10,
            fontFamily: 'coolvetica-rg',
            fontSize: 20,
            color: '#474747'
          }}>New Schedule</Text>

          <TouchableHighlight
          style={{
            position: "relative",
            width: 160,
            height: 170,
            backgroundColor: "#fff",
            borderRadius: 3,
            // marginVertical: 5,
            overflow: "hidden"
          }}
        >
          <Avatar.Icon size={130} icon="calendar" color="white" style={{ backgroundColor: "#0a678c" }} />

          </TouchableHighlight>

        </View> */}


      </ImageBackground >
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    paddingHorizontal: 30,
    marginTop: 80
  },
  welcomeText: {
    fontFamily: 'coolvetica-rg',
    fontSize: 30,
    color: "#c5e3e8",
    color: 'black'
  },
  nameText: {
    fontFamily: 'coolvetica-rg',
    fontSize: 50,
    // color: "white",
    color: 'black'
  },
  emailText: {
    fontFamily: 'coolvetica-rg',
    fontSize: 15,
    // color: "#c5e3e8",
    marginBottom: 60,
    color: 'black'
  }
});
