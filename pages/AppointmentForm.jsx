import React, { Component, useState, useEffect } from 'react'
import { StyleSheet, Text, ScrollView, View, ImageBackground, Image, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TextInput, Button, Avatar } from 'react-native-paper'
// const DateTimePicker = require('@react-native-community/datetimepicker');
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SpecialityCard from "../components/SpecialityCard"
import Icon from 'react-native-vector-icons/FontAwesome5'
import IconAnt from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { asyncNewAppointment } from '../store/actions'
import { useDispatch } from 'react-redux'

export default function AppointmentForm(props) {
    const dispatch = useDispatch()
    const { practice, speciality, name, _id, image_url } = props.route.params
    const [appointmentDate, setAppointmentDate] = useState('')
    const [appointmentDateToPass, setAppointmentDateToPass] = useState('')
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [practiceDays, setPracticeDays] = useState('')
    const [comorbid, setComorbid] = useState('')
    const [userData, setUserData] = useState('')


    useEffect(() => {
        const getDetail = async () => {
            console.log(Platform.OS, '<<< OS platform');
            let tempArr = []
            practice.forEach(details => tempArr.push(details.day))
            setPracticeDays(tempArr)
            const cache = JSON.parse(await AsyncStorage.getItem('user-data'))
            setUserData(cache)
            let temp = ''
            const contoh = cache.account.comorbid.join(',')
            setComorbid(contoh)
        }
        getDetail()
    }, [])

    useEffect(() => {
        // const day = new Date(appointmentDate).getDate()
        // console.log(day, '<<<< appointment date choosen');
    }, [appointmentDate])

    const showDatePicker = () => {
        console.log("masuk func sho date picker");
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (value) => {
        console.log(value, '<<<<< value');
        if (Platform.OS === "ios") {
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
            const date = new Date(value).toLocaleString('en-US', { timeZone })
            const day = new Date(String(date)).getDay()
            let theDay = ''
            switch (day) {
                case 0:
                    theDay = 'Sunday'
                    break;
                case 1:
                    theDay = 'Monday'
                    break;
                case 2:
                    theDay = 'Tuesday'
                    break;
                case 3:
                    theDay = 'Wednesday'
                    break;
                case 4:
                    theDay = 'Thursday'
                    break;
                case 5:
                    theDay = 'Friday'
                    break;
                case 6:
                    theDay = 'Saturday'
                    break;
            }
            let validator = false
            practiceDays.forEach(day => {
                if (day.toLowerCase() === theDay.toLowerCase()) validator = true
            })
            if (validator) {
                console.log("masuk validator");
                const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                const month = monthNames[value.getMonth()]
                const newFormat = `${theDay}, ${value.getDate()} ${month} ${value.getFullYear()}`
                const dateToPass = new Date(`${value.getDate()} ${month} ${value.getFullYear()} 12:12:12`)
                // console.log(`${value.getDate()} ${month} ${value.getFullYear()} ini adalah appointment date`);
                // const dateToPass = new Date(date)
                setAppointmentDateToPass(new Date(dateToPass));
                setAppointmentDate(newFormat)
                hideDatePicker();
            } else {
                alert('doctor is not available on that day')
            }
        }
        else {
            const date = new Date(value).toLocaleString('en-US', { timeZone: "Asia/Jakarta" })
            const day = new Date(String(date)).getDay()
            let theDay = ''
            switch (day) {
                case 0:
                    theDay = 'Sunday'
                    break;
                case 1:
                    theDay = 'Monday'
                    break;
                case 2:
                    theDay = 'Tuesday'
                    break;
                case 3:
                    theDay = 'Wednesday'
                    break;
                case 4:
                    theDay = 'Thursday'
                    break;
                case 5:
                    theDay = 'Friday'
                    break;
                case 6:
                    theDay = 'Saturday'
                    break;
            }
            console.log(theDay, "<<< day");
            let validator = false
            practiceDays.forEach(day => {
                if (day.toLowerCase() === theDay.toLowerCase()) validator = true
            })
            if (validator) {
                console.log("masuk validator");
                const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                const month = monthNames[value.getMonth()]
                console.log(theDay, "<<< theday di validator");
                const newFormat = `${theDay}, ${value.getDate()} ${month} ${value.getFullYear()}`
                console.log(newFormat,'<< new format');
                const dateToPass = new Date(`${value.getDate()} ${month} ${value.getFullYear()} 12:12:12`)
                console.log(dateToPass,'<< date to pass');
                // console.log(`${value.getDate()} ${month} ${value.getFullYear()} ini adalah appointment date`);
                // const dateToPass = new Date(date)
                setAppointmentDateToPass(new Date(dateToPass));
                setAppointmentDate(newFormat)
                hideDatePicker();
            } else {
                alert('doctor is not available on that day')
            }
        }

    };


    return (
        <View style={{
            backgroundColor: 'white',
            paddingTop: 80,
            height: '100%'
        }}>
            <View style={{
                width: '100%',
                height: 210,
                position: "absolute",
                top: 0,
                borderBottomLeftRadius: 60,
                borderBottomRightRadius: 60,
                borderBottomWidth: 3,
                // borderBottomStartRadius: 3,
                borderColor: '#68e8cb',
                // backgroundColor: '#68e8cb',
                zIndex: 0
            }}>
            </View>
            <View style={{
                flexDirection: 'row',
                alignSelf: 'center',
            }}>
                <View>
                    <Avatar.Image size={100} source={{ uri: image_url }} style={{ marginHorizontal: 10, }} />
                    {/* <Avatar.Image size={100} source={require(`../src/images/doctor0.jpeg`)} style={{marginHorizontal: 10,}}/> */}
                </View>
                <View style={{
                    marginLeft: 20
                }}>
                    <Text style={{
                        fontFamily: 'coolvetica-rg',
                        fontSize: 20,
                        textAlign: 'left',
                    }}>{name}</Text>
                    <View style={{
                        marginBottom: 20,
                        alignSelf: 'center'
                    }}>
                        <Text style={{
                            textAlign: 'left',
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
            </View>

            <View
                style={{
                    marginTop: 60,
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
                    value={comorbid}
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
                    onPress={showDatePicker}
                />
                <TextInput
                    style={{
                        height: 50,
                        width: 250,
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
                    disabled={false}
                />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />

            </View>

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
                onPress={async () => {
                    const obj = {
                        access_token: userData.access_token,
                        doctorId: _id,
                        appointmentDate: appointmentDateToPass
                    }
                    try {
                        console.log(obj, '<<<< argument to pass');
                        const create = await dispatch(asyncNewAppointment(obj))
                        // console.log(create, '<<<< create');
                        alert('Appointment created!')
                        setAppointmentDate('')
                        setAppointmentDateToPass('')
                        props.navigation.navigate('Home')
                    } catch (error) {
                        console.log('failed');
                        console.log(error);
                    }
                }}
            >
                Make Appointment
          </Button>
            <Image source={require('../src/images/appointment-form-image.gif')} style={{ height: "30%", width: "55%", alignSelf: 'center', marginTop: 10 }}></Image>
        </View>
    )
}