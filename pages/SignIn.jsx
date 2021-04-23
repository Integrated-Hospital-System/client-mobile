import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Ionicons } from "@expo/vector-icons"
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { asyncSignIn } from '../store/actions'
import { useDispatch, useSelector } from 'react-redux';
const axios = require('axios')

export default function SignIn(props) {
    const cache = useSelector(state => state.patientReducer.loggedAccount)
    const dispatch = useDispatch()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alertFailLogin, setAlertFailLogin] = useState(false)




    useEffect(async () => {
        // await AsyncStorage.removeItem('user-data')
        const checkCache = async () => {
            const cachenow = await AsyncStorage.getItem('user-data')
            console.log(cachenow, '<<<<< cache at sign in page');
            console.log('masuk sign in pertama kali')
            if (cachenow) {
                props.navigation.navigate('Home')
            }
        }
        checkCache()
    }, [])

    const onSubmitLogin = async () => {
        // check email dan passwordnya kalo bener masukin di cache
        console.log('masuk submit sign in<<<<');  
        const userCache = await AsyncStorage.getItem('user-data')      
        console.log(userCache, '<<<< before sign in');
        dispatch(asyncSignIn({email, password}))
        const userCacheAfter = await AsyncStorage.getItem('user-data')      
        console.log(userCacheAfter, '<<<< after sign in');
        if (cache.access_token !== "") {
            console.log(cache.access_token, '<<<<< access token dari sign in');
            props.navigation.navigate('Home');
        }
        // const response = await dispatch(signIn({email, password}))
        // console.log(response, '<<< response');
        // console.log(response.account, '<<< response account');
        // const userData = response
        // if (userData.account.email === email) {
        //     try {
        //         await AsyncStorage.setItem('user-data', JSON.stringify(userData, null, 2))
        //         setEmail('')
        //         setPassword('')
        //         props.navigation.navigate('Home');
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
    };

    return (
        <View style={styles.signInContainer}>
            <Image source={require('../src/images/login-image.jpg')} style={{ width: "90%", height: "40%", marginHorizontal:20 }}></Image>
            <Text style={styles.helloText}>
                Hello There!
            </Text>
            <Text
                style={{
                    opacity: 0.4,
                    marginBottom: 20,
                    textAlign: 'center',
                    marginHorizontal: 40
                }}>
                Welcome to MaMed, an App which helps you to remind your daily medical intake.
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
                    name="mail"
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
                    value={email}
                    onChangeText={emailInput => setEmail(emailInput)}
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
                <Ionicons
                    name="key"
                    size={32}
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
                        width: 230
                    }}
                    underlineColor="white"
                    label="Password"
                    returnKeyType="done"
                    value={password}
                    onChangeText={passwordInput => setPassword(passwordInput)}
                    secureTextEntry
                />
            </View>

            {/* <Ionicons name="md-checkmark-circle" size={32} color="green" /> */}
            
            <Button
                mode="contained"
                icon="check-circle"
                onPress={onSubmitLogin}
                style={{
                    marginHorizontal: 40,
                    marginTop: 20,
                    color: "white"
                }}
                color='#0ec7a8'
            >
                Login
          </Button>

            <View style={{
                flexDirection: "column",
            }} >
                <Text
                    style={{
                        color: "grey",
                        textAlign: 'center',
                        marginVertical: 10
                    }}
                >or</Text>
                <Text
                    onPress={() => props.navigation.navigate('SignUp')}
                    style={{
                        color: "#0ec7a8",
                        textAlign: 'center'
                    }}
                >
                    Sign Up Here
                </Text>
            </View>
            <AwesomeAlert
                show={alertFailLogin}
                showProgress={false}
                title="Login Failed"
                message="Wrong Email or Password"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                confirmText=" ok "
                confirmButtonColor="#0ec7a8"
                onConfirmPressed={() => {
                    setAlertFailLogin(false)
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    signInContainer: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 50
    },
    helloText: {
        marginTop: 10,
        marginBottom: 10,
        fontFamily: "coolvetica-rg",
        fontSize: 30,
        textAlign: "center"
    },
    label: {
        marginTop: 10,
        textAlign: 'center'
    }
});

