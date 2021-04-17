import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { TouchableOpacity, Text, Image, View, StyleSheet, ImageBackground,TouchableHighlight } from 'react-native';
import { Button, TextInput, Avatar } from 'react-native-paper';
import { Ionicons } from "@expo/vector-icons"
import { BoxShadow } from "react-native-shadow";

export default function Homepage() {

  return (
    <ImageBackground source={require('../src/images/home-background.png')} style={{ width: "100%", height: '100%' }}>

      <View style={styles.topContainer}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.nameText}>Acong</Text>
        <Text style={styles.emailText}>acong@mail.com</Text>
      </View>
      <View
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

          {/* <TouchableHighlight
          style={{
            position: "relative",
            width: 160,
            height: 170,
            backgroundColor: "#fff",
            borderRadius: 3,
            // marginVertical: 5,
            overflow: "hidden"
          }}
        > */}
            <Avatar.Icon size={80} icon="note" color="white" style={{ backgroundColor: "#0a678c" }} />
          
        {/* </TouchableHighlight> */}

      </View>



      <View
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

          {/* <TouchableHighlight
          style={{
            position: "relative",
            width: 160,
            height: 170,
            backgroundColor: "#fff",
            borderRadius: 3,
            // marginVertical: 5,
            overflow: "hidden"
          }}
        > */}
            <Avatar.Icon size={130} icon="calendar" color="white" style={{ backgroundColor: "#0a678c" }} />
          
        {/* </TouchableHighlight> */}

      </View>
    </ImageBackground >
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
    color: "#c5e3e8"
  },
  nameText: {
    fontFamily: 'coolvetica-rg',
    fontSize: 50,
    color: "white"
  },
  emailText: {
    fontFamily: 'coolvetica-rg',
    fontSize: 15,
    color: "#c5e3e8",
    marginBottom: 230
  }
});
