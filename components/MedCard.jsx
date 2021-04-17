import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Card } from 'react-native-paper';
import { useNavigation, Platform } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function DocCard(props) {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const navigation = useNavigation()
  const { name, totalMed, alarm, timesPerDay, doses } = props
  const parsing = JSON.parse(JSON.stringify(totalMed, null, 4))
  const [medAmmount, setMedAmmout] = useState(parsing)
  const alarmList = setAlarmTime()
  const LeftContent = props => <Avatar.Text size={50} label={medAmmount} color="#3075b5" style={styles.avatar}/>
  const RightContent = props => (
    <Icon
    name="edit-3"
    size={30}
    style={{marginRight: 20}}
    onPress={() => {navigation.navigate("Set Alarm", {meds: {name, alarm, totalMed, timesPerDay, doses}})}}
    // onPress={() => {navigation.navigate('Home')}}
    // onPress={() => {setMedAmmout(medAmmount - 1)}}
    />
  )

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
    alert('ini push notif')
    navigation.navigate('Home')
    await Notifications.scheduleNotificationAsync({
      content: ({
        title: "You've got mail! 📬",
        body: `minutes ${param}`,
        data: { data: 'goes here' },
      }),
      trigger: { seconds: 1 },
    });
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

  setInterval(() => {
    const hours = new Date().getHours()
    const minutes = new Date().getMinutes()
    const seconds = new Date().getSeconds()
    alarm.forEach(time => {
      const alarmHour = +(time[0]+time[1])
      const alarmMinutes = +(time[3]+time[4])
      if (hours === alarmHour && minutes === alarmMinutes && seconds === 0) {
        alert(minutes)
        schedulePushNotification(minutes)
      }
    })
  }, 1000)

  // functions for push notification ends here

  function setAlarmTime () {
    if (alarm.length === 0) return "You haven't set the alarm"
    let temp = ''
    alarm.forEach((time, index) => {
      index === alarm.length - 1 ? temp += `${time}` : temp += `${time} | `
    });
    return temp
  }

  return (
    <Card style={styles.card}>
        <Card.Title title={name} subtitle={alarmList} left={LeftContent} right={RightContent} />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    width: "100%",
    shadowOpacity: 0.7,
    shadowRadius: 2.5
  },
  avatar: {
    backgroundColor: 'white'
  }
})
