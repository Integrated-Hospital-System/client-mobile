import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { Avatar, Button, Card, TextInput } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'
import { updateAlarm, asyncFetchMeds } from '../store/actions'
import {
  useFonts,
  PassionOne_400Regular
} from '@expo-google-fonts/dev'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useIsFocused } from '@react-navigation/native'


export default function SetAlarm({route, navigation}) {
  const isFocused = useIsFocused()
  const dispatch = useDispatch()
  const medicines = useSelector(state => state.medicineReducer.medicines)
  const [time, setTime] = useState('')
  const [indexToEdit, setIndexToEdit] = useState('')
  const { name, alarm, totalMed, timesPerDay, doses } = route.params
  const [tempAlarm, setTempAlarm] = useState(JSON.parse(JSON.stringify(alarm, null, 2)));
  const [isLoading, setIsLoading] = useState(false);
  const [fontsLoaded] = useFonts({
    PassionOne_400Regular
  })
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


  useEffect(() => {
    console.log(route.params, '<<<<< route params dari page set Alarm');
    setTempAlarm(JSON.parse(JSON.stringify(alarm, null, 2)))
  }, [isFocused])


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (value) => {
    const date = new Date(value)
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const alarmTime = date.toLocaleString('en-US', {timeZone})
    const hour = new Date(alarmTime).getHours()
    const minute= new Date(alarmTime).getMinutes()
    let minutes;
    let hours;
    minute < 10 ? minutes = '0' + minute : minutes = minute
    hour < 10 ? hours = '0' + hour : hours = hour
    setTime(`${hours}:${minutes}`)
    tempAlarm[indexToEdit] = `${hours}:${minutes}`
    // alarm[indexToEdit] = `${hours}:${minutes}`
    hideDatePicker();
  };

  function updateSchedule () {
    dispatch(updateAlarm(name, tempAlarm, medicines))
    navigation.navigate('MaMed')
  }

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
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="time"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          {tempAlarm.map((oneAlarm, index) => {
            return (
              <TextInput
              key={Math.random()}
              label={`Alarm ${index + 1}`}
              keyboardType={'numeric'}
              value={oneAlarm === '--:--' ? '' : oneAlarm}
              style={{backgroundColor: 'white'}}
              // onTouchStart={showDatePicker(index)}
              onTouchEnd={() => {
                setIndexToEdit(index)
                showDatePicker()
              }}
              />
              // <TextInput
              // key={Math.random()}
              // label={`Alarm ${index + 1}`}
              // keyboardType={'numeric'}
              // value={oneAlarm === '--:--' ? '' : oneAlarm}
              // style={{backgroundColor: 'white'}}
              // maxLength={5}
              // onChangeText={(value) => {
              //   const digit = value.length
              //   if (digit === 2) value = value + ':'
              //   else if (value === '') value = '--:--'
              //   alarm[index] = value
              //   const temporary = JSON.parse(JSON.stringify(alarm))
              //   setTempAlarm(temporary)
              // }}
              // />
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
