import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { asyncFetchMeds, asyncFetchDoctors } from '../store/actions'
import { TouchableOpacity, Text, Image, View, StyleSheet, ImageBackground, TouchableHighlight, ScrollView } from 'react-native';
import { Button, TextInput, Avatar } from 'react-native-paper';
import { Ionicons } from "@expo/vector-icons"
import { BoxShadow } from "react-native-shadow";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Homepage() {
  const dispatch = useDispatch()
  const medicines = useSelector(state => state.medicineReducer.medicines)
  const doctors = useSelector(state => state.doctorReducer.doctors)
  useEffect(() => {
    dispatch(asyncFetchMeds())
    dispatch(asyncFetchDoctors())
  }, [])
  console.log(medicines, '<<< dari server')
  const userData = null
  return (
    <ScrollView
      vertical
    >
      <ImageBackground source={require('../src/images/home-background-edited.png')} style={{ width: "100%", height: '100%', zIndex: 5000, backgroundColor: '#daf0eb'}}>

        <View style={styles.topContainer}>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.nameText}>Acong</Text>
          <Text style={styles.emailText}>acong@mail.com</Text>
        </View>
        <Text style={{
          textAlign: 'center',
          fontFamily: 'coolvetica-rg',
          fontSize: 15,
          marginBottom: 10
        }}>
          Closest Appointment Schedule:
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

          }}>tes</Text>
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
          // onPress={onSubmitLogin}
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
