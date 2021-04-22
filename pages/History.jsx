import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, ScrollView, View, ImageBackground, Image } from 'react-native';
import HistoryCard from "../components/HistoryCard"
import { useSelector } from 'react-redux'

export default function History() {
    const history = useSelector(state => state.doctorReducer.history)

    return (
        <View style={{
            flexDirection: 'column',
            backgroundColor: 'white',
            height: "100%",
        }}>
            <View style={{
                height: 800,
                width: "90%",
                borderRadius: 50,
                position: 'absolute',
                borderColor: '#0ec7a8',
                borderWidth: 4,
                alignSelf: 'center',
                top: 250
            }}></View>
            <Image source={require('../src/images/setAlarmImage.png')}
                style={{
                    width: "80%",
                    resizeMode: 'contain',
                    height: '30%',
                    alignSelf: 'center',
                    marginTop: 30,
                }}></Image>
            <View style={{
                flexDirection: 'row',
                marginBottom: 10,
                marginHorizontal: 30
            }}>
                <View style={styles.topCont}>
                    <Text style={styles.title}>History</Text>
                    <Text style={styles.titleNote}>Medical Record</Text>
                </View>
            </View>
            <ScrollView
                vertical
                showsVerticalScrollIndicator={false}
                style={{
                    marginHorizontal: 30,
                }}

            >
                {history.map((data, index) => {
                    return <HistoryCard
                    key={index}
                    data={data}
                    />
                })}
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({


    topCont: {
        paddingHorizontal: 30,
        marginLeft: 20,
        marginTop: -20,
        borderRadius: 20,
        backgroundColor: '#0ec7a8',
        height: 80
    },
    title: {
        fontFamily: 'coolvetica-rg',
        fontSize: 40,
        color: 'black'
    },
    titleNote: {
        fontFamily: 'coolvetica-rg',
        fontSize: 15,
        color: "#4a4a4a",
        marginBottom: 10
    }
})