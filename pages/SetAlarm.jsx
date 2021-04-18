import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { Avatar, Button, Card, TextInput } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'
import { updateAlarm, asyncFetchMeds } from '../store/actions'
import {
  useFonts,
  PassionOne_400Regular
} from '@expo-google-fonts/dev'
import MedCard from '../components/MedCard'
const axios = require('axios')


export default function SetAlarm({route, navigation}) {
  const dispatch = useDispatch()
  const medicines = useSelector(state => state.medicineReducer.medicines)
  const medicineCache = useSelector(state => state.medicineReducer.medicines)
  const { name, alarm, totalMed, timesPerDay, doses } = route.params
  const [tempAlarm, setTempAlarm] = useState(JSON.parse(JSON.stringify(alarm, null, 2)));
  const [contoh, setContoh] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [fontsLoaded] = useFonts({
    PassionOne_400Regular
  })

  if (!fontsLoaded) {
    console.log(fontsLoaded)
    return <Text>Loading...</Text>
  }

  function onChange (value) {
    setContoh(value)
  }

  console.log(tempAlarm, '<<< tempAlarm');

  function updateSchedule () {
    console.log(tempAlarm, '<<< dari setAlarm');
    dispatch(updateAlarm(name, tempAlarm, medicines))
    dispatch(asyncFetchMeds())
    console.log('ASASDASDASDASDASDASDASDASDASDQKWDKJQWNDJQNWDJKQNWD ++++++++++++++++++++++++++');
    console.log(medicineCache, '<<<< after update');
    navigation.navigate('MaMed')
  }


  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.view} >
          <Text
          style={{fontFamily: 'PassionOne_400Regular', fontSize: 40}}
          >{name}</Text>
          <Text
          style={{fontFamily: 'PassionOne_400Regular', fontSize: 25}}
          >Set Alarm</Text>
          <View style={{marginTop: 50}}>
          <TextInput
          label={`Times a day`}
          value={String(timesPerDay)}
          style={{backgroundColor: 'white'}}
          disabled={true}
          />
          <TextInput
          // label={`Alarm ${index + 1}`}
          keyboardType={'numeric'}
          // placeholder={tempAlarm[index] === '--:--' ? '' : tempAlarm[index]}
          value={contoh}
          style={{backgroundColor: 'white'}}
          maxLength={5}
          onChangeText={onChange}
          />
          {alarm.map((alarm, index) => {
            return (
              <TextInput
              key={Math.random()}
              label={`Alarm ${index + 1}`}
              keyboardType={'numeric'}
              // placeholder={tempAlarm[index] === '--:--' ? '' : tempAlarm[index]}
              value={tempAlarm[index] === '--:--' ? '' : tempAlarm[index]}
              style={{backgroundColor: 'white'}}
              maxLength={5}
              onChangeText={(value) => {
                const digit = value.length
                if (value.length === 2) value = value + ':'
                else if (value === '') value = '--:--'
                const newArr = JSON.parse(JSON.stringify(tempAlarm))
                console.log(tempAlarm, '<<< newArr sebelum reassign')
                newArr[index] = value
                setTempAlarm(newArr)
                console.log(tempAlarm, '<<< tempAlaram')
              }}
              />
            )
          })}
          </View>
          <Button style={{marginTop: 20}} onPress={updateSchedule} >Update</Button>
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
