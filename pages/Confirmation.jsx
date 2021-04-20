import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, ScrollView, View, Image } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// import { useSelector, useDispatch } from 'react-redux'
// import { dispatchMedsFromCache } from '../store/actions'
// import { useIsFocused } from '@react-navigation/native'
import {
  useFonts,
  PassionOne_400Regular
} from '@expo-google-fonts/dev'


export default function Doctors({ navigation }) {
  // const isFocused = useIsFocused()
  // const dispatch = useDispatch()
  // const medicines = useSelector(state => state.medicineReducer.medicines)
  // const [medicines, setMedicines] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [fontsLoaded] = useFonts({
    PassionOne_400Regular
  })

  // useEffect(() => {
  //   console.log(medicines, '<<<<<<<<<<<, medicines dari useeffect medbox')
  //   console.log('masuk useeffect');
  // }, [isFocused])

  if (!fontsLoaded || isLoading) {
    return <Text>Loading...</Text>
  }

  return (
    <>
      <View style={{
        flexDirection: 'column',
        height: "100%",
        // justifyContent: 'center',
        backgroundColor: 'white'
      }}>
        
        <View style={{
          height: 700,
          width: 700,
          borderRadius: 400,
          position: 'absolute',
          borderColor: '#0ec7a8',
          backgroundColor: '#0ec7a8',
          borderWidth: 4,
          alignSelf:'center',
          top: -510
        }}></View>
        <View style={{
          height: 730,
          width: 500,
          borderRadius: 400,
          position: 'absolute',
          backgroundColor: '#b5f7e1',
          alignSelf:'center',
          top: -465,
          zIndex:-1
        }}></View>
        <Image source={require('../src/images/confirmation1.png')}
          style={{
            width: "70%",
            resizeMode: 'contain',
            height: '40%',
            alignSelf: 'center',
            marginTop: 50,
            // backgroundColor: "blue"
          }}></Image>
          <Icon
          name="bell-ring"
          size={50}
          color='#0ec7a8'
          style={{
            textAlign:'center'
          }}
          />
        <Text
          style={{
            fontFamily: 'coolvetica-rg',
            fontSize: 23,
            textAlign: 'center',
            // backgroundColor: 'red'
          }}
        >Have you take your medicine?</Text>
        <View style={styles.answer} >
          <Button
            mode="outlined"
            icon="window-close"
            // onPress={}
            style={{
              marginHorizontal: 10,
              color: "white",
              justifyContent:'center',
              width:150,
              height: 100,
              fontSize: 40,
              borderColor:'#0ec7a8',
              borderWidth:2
            }}
            color='#0ec7a8'
            onPress={() => {
              navi
            }}
          >
            No
          </Button>
          <Button
            mode="contained"
            icon="check"
            // onPress={}
            style={{
              marginHorizontal: 10,
              color: "white",
              justifyContent:'center',
              fontSize: 40,
              width:150,
              height: 100,
            }}
            color='#0ec7a8'
          >
            Yes
          </Button>

        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  answer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: 'blue'
  },
});
