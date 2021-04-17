import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { Avatar, Button, Card, TextInput } from 'react-native-paper';
import {
  useFonts,
  PassionOne_400Regular
} from '@expo-google-fonts/dev'
import MedCard from '../components/MedCard'
const axios = require('axios')


export default function SetAlarm({route}) {
  const [checker, setChecker] = useState(true)
  const [listOfAlarms, setListOfAlarms] = useState([])
  const {meds} = route.params
  let temp = []
  console.log(listOfAlarms, '<<<< listOfAlarms before reassign supposedly');
  for (let i = 0; i < meds.timesPerDay; i++) {
    temp.push(["00:00"])
    console.log('udah dipush')
  }

  if (checker) {
    console.log('masuk sini');
    setListOfAlarms(temp)
    setChecker(false)
  }
  console.log(temp, '<<<< temp');
  console.log(checker, '<<<< checker');
  console.log(listOfAlarms, '<<<< listOfAlarms after reassign supposedly');
//   console.log(alarms, '<<< alarms');
//   alert(`timesPerDay = ${meds.timesPerDay}`)
  const [isLoading, setIsLoading] = useState(false);
  const [fontsLoaded] = useFonts({
    PassionOne_400Regular
  })

  if (!fontsLoaded) {
    console.log(fontsLoaded)
    return <Text>Loading...</Text>
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.view} >
          <Text
          style={{fontFamily: 'PassionOne_400Regular', fontSize: 40}}
          >{meds.name}</Text>
          <Text
          style={{fontFamily: 'PassionOne_400Regular', fontSize: 25}}
          >Set Alarm</Text>
          {listOfAlarms.map(alarm => {
              return (
                  <TextInput
                  label={"Alarm 1"}
                  keyboardType={'numeric'}
                  />
              )
          })}
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
