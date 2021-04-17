import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Alert, Image, StyleSheet, Text, View} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Ionicons } from "@expo/vector-icons"
import AwesomeAlert from 'react-native-awesome-alerts';

export default function SignIn(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState(false)

    const onSubmitLogin = () => {
        // check email dan passwordnya kalo bener masukin di cache

        if (true) {
            //tes alert dulu
            // setAlert(true)
            console.log('<<< masuk');
            props.navigation.navigate('Home');
        }
        else {
            props.navigation.navigate('SignUp');
            setAlert(true)
        }
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
                    // borderBottomLeftRadius: 20,
                    // borderBottomRightRadius: 20
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
                show={alert}
                showProgress={false}
                title="AwesomeAlert"
                message="I have a message for you!"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="No, cancel"
                confirmText="Yes, delete it"
                confirmButtonColor="#DD6B55"
                onCancelPressed={() => {
                    setAlert(false)
                }}
                onConfirmPressed={() => {
                    // do something adn close alertnya
                    setAlert(false)
                }}
            />
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

