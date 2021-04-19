import React, { Component, useState } from 'react'
import { StyleSheet, Text, ScrollView, View, ImageBackground, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TextInput, Button } from 'react-native-paper'
// const DateTimePicker = require('@react-native-community/datetimepicker');
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SpecialityCard from "../components/SpecialityCard"
import Icon from 'react-native-vector-icons/FontAwesome5'
import IconAnt from 'react-native-vector-icons/AntDesign'

export default function AppointmentForm(props) {
    console.log(props, "<<< props dummy doctor");
    const { practice, speciality, name, id } = props.route.params
    const [appointmentDate, setAppointmentDate] = useState('')


    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setAppointmentDate(date);
        hideDatePicker();
    };


    return (
        <View style={{
            // backgroundColor: 'red'
            marginTop: 70,
        }}>
            <Text style={{
                fontFamily: 'coolvetica-rg',
                marginBottom: 10,
                alignSelf: 'center'
            }}>Make Appointment with: </Text>
            <View>
                <Text style={{
                    fontFamily: 'coolvetica-rg',
                    fontSize: 20,
                    textAlign: 'center'
                    // marginBottom: 20,
                }}>Dr. {name}</Text>
                <View style={{
                    marginBottom: 20,
                    alignSelf: 'center'
                }}>
                    <Text style={{
                        textAlign: 'center',
                        // fontWeight: 100
                    }}>
                        Speciality:
                    </Text>

                    {/* <View> */}
                        {
                            speciality.map(eachSpeciality => {
                                return <SpecialityCard eachSpeciality={eachSpeciality} key={eachSpeciality}></SpecialityCard>
                            })
                        }
                    {/* </View> */}

                </View>
            </View>

            <View
                style={{
                    flexDirection: "row",
                    alignItems: 'center',
                    marginHorizontal: 40,
                    backgroundColor: 'white',
                    borderBottomWidth: 1,
                    borderColor: "#0ec7a8",
                }}>
                <Icon
                    name="file"
                    size={32}
                    color="#0ec7a8"
                    style={{
                        paddingHorizontal: 10,
                    }}
                />

                <TextInput
                    style={{
                        height: 50,
                        width: 240,
                        backgroundColor: "white",
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0
                    }}
                    underlineColor="white"
                    label="Comorbid"
                    returnKeyType="next"
                    // value={email}
                    // onChangeText={emailInput => setEmail(emailInput)}
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                />
            </View>

            <View
                style={{
                    flexDirection: "row",
                    alignItems: 'center',
                    marginHorizontal: 40,
                    backgroundColor: 'white',
                    borderBottomWidth: 1,
                    borderColor: "#0ec7a8",
                }}>
                <Icon
                    name="disease"
                    size={32}
                    color="#0ec7a8"
                    style={{
                        paddingHorizontal: 10,
                    }}
                />

                <TextInput
                    style={{
                        height: 50,
                        width: 230,
                        backgroundColor: "white",
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0
                    }}
                    underlineColor="white"
                    label="Disease"
                    returnKeyType="next"
                    // value={email}
                    // onChangeText={emailInput => setEmail(emailInput)}
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                />
            </View>

            <View
                style={{
                    flexDirection: "row",
                    alignItems: 'center',
                    marginHorizontal: 40,
                    marginBottom: 20,
                    backgroundColor: 'white',
                    borderBottomWidth: 1,
                    borderColor: "#0ec7a8",

                }}>
                <IconAnt
                    name="calendar"
                    size={32}
                    color="#0ec7a8"
                    style={{
                        paddingHorizontal: 10,
                    }}
                />
                <TextInput
                    style={{
                        height: 50,
                        width: 210,
                        backgroundColor: "white",
                        // borderRadius:10
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0

                    }}
                    underlineColor="white"
                    label="Set Date"
                    returnKeyType="next"
                    value={JSON.parse(JSON.stringify(appointmentDate)).split('T')[0]}
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    onTouchStart={showDatePicker}
                    keyboardType="email-address"
                    disabled={true}
                />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
                {/* <Ionicons
                    name="calendar"
                    size={32}
                    color="white"
                    style={{
                        paddingHorizontal: 7,
                        paddingVertical: 7,
                        borderWidth: 2,
                        borderRadius: 10,
                        textAlign: 'center',
                        alignItems: 'center',
                        backgroundColor: '#0ec7a8',
                        borderColor: "#0ec7a8",
                        // justifyContent: 'flex-end'
                    }}
                    onPress={showDatePicker}
                /> */}
            </View>


            <View>

            </View>

            {/* <View>
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

            <Button
                mode="contained"
                icon="check-circle"
                // onPress={onSubmitLogin}
                style={{
                    marginHorizontal: 40,
                    marginTop: 10,
                    color: "white",
                    marginBottom: 20
                }}
                color='#0ec7a8'
            >
                Make Appointment
          </Button>
            <Image source={require('../src/images/appointment-form-image.gif')} style={{ height: "35%", width: "65%", alignSelf: 'center', marginTop: 10 }}></Image>
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