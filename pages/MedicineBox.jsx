//useEffect,medicinesstate, useSelector, home line 37,47,48

import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, ScrollView, View, ImageBackground, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { dispatchMedsFromCache, asyncFetchMeds } from '../store/actions'
import { useIsFocused } from '@react-navigation/native'
import {
  useFonts,
  PassionOne_400Regular
} from '@expo-google-fonts/dev'
import MedCard from '../components/MedCard'


export default function Doctors({ navigation }) {
  const isFocused = useIsFocused()
  const dispatch = useDispatch()
  // const medicines = useSelector(state => state.medicineReducer.medicines)
  // const [medicines, setMedicines] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [fontsLoaded] = useFonts({
    PassionOne_400Regular
  })

  // useEffect(() => {
  //   console.log(medicines, '<<<<<<<<<<<, medicines dari useeffect medbox')
  //   console.log('masuk useeffect');
  // }, [isFocused])
  const medicines = [
    {
      medicine: {
        "id": "1",
        "name": "panadol",
        "description": "sakit kepala",
        "stock": 900
      },
      totalMed : 10,
      alarm:"--:--",
      timesPerDay:1,
      doses:2,
    },
    {
      medicine: {
        "id": "1",
        "name": "panad1l",
        "description": "sakit ",
        "stock": 90
      },
      totalMed : 14,
      alarm:"--:--",
      timesPerDay:1,
      doses:3,
    },
    {
      medicine: {
        "id": "1",
        "name": "panadul",
        "description": " kepala",
        "stock": 9
      },
      totalMed : 19,
      alarm:"--:--",
      timesPerDay:1,
      doses:5,
    }
  ]

  if (!fontsLoaded || isLoading) {
    return <Text>Loading...</Text>
  }

  return (
    <View style={{
      flexDirection: 'column'
    }}>
      <ImageBackground source={require('../src/images/cadangan-2-edited.png')}
        style={{
          width: "100%",
          height: '100%',
          backgroundColor: '#79d9c3',
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
            {/* <Image source={require('../src/images/medicines-image.png')} style={{ width: 150, resizeMode: 'contain', height: 100, }}></Image> */}
          </View>
        </View>
        <ScrollView
          vertical
          showsVerticalScrollIndicator={false}
          style={{
            // width: 100,
            // maxHeight: 400,
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
    marginTop: 230,
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
    color: "#4a4a4a",
    marginBottom: 10
  }
})