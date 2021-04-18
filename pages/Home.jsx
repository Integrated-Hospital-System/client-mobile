import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { asyncFetchMeds, asyncFetchDoctors } from '../store/actions'

export default function Homepage() {
  const dispatch = useDispatch()
  const medicines = useSelector(state => state.medicineReducer.medicines)
  const doctors = useSelector(state => state.doctorReducer.doctors)
  dispatch(asyncFetchMeds())
  dispatch(asyncFetchDoctors())
  console.log(medicines, '<<< dari server')
  return (
    <View style={styles.container}>
      <Text>HOMEPAGE</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
