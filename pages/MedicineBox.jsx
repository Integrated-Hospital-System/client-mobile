import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, ScrollView, View, ImageBackground, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { asyncFetchMeds } from '../store/actions'
import {
  useFonts,
  PassionOne_400Regular
} from '@expo-google-fonts/dev'
import MedCard from '../components/MedCard'
const axios = require('axios')


export default function Doctors() {
  const dispatch = useDispatch()
  // const medicines = useSelector(state => state.medicineReducer.medicines)
  const [isLoading, setIsLoading] = useState(false);
  const [fontsLoaded] = useFonts({
    PassionOne_400Regular
  })
  if (!fontsLoaded || isLoading) {
    return <Text>Loading...</Text>
  }


  const medicines = [
    {
      "medicine": {
        "id": "1",
        "name": "panadol",
        "description": "sakit kepala"
      },
      "timesPerDay": 2,
      "doses": 3,
      "totalMedicine": 9
    },
    {
      "medicine": {
        "id": "2",
        "name": "nusantara",
        "description": "vaksin covid juga"
      },
      "timesPerDay": 2,
      "doses": 3,
      "totalMedicine": 7
    },
    {
      "medicine": {
        "id": "3",
        "name": "pfizer",
        "description": "vaksin covid"
      },
      "timesPerDay": 2,
      "doses": 3,
      "totalMedicine": 3
    },
    {
      "medicine": {
        "id": "4",
        "name": "panadol",
        "description": "sakit kepala"
      },
      "timesPerDay": 2,
      "doses": 3,
      "totalMedicine": 9
    },
    {
      "medicine": {
        "id": "5",
        "name": "nusantara",
        "description": "vaksin covid juga"
      },
      "timesPerDay": 2,
      "doses": 3,
      "totalMedicine": 7
    },
    {
      "medicine": {
        "id": "6",
        "name": "pfizer",
        "description": "vaksin covid"
      },
      "timesPerDay": 2,
      "doses": 3,
      "totalMedicine": 3
    }
  ]

  return (
    <View style={{
      flexDirection: 'column'
    }}>
      <ImageBackground source={require('../src/images/cadangan-2-edited.png')}
        style={{
          width: "100%",
          height: '100%',
          backgroundColor: '#daf0eb', 
          shadowOffset: {
            width: 100,
            height: -100
          }
          , shadowColor: 'black'
        }}>
        <View style={{
          flexDirection: 'row',
          marginBottom: 10,
        }}>
          <View style={styles.topCont}>
            <Text style={styles.title}>My Meds</Text>
            <Text style={styles.titleNote}>Consistency is the key</Text>
          </View>
          <View style={{ marginTop: 200, }}>
            <Image source={require('../src/images/medicines-image.png')} style={{ width: 150, resizeMode: 'contain', height: 100, }}></Image>
          </View>
        </View>
        <ScrollView
          vertical
          showsVerticalScrollIndicator={false}
          style={{
            // width: 100,
            maxHeight: 400,
            // backgroundColor: 'red',
            marginHorizontal: 30,
          }}

        >
          {medicines.map((med, index) => {
            return <MedCard
              key={Math.random()}
              name={med.medicine.name}
              totalMed={med.totalMedicine}
              alarm={med.alarms}
              timesPerDay={med.timesPerDay}
              doses={med.doses}
            />
          })}
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({

  // boxMed: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   height: 200,
  //   width: 300,
  //   backgroundColor:'grey'
  // },

  topCont: {
    paddingHorizontal: 30,
    marginTop: 200,
    marginRight: -10
  },
  title: {
    fontFamily: 'coolvetica-rg',
    fontSize: 40,
    // color: "white",
    color: 'black'
  },
  titleNote: {
    fontFamily: 'coolvetica-rg',
    fontSize: 15,
    color: "#9c9c9c",
    marginBottom: 10
  }
})