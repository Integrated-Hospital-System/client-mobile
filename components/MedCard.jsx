//set interval, set alarm time, const alarm list, alarm list di render, gw comment duluuuu

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ImageBackground, Image, Text } from 'react-native';
import { Avatar, Card } from 'react-native-paper';
import { useNavigation, Platform } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector, useDispatch } from 'react-redux'
import { deleteMed } from '../store/actions'
import { useIsFocused } from '@react-navigation/native'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function DocCard(props) {
  const isFocused = useIsFocused()
  const [movePage, setMovePage] = useState(false)
  const medicines = useSelector(state => state.medicineReducer.medicines)
  const dispatch = useDispatch()
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const navigation = useNavigation()
  const { name, totalMed, alarm, timesPerDay, doses } = props
  const parsing = JSON.parse(JSON.stringify(totalMed, null, 4))
  const [medAmmount, setMedAmmout] = useState(parsing)
  const alarmList = setAlarmTime()
  // const LeftContent = props => <Avatar.Text size={50} label={medAmmount} color="white" style={styles.avatar} />
  const LeftContent = props => <View 
  style={{
    flexDirection: 'column',
    // backgroundColor: "#2e8760",
    height:50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  }}
  >
    <IconMCI name="pill" size={25} color="#02a87c"></IconMCI>
    <Text style={{color:'black', fontFamily:'coolvetica-rg' ,fontSize: 15}}>{medAmmount}</Text>
  </View>
  const RightContent = props => (
    <View>
      <Icon
      name="edit-3"
      size={20}
      style={{marginRight: 20}}
      onPress={() => {
        navigation.navigate("Set Alarm", {name, alarm, totalMed, timesPerDay, doses})
      }}
      />
      <Icon
      name="trash-2"
      size={20}
      style={{marginRight: 20}}
      onPress={() => {
        // console.log(name);
        deleteMedicine(name)
      }}
      />
    </View>
  )

  useEffect(() => {
    console.log(`medicine ${name} have alarms as such:
    ${alarm}`);
    console.log(`${name} stock in redux store:
    ${totalMed}`);
    setMedAmmout(totalMed)
    if (movePage) {
      navigation.navigate('Confirmation', {name, doses, totalMed})
    }
    schedulePushNotification()
    console.log("schedulePushNotification sudah jalan");
  }, [isFocused])


  const deleteMedicine = (name) => {
    // const afterDeleted = medicines.filter(med => med.medicine.name !== name)
    // console.log(afterDeleted, '<<< after delete')
    dispatch(deleteMed(name))
    // console.log(medicines, '<<< medicines');
  }

  // functions for push notification starts here

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function schedulePushNotification(param) {
    const set = alarmList.split('|')
    set.forEach( async (time) => {
      let hourSet;
      let minuteSet;
      if (time !== "No alarm set") {
        hourSet = +(time.split(':')[0]).trim()
        minuteSet = +(time.split(':')[1]).trim()
        console.log(typeof hourSet, '<<<< type of hour set');
        console.log(typeof minuteSet, '<<<< type of minute set');
        if (typeof hourSet === 'number' && typeof minuteSet === 'number' && hourSet === hourSet) {
          console.log(`${hourSet}:${minuteSet}, '<<<<< next alarm of ${name}`);
          let notification = await Notifications.scheduleNotificationAsync({
            content: ({
              title: "Boop Boop... 💊",
              body: `It's time to take your ${name} x ${doses}`,
              data: { data: 'goes here' },
            }),
            trigger: { hour : hourSet, minute: minuteSet, repeats: true}
          });
          // if (notification) {
          //   console.log(notification, '<<<<< notication before navigate');
          //   navigation.navigate('Confirmation', {name, doses, totalMed})
          //     notification = false
          //     console.log(notification, '<<<<< notication after navigate');
          // }
        }
      }
    })
      // setMovePage(true)
  }
    
    async function registerForPushNotificationsAsync() {
      let token;
      if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
      } else {
        alert('Must use physical device for Push Notifications');
      }
      
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
      
      return token;
    }
    useEffect(() => {
      console.log('<<<<<<<<<<<<<<<<<<<<<<<<< check route');
      const hours = new Date().getHours()
      const minutes = new Date().getMinutes()
      const seconds = new Date().getSeconds()
      // console.log(hours, typeof hours, '<<<<<<< hours');
      // console.log(alarmHour, typeof alarmHour, '<<<<<<< alarmHour');
      // console.log(minutes, typeof minutes, '<<<<<<< minutes');
      // console.log(alarm, typeof alarm, '<<<<<<< alarm');
      // console.log(seconds, typeof seconds, '<<<<<<< seconds');
      alarm.forEach(time => {
        console.log(time.split(':'), '<<<< time');
        // const alarmHour = +(time[0]+time[1])
        // const alarmMinutes = +(time[3]+time[4])
        const alarmHour = +(time.split(':')[0])
        const alarmMinutes = +(time.split(':')[1])
        if (hours === alarmHour && minutes === alarmMinutes && seconds === 0) {
          console.log('<<<<<<<<<<<<<<<<<<<<<<<<< BERPINDAAAH!!!!!');
          navigation.navigate('Confirmation', {name, doses, totalMed})
        }
      })
    })
  // setInterval(() => {
  //   const hours = new Date().getHours()
  //   const minutes = new Date().getMinutes()
  //   const seconds = new Date().getSeconds()
  //   alarm.forEach(time => {
  //     const alarmHour = +(time[0]+time[1])
  //     const alarmMinutes = +(time[3]+time[4])
  //     if (hours === alarmHour && minutes === alarmMinutes && seconds === 0) {
  //       schedulePushNotification(minutes)
  //       navigation.navigate('Confirmation', {name, doses, totalMed})
  //     }
  //   })
  // }, 1000)
  // functions for push notification ends here

  function setAlarmTime () {
    let validator = false
    let temp = ''
    alarm.forEach((time, index) => {
      time !== '--:--' ? validator = true : Math.random()
      index === alarm.length - 1 ? temp += `${time}` : temp += `${time} | `
    });
    if (validator) return temp
    else return "No alarm set"
  }
  return (
    <Card style={styles.card}>
        <Card.Title title={name} subtitle={alarmList} subtitleStyle={{marginLeft: 10}} titleStyle={{marginLeft: 10}} left={LeftContent} right={RightContent} />
    </Card>
  )
}
const styles = StyleSheet.create({
  // card: {
  //   shadowOpacity: 0.7,
  //   shadowRadius: 5.5,
  //   width: 140,
  //   height: 200,
  //   marginTop: 80,
  //   alignSelf: 'center',
  //   opacity: 0.1
  // },
  card: {
    marginBottom: 20,
    width: "100%",
    shadowOpacity:1,
    borderRadius: 40,
    borderRightWidth: 5,
    borderBottomWidth: 5,
    borderColor: '#5e8275',
    
  },
  avatar: {
    backgroundColor: '#2e8760',

  }
})