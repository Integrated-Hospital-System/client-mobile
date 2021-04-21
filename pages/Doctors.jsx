import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView, View, ImageBackground, Image, Dimensions } from 'react-native';
import { Avatar, Button, Card, TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux'
import {
  useFonts,
  PassionOne_400Regular
} from '@expo-google-fonts/dev'
import DoctorCard from '../components/DoctorCard'
const axios = require('axios')
import AccordionView from '../components/Collapsable'
import Icon from 'react-native-vector-icons/Ionicons'


export default function Doctors() {
  const doctors = useSelector(state => state.doctorReducer.doctors)
  const [isLoading, setIsLoading] = useState(false);
  const [searchBar, setSearchBar] = useState('')
  const [filteredDoctor, setFilteredDoctor] = useState([])
  // console.log('>>>>>> doctors<<<<<<<<<<<<<');
  // console.log(doctors,"<<doctors<<<");
  const [fontsLoaded] = useFonts({
    PassionOne_400Regular
  })

  function filterData(searchBar) {
    
    const newData = doctors.filter(eachDoc => {
      let docName = eachDoc.name.toLocaleLowerCase()
      let docSpeciality = eachDoc.speciality.join(" ")
      if (docName.includes(searchBar.toLowerCase()) || docSpeciality.includes(searchBar.toLowerCase())) {
        return eachDoc
      }
    })
    console.log(searchBar.toLowerCase());
    console.log(newData, '<<<<<< new data');
    setFilteredDoctor(newData)
    console.log(filteredDoctor, '<<< filtered doctor<<<<<<<<<');
    setSearchBar(searchBar)
  }

  // console.log(doctors, '<<<< doctors di page doctors');
  if (!fontsLoaded || isLoading) {
    return <Text>Loading...</Text>
  }
  return (
    <View
      style={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
      }}
    >
      <ImageBackground source={require('../src/images/cadangan-3-edited.png')} style={{ width: "100%", height: '100%', backgroundColor: '#79d9c3' }}>
        <ScrollView
          vertical
        >

          <View style={{
            flexDirection: 'row',
            height: 200,
            marginTop: 50
            // backgroundColor: 'red'
          }}>
            <Image source={require('../src/images/3doctors.png')} style={{ height: "100%", width: "100%" }} />
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: 'center',
                marginHorizontal: 40,
                backgroundColor: 'white',
                // borderWidth: 3,
                borderBottomWidth: 3,
                borderColor: "#0ec7a8",
                borderRadius: 20,

                // borderBottomLeftRadius: 20,
                // borderBottomRightRadius: 20
              }}>
              <Icon
                name="search"
                size={32}
                color="#0ec7a8"
                style={{
                  paddingHorizontal: 10
                }}
              />

              <TextInput
                style={{
                  height: 50,
                  width: 230,
                  backgroundColor: "white"
                }}
                underlineColor="white"
                label="find doctor by name or speciality"
                onChangeText={text => filterData(text)}
                returnKeyType="next"
                // value={email}
                // onChangeText={emailInput => setEmail(emailInput)}
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
              />
            </View>
          </View>
          {
            !searchBar ?
              doctors.map(doctor => {
                return <AccordionView doctor={doctor} key={doctor._id} />
              })
              :
              filteredDoctor.map(doctor => {
                return <AccordionView doctor={doctor} key={doctor._id} />
              })
          }

        </ScrollView>
      </ImageBackground>
    </View>
  );
}

{/* <View style={styles.view} >
  <Text
    style={{ fontFamily: 'PassionOne_400Regular', fontSize: 40 }}
  >Doctors</Text>
  {doctors.map(doc => (
    <DoctorCard
      key={doc.name}
      name={doc.name}
      image_url={doc.image_url}
      practice={doc.practice}
    />
  ))}
</View> */}

const styles = StyleSheet.create({

  card: {
    marginTop: 20,
    width: "100%",
    shadowOpacity: 0.7,
    shadowRadius: 2.5
  }
});
