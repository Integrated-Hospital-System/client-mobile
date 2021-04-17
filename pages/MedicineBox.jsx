import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { Avatar, Button, Card } from 'react-native-paper';
import {
  useFonts,
  PassionOne_400Regular
} from '@expo-google-fonts/dev'
import MedCard from '../components/MedCard'
const axios = require('axios')


export default function Doctors() {
  const [doctors, setDoctors] = useState([])
  const [medicines, setMedicines] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [fontsLoaded] = useFonts({
    PassionOne_400Regular
  })
  async function getDoctors () {
    console.log("fetching medicine taken")
    const { data } =await axios({url: 'http://localhost:3001/orders', method: 'get'})
    // console.log(data.filter(order => order.appointment.patient.id === "5"))
    let temp = []
    data.forEach(order => {
      if (order.appointment.patient.id === "5") {
        order.medicines.forEach(med => {
          temp.push(med)
        })
      }
    })
    // temp[0].alarm = ['08:00', '18:00']
    temp[0].alarm = []
    temp[1].alarm = ['09:00']
    temp[2].alarm = ['02:18', '02:05', '20:00']
    console.log(temp, '<<< temp');
    setMedicines(temp)

  }

  useEffect(() => {
    getDoctors()
  }, [])

  const LeftContent = props => <Avatar.Image size={50} source={{uri: 'https://3.bp.blogspot.com/-LUoLzQvEpDg/WUaT6nNYVoI/AAAAAAAAACY/BOso85Z8CMc4psxwsy-IbXWyAiIVPS6LQCLcBGAs/s640/UW54Adu.jpg'}}/>

  const RightContent = props => (<Card.Actions>
            <Button color="#3075b5">Info</Button>
          </Card.Actions>)

  if (!fontsLoaded || isLoading) {
    console.log(isLoading)
    console.log(fontsLoaded)
    return <Text>Loading...</Text>
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.view} >
          <Text
          style={{fontFamily: 'PassionOne_400Regular', fontSize: 40}}
          >Medicine Box</Text>
          {medicines.map((med, index) => {
            return (
              <MedCard
              key={Math.random()}
              name={med.medicine.name}
              totalMed ={med.totalMedicine}
              alarm={med.alarm}
              timesPerDay={med.timesPerDay}
              doses={med.doses}
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
