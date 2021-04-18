import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { Avatar, Button, Card, TextInput } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'
import { updateAlarm } from '../store/actions'
import {
  useFonts,
  PassionOne_400Regular
} from '@expo-google-fonts/dev'
import MedCard from '../components/MedCard'
const axios = require('axios')


export default function AlarmInput({route, index}) {
  const dispatch = useDispatch()
  console.log(index, '<<< props');
  // const alarmsCache = useSelector(state => state.medicineReducer.medicines)
  const alarm = useSelector(state => state.medicineReducer.medicines)
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

  console.log(tempAlarm, '<<< tempAlarm component input');

  return (
    <TextInput
    key={Math.random()}
    // label={`Alarm ${index + 1}`}
    label={`Alarm kesekian`}
    keyboardType={'numeric'}
    // placeholder={tempAlarm[index] === '--:--' ? '' : tempAlarm[index]}
    value={contoh}
    // value={tempAlarm[index] === '--:--' ? '' : tempAlarm[index]}
    style={{backgroundColor: 'white'}}
    maxLength={5}
    onChangeText={(value) => {
        setContoh(value)
        console.log(contoh, '<<<<');
    }}
    />
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
