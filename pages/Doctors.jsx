import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { Avatar, Button, Card } from 'react-native-paper';
import { useSelector } from 'react-redux'
import {
  useFonts,
  PassionOne_400Regular
} from '@expo-google-fonts/dev'
import DoctorCard from '../components/DoctorCard'
const axios = require('axios')


export default function Doctors() {
  const doctors = useSelector(state => state.doctorReducer.doctors)
  const [isLoading, setIsLoading] = useState(false);
  const [fontsLoaded] = useFonts({
    PassionOne_400Regular
  })

  if (!fontsLoaded || isLoading) {
    return <Text>Loading...</Text>
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.view} >
          <Text
          style={{fontFamily: 'PassionOne_400Regular', fontSize: 40}}
          >Doctors</Text>
          {doctors.map(doc => (
            <DoctorCard
            key={doc.name}
            name={doc.name}
            image_url={doc.image_url}
            practice={doc.practice}
            />
          ))}
        </View>
        <View/>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  view: {
    marginTop: 100,
    flex: 5,
    textAlign: 'center',
    marginLeft: '8%',
    marginRight: '8%',
    // backgroundColor: 'blue'
  },
  card: {
    marginTop: 20,
    width: "100%",
    shadowOpacity: 0.7,
    shadowRadius: 2.5
  }
});
