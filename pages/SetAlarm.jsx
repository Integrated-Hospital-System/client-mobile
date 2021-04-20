// route.params yang di destruct, usestate tempAlarm gw komen dulu

import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, ScrollView, View, ImageBackground,Image } from 'react-native';
import { Avatar, Button, Card, TextInput } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'
import { updateAlarm, asyncFetchMeds } from '../store/actions'
import {
  useFonts,
  PassionOne_400Regular
} from '@expo-google-fonts/dev'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useIsFocused } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import IconFA from 'react-native-vector-icons/FontAwesome'


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

      <ScrollView style={{backgroundColor:'white'}}>
        <View style={{
          height: 700,
          width: 700,
          borderRadius: 400,
          position: 'absolute',
          borderColor: '#0ec7a8',
          backgroundColor: '#0ec7a8',
          borderWidth: 4,
          alignSelf:'center',
          top: -380
        }}></View>
        <View style={{
          marginTop: 50,
        }} >
          {/* <Image source={require('../src/images/setAlarmImage.png')} style={{
            alignSelf: "center",
            width: "70%",
            height: "40%"
          }}></Image> */}
          <Icon
          name="bell-circle"
          size={150}
          color='white'
          style={{
            alignSelf: 'center'
          }}
          />
          <Text
            style={{ fontFamily: 'coolvetica-rg', fontSize: 40, alignSelf: 'center' }}
          >{name}</Text>
          <Text
            style={{ fontFamily: 'coolvetica-rg', fontSize: 20, color: '#005c4e', alignSelf: 'center' }}
          >Set Alarm</Text>
          <View style={{ marginTop: 50, flex: 1 }}>
            <TextInput
              label={`Times a day`}
              value={String(timesPerDay)}
              style={{ backgroundColor: 'white',marginHorizontal: 40, }}
              disabled={true}
            />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="time"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            {alarm.map((oneAlarm, index) => {
              return (
                <View style={{
                  flexDirection: "row",
                  alignItems: 'center',
                  marginHorizontal: 40,
                  backgroundColor: 'white',
                  borderBottomWidth: 1,
                  borderColor: "#0ec7a8",
                  // borderTopLeftRadius: 20,
                  // borderTopRightRadius: 20
              }}>
                  <IconFA
                  name="check-square-o"
                  size={30}
                  style={{ paddingHorizontal: 10}}
                  color='#0ec7a8'
                  >
                  </IconFA>
                  <TextInput
                    key={Math.random()}
                    label={`Alarm ${index + 1}`}
                    keyboardType={'numeric'}
                    value={oneAlarm === '--:--' ? '' : oneAlarm}
                    underlineColor="white"
                    style={{ backgroundColor: 'white', width: 250}}
                    // onTouchStart={showDatePicker(index)}
                    onTouchEnd={() => {
                      setIndexToEdit(index)
                      showDatePicker()
                    }}
                  />
                </View>
              )
            })}
          </View>
          <Button 
          icon='pencil'
          style={{ 
            marginTop: 10 ,
            borderRadius: 10,
            backgroundColor: '#19b59b',
            marginHorizontal: 40,
            justifyContent: 'center',
            height: 50,
            // border
          }} 
          color= "black"
          onPress={updateSchedule} 
          >Update</Button>
        </View>
        <View />
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({

  card: {
    marginTop: 20,
    width: "100%",
    shadowOpacity: 0.7,
    shadowRadius: 2.5
  }
});