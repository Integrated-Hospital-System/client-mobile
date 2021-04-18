import React, { Component, useState } from 'react'
import { StyleSheet, Text, ScrollView, View, ImageBackground, Image, TextInput, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// const DateTimePicker = require('@react-native-community/datetimepicker');



export default function AppointmentForm(props) {
    console.log(props, "<<< props dummy doctor");
    const [appointmentDate, setAppointmentDate] = useState(new Date())

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Image source={require('../src/images/appointment-form-image.gif')} style={{ height: "50%", width: "50%" }}></Image>
            <Text>Appointment form</Text>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: 'center',
                    marginHorizontal: 40,
                    backgroundColor: 'white',
                    borderBottomWidth: 1,
                    borderColor: "#0ec7a8",
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20
                }}>
                <Ionicons
                    name="calendar"
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
                    label="Email"
                    returnKeyType="next"
                    value={appointmentDate}
                    onChangeText={inputDate => setAppointmentDate(inputDate)}
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                />
            </View>
           
           



            {/* <View>
        <View>
            <Button onPress={showDatepicker} title="Show date picker!" />
        </View>
        <View>
            <Button onPress={showTimepicker} title="Show time picker!" />
        </View>
        {show && (
            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
            />
        )}
    </View> */}


        </View>
    )
}


// {
//     "id" : "1",
//     "doctor": {   
//         "id" : "2",
//         "name" : "Hasan",
//         "username" : "hasan",
//         "email": "hasan@email.com",
//         "password" : "hasan",
//         "role" : "doctor"
//     },
//     "patient": {   
//         "id" : "5",
//         "name" : "Gunawan",
//         "username" : "gunawan",
//         "email": "gunawan@email.com",
//         "password" : "gunawan",
//         "role" : "patient",
//         "age" : 50,
//         "gender" : "male",
//         "comorbid" : ["diabetes"]
//     },
//     "appointmentDate" : "15/04/2021 20:00",
//     "isCompleted" : false
// },