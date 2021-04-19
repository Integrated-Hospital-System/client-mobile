import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { dispatchMedsFromCache } from '../store/actions'
import { useIsFocused } from '@react-navigation/native'
import {
  useFonts,
  PassionOne_400Regular
} from '@expo-google-fonts/dev'
import MedCard from '../components/MedCard'
const axios = require('axios')


export default function Doctors( { navigation } ) {
  const isFocused = useIsFocused()
  const dispatch = useDispatch()
  const medicines = useSelector(state => state.medicineReducer.medicines)
  // const [medicines, setMedicines] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [fontsLoaded] = useFonts({
    PassionOne_400Regular
  })
  
  useEffect(() => {
    console.log(medicines, '<<<<<<<<<<<, medicines dari useeffect medbox')
    console.log('masuk useeffect');
  }, [isFocused])

  if (!fontsLoaded || isLoading) {
    return <Text>Loading...</Text>
  }

  return (
    <>
      <ScrollView style={styles.container}
      horizontal
      >
        <View style={styles.view} >
          <Text
          style={{fontFamily: 'PassionOne_400Regular', fontSize: 40}}
          >Medicine Box</Text>
          {medicines.map((med, index) => {
            return <MedCard
              key={Math.random()}
              name={med.medicine.name}
              totalMed ={med.totalMedicine}
              alarm={med.alarms}
              timesPerDay={med.timesPerDay}
              doses={med.doses}
              />              
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
