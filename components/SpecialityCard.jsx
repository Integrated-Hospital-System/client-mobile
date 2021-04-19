import React, { Component } from 'react'
import { StyleSheet, Text, ScrollView, View, ImageBackground, Image, TextInput, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function SpecialityCard(props) {
    return (
        <View>
            <Text><Ionicons name="checkmark" size={20} color="#0ec7a8" style={{ paddingHorizontal: 10 }}/>{props.eachSpeciality}</Text>
        </View>
    )
}
