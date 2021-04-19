import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Alert, Image, StyleSheet, Text, View, } from 'react-native';
import { Button, TextInput, RadioButton } from 'react-native-paper';
import { Ionicons } from "@expo/vector-icons"
import AwesomeAlert from 'react-native-awesome-alerts';
import { signUp } from '../store/actions'
import { useDispatch } from 'react-redux';
// import RNPickerSelect from 'react-native-picker-select';
// import Icon from 'react-native-vector-icons/Feather';


export default function SignUp(props) {
    const [signUpName, setSignUpName] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [signUpAge, setSignUpAge] = useState('');
    const [signUpGender, setSignUpGender] = useState('');
    const [signUpComorbid, setSignUpComorbid] = useState('');
    const [alertfail, setAlertFail] = useState(false)
    const [alertsuccess, setAlertSuccess] = useState(false)
    const dispatch = useDispatch()

    const onSubmitSignUp = () => {
        // check email dan passwordnya kalo bener masukin di cache
        console.log({
            signUpName,
            signUpEmail,
            signUpPassword,
            signUpAge,
            signUpGender,
            signUpComorbid
        });
        if (signUpName && signUpEmail && signUpPassword && signUpAge && signUpGender) {
            const signupdata = {
                "name": signUpName,
                "email": signUpEmail,
                "password": signUpPassword,
                // "role": "patient",
                "age": Number(signUpAge),
                "gender": signUpGender,
                // "comorbid": arrayComorbid
                "comorbid": [...signUpComorbid?.split(',')]
            }
            // axios disini
            console.log(signupdata, "<< signupdta");
            dispatch(signUp(signupdata))
            setAlertSuccess(true)
        }
        else {
            setAlertFail(true)
        }
    };

    return (
        <View style={styles.signInContainer}>

            <Text style={styles.helloText}>
                One Step Closer!
            </Text>
            <Text
                style={{
                    opacity: 0.4,
                    marginBottom: 5,
                    textAlign: 'center',
                    marginHorizontal: 40
                }}>
                Please fill required data below.
            </Text>

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
                    name="person"
                    size={20}
                    color="#0ec7a8"
                    style={{
                        paddingHorizontal: 10
                    }}
                />
                <TextInput
                    style={{
                        height: 50,
                        width: 270,
                        backgroundColor: "white",
                    }}
                    underlineColor="white"
                    label="Full Name"
                    returnKeyType="next"
                    value={signUpName}
                    onChangeText={text => setSignUpName(text)}
                    autoCompleteType="name"
                    textContentType="name"
                    keyboardType="default"
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
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20
                }}>
                <Ionicons
                    name="body"
                    size={20}
                    color="#0ec7a8"
                    style={{
                        paddingHorizontal: 10
                    }}
                />
                <TextInput
                    style={{
                        height: 50,
                        width: 270,
                        backgroundColor: "white",
                    }}
                    underlineColor="white"
                    label="Age"
                    returnKeyType="next"
                    value={signUpAge}
                    onChangeText={text => setSignUpAge(text)}
                    keyboardType="number-pad"
                />
            </View>

            <View
                style={{
                    flexDirection: "row",
                    alignItems: 'center',
                    marginHorizontal: 40,
                    height: 50,
                    backgroundColor: 'white',
                    borderBottomWidth: 1,
                    borderColor: "#0ec7a8",
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    position: "relative",
                    zIndex: 1,
                }}>
                <Ionicons
                    name="male-female"
                    size={20}
                    color="#0ec7a8"
                    style={{
                        paddingHorizontal: 10
                    }}
                />
                
                    {/* GABISAAA<<<<<<< NPM masih kacau */}
                    {/* <DropDownPicker
                    items={[
                        { label: 'Male', value: 'male', },
                        { label: 'Female', value: 'female' }
                    ]}
                    placeholder="Select Gender"
                    defaultValue={signUpGender}
                    containerStyle={{ height: 50, width: 270 }}
                    style={{ backgroundColor: 'white', borderWidth: 0, marginHorizontal: 40, }}
                    itemStyle={{
                        justifyContent: 'flex-start',
                    }}
                    dropDownStyle={{ backgroundColor: '#fafafa', marginHorizontal: 40, }}
                    onChangeItem={item => setSignUpGender(item.value)}
                /> */}
                <RadioButton
                    value="male"
                    status={signUpGender === 'male' ? 'checked' : 'unchecked'}
                    onPress={() => setSignUpGender('male')}
                />
                <Text>Male</Text>
                <RadioButton
                    value="female"
                    status={signUpGender === 'female' ? 'checked' : 'unchecked'}
                    onPress={() => setSignUpGender('female')}
                />
                <Text>Female</Text>
                <RadioButton
                    value="other"
                    status={signUpGender === 'other' ? 'checked' : 'unchecked'}
                    onPress={() => setSignUpGender('other')}
                />
                <Text>Other</Text>
            </View>

            

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
                    name="document"
                    size={20}
                    color="#0ec7a8"
                    style={{
                        paddingHorizontal: 10
                    }}
                />
                <TextInput
                    style={{
                        height: 50,
                        width: 270,
                        backgroundColor: "white",
                    }}
                    underlineColor="white"
                    label="Comorbid History (optional)"
                    returnKeyType="next"
                    value={signUpComorbid}
                    // value={signUpComorbid ? signUpComorbid.join(", ") : ""}
                    onChangeText={text => {
                        // const toArray = text.split(',')
                        // const newData = toArray.map(e => e.trim())
                        setSignUpComorbid(text)
                    }}
                    autoCompleteType="name"
                    textContentType="name"
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
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20
                }}>
                <Ionicons
                    name="mail"
                    size={20}
                    color="#0ec7a8"
                    style={{
                        paddingHorizontal: 10
                    }}
                />
                <TextInput
                    style={{
                        height: 50,
                        width: 270,
                        backgroundColor: "white",
                    }}
                    underlineColor="white"
                    label="Email"
                    returnKeyType="next"
                    value={signUpEmail}
                    onChangeText={text => setSignUpEmail(text)}
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
                    // borderBottomLeftRadius: 20,
                    // borderBottomRightRadius: 20
                }}>
                <Ionicons
                    name="key"
                    size={20}
                    color="#0ec7a8"
                    style={{
                        paddingHorizontal: 10
                    }}
                />
                <TextInput
                    style={{
                        backgroundColor: "white",
                        paddingHorizontal: 10,
                        height: 50,
                        width: 270
                    }}
                    underlineColor="white"
                    label="Set Password"
                    returnKeyType="done"
                    value={signUpPassword}
                    onChangeText={text => setSignUpPassword(text)}
                    secureTextEntry
                />
            </View>

            {/* <Ionicons name="md-checkmark-circle" size={32} color="green" /> */}
            <Button
                mode="contained"
                icon="check-circle"
                onPress={onSubmitSignUp}
                style={{
                    marginHorizontal: 40,
                    marginTop: 20,
                    color: "white"
                }}
                color='#0ec7a8'
            >
                Sign Up
          </Button>

            <View style={{
                flexDirection: "column",
            }} >
                <Text
                    onPress={() => props.navigation.navigate('SignIn')}
                    style={{
                        color: "#0ec7a8",
                        textAlign: 'center',
                        marginTop: 10
                    }}
                >
                    Already have account
                </Text>
            </View>
            <AwesomeAlert
                show={alertfail}
                showProgress={false}
                title="Sign Up Failed"
                message="Please fill all required data"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                // showCancelButton={true}
                showConfirmButton={true}
                // cancelText="No, cancel"
                confirmText=" ok "
                confirmButtonColor="#d44944"
                onCancelPressed={() => {
                    setAlertFail(false)
                }}
                onConfirmPressed={() => {
                    // do something adn close alertnya
                    setAlertFail(false)
                }}
            />
            <AwesomeAlert
                show={alertsuccess}
                showProgress={false}
                title="Sign Up Success"
                message="Please sign in to log in"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                // showCancelButton={true}
                showConfirmButton={true}
                // cancelText="No, cancel"
                confirmText=" ok "
                confirmButtonColor="#0ec7a8"
                onCancelPressed={() => {
                    setAlertSuccess(false)
                }}
                onConfirmPressed={() => {
                    // do something adn close alertnya
                    setAlertSuccess(false)
                    props.navigation.navigate('SignIn')
                }}
            />
            <Image source={require('../src/images/signup-image.png')} style={{ width: "60%", height: "30%", marginHorizontal: 60 }}></Image>
        </View>
    );
};

const styles = StyleSheet.create({
    signInContainer: {
        flex: 1,
        // justifyContent: 'center',
        backgroundColor: 'white',
        // height: 100%,
        paddingTop: 50
    },
    helloText: {
        marginTop: 5,
        marginBottom: 2,
        fontFamily: "coolvetica-rg",
        fontSize: 25,
        textAlign: "center"
    },
    label: {
        marginTop: 10,
        textAlign: 'center'
    }
});

