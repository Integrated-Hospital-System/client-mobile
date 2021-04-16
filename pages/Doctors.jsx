import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { Avatar, Button, Card } from 'react-native-paper';
import {
  useFonts,
  Amarante_400Regular,
  BerkshireSwash_400Regular
} from '@expo-google-fonts/dev'
import DoctorCard from '../components/DoctorCard'
const axios = require('axios')


export default function Doctors() {
  const [doctors, setDoctors] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [fontsLoaded] = useFonts({
    Amarante_400Regular,
    BerkshireSwash_400Regular
  })
  async function getDoctors () {
    console.log("nyari dokter")
    const { data } =await axios({url: 'http://localhost:3001/accounts', method: 'get'})
    const filtered = data.filter (account => account.role === 'doctor')
    setDoctors(filtered)
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
    console.log(doctors, '<<< dokter');
    return <Text>Loading...</Text>
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.view} >
          <Text
          style={{fontFamily: 'BerkshireSwash_400Regular', fontSize: 40}}
          >Doctors</Text>
          {doctors.map(doc => (
            <DoctorCard
            key={doc.name}
            name={doc.name}
            image_url={doc.image_url}
            practice={doc.practice}
            />
          ))}
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
