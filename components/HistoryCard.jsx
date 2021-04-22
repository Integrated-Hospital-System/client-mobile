
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ImageBackground, Image, Text } from 'react-native';
import { Avatar, Card } from 'react-native-paper';
import IconFA5 from 'react-native-vector-icons/FontAwesome5'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons'



export default function HistoryCard(props) {
    const {data} = props

    const name = data.name
    const penyakit = data.diseases
    const date = data.date
    const obat = data.medicines

    return (
        <Card style={styles.card}>
            <Card.Title title={name} subtitle={date}/>
            <View
                style={{
                    flexDirection: 'row',
                    marginHorizontal:20
                }}>
                <IconFA5
                    name="disease"
                    size={20}
                    style={{ marginRight: 10 }}
                    onPress={() => {
                        navigation.navigate("Set Alarm", { name, alarm, totalMed, timesPerDay, doses })
                    }}
                />
                <Text>
                    {penyakit.join(', ')}
                </Text>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    marginHorizontal:20
                }}>
                <IconMCI
                    name="pill"
                    size={20}
                    style={{ marginRight: 10 }}
                    onPress={() => {
                        navigation.navigate("Set Alarm", { name, alarm, totalMed, timesPerDay, doses })
                    }}
                />
                <Text>
                    {obat.join(', ')}
                </Text>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    // card: {
    //   shadowOpacity: 0.7,
    //   shadowRadius: 5.5,
    //   width: 140,
    //   height: 200,
    //   marginTop: 80,
    //   alignSelf: 'center',
    //   opacity: 0.1
    // },
    card: {
        marginBottom: 20,
        width: "100%",
        shadowOpacity: 1,
        borderBottomWidth: 2,
        paddingBottom: 15,
        borderColor: "#0ec7a8"

    }
})