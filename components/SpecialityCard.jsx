import React, { Component } from 'react'
import { StyleSheet, Text, ScrollView, View, ImageBackground, Image, TextInput, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function SpecialityCard(props) {
    return (
        <View>
            <Text><Ionicons name="checkmark" size={20} color="black" style={{ paddingHorizontal: 10 }}/>{props.eachSpeciality}</Text>
        </View>
    )
}
