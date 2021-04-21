import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, ScrollView, View, ImageBackground, Image } from 'react-native';
import HistoryCard from "../components/HistoryCard"

export default function History() {
    // ga kepake.....
    // const dummyHistory = [
    //     {
    //         "_id": {
    //             "$oid": "607fbdc88b6ded00150c709f"
    //         },
    //         "diseases": [
    //             "flu",
    //             "alergy",
    //             "demam"
    //         ],
    //         "medicines": [
    //             {
    //                 "_id": {
    //                     "$oid": "607fbdc88b6ded00150c70a0"
    //                 },
    //                 "timesPerDay": 2,
    //                 "doses": 5,
    //                 "totalMedicine": 10,
    //                 "medicine": {
    //                     "$oid": "607fa7b28b6ded00150c708c"
    //                 }
    //             },
    //             {
    //                 "_id": {
    //                     "$oid": "607fbdc88b6ded00150c70a1"
    //                 },
    //                 "timesPerDay": 2,
    //                 "doses": 5,
    //                 "totalMedicine": 10,
    //                 "medicine": {
    //                     "$oid": "607fa7c08b6ded00150c708d"
    //                 }
    //             }
    //         ],
    //         "appointment": {
    //             "$oid": "607fb72f8b6ded00150c709d"
    //         }
    //     }
    // ]

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
               <HistoryCard></HistoryCard>
               <HistoryCard></HistoryCard>
               <HistoryCard></HistoryCard>
               <HistoryCard></HistoryCard>
               <HistoryCard></HistoryCard>
               <HistoryCard></HistoryCard>
               <HistoryCard></HistoryCard>
               <HistoryCard></HistoryCard>
               <HistoryCard></HistoryCard>
               <HistoryCard></HistoryCard>
               <HistoryCard></HistoryCard>

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