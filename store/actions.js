import { useSelector } from 'react-redux'
import axios from '../helpers/axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const signUp = (signupdata) => async (dispatch) => {
    console.log('enter action signUp')
    try {
        const patient = await axios.post('/register', signupdata)
        console.log(patient);
    } catch (error) {
        console.log(error)
    }
}

export const signIn = (signInData) => async (dispatch) => {
    console.log('enter action signIn')
    try {
        const user = await axios.post('/login', signInData)
        // console.log("success")
        return user
    } catch (error) {
        // console.log("failed")
        console.log(error)
    }
}

export const asyncFetchDoctors = () => async (dispatch) => {
    console.log('masuk asyncFetchDoctors')
    const dummyDoctors = [
      {
        "id": "2",
        "name": "Hasan",
        "username": "hasan",
        "email": "hasan@email.com",
        "password": "hasan",
        "role": "doctor",
        "speciality": ["tht", "organ dalam"],
        "practice": [
          {
            "day": "monday",
            "start": "9:15",
            "end": "15:45"
          },
          {
            "day": "tuesday",
            "start": "9:15",
            "end": "15:45"
          },
          {
            "day": "wednesday",
            "start": "9:15",
            "end": "15:45"
          },
          {
            "day": "thursday",
            "start": "9:15",
            "end": "15:45"
          },
          {
            "day": "friday",
            "start": "11:00",
            "end": "15:45"
          }
        ]
      },
      {
        "id": "3",
        "name": "Ratna",
        "username": "ratna",
        "email": "ratna@email.com",
        "password": "ratna",
        "role": "doctor",
        "speciality": ["mata", "organ dalam"],
        "practice": [
          {
            "day": "monday",
            "start": "8:15",
            "end": "17:45"
          },
          {
            "day": "thursday",
            "start": "8:17",
            "end": "17:45"
          }
        ]
      }
    ]
    const cache = await AsyncStorage.getItem('user-data')
    const {access_token} = JSON.parse(cache)
    const {data} = await axios.get('/accounts?role=Doctor', {
      headers: {
        access_token
      }
    })
    
    dispatch({type: 'doctor/fetch', payload: data})
}

export const updateAlarm =  (name, params, original) => (dispatch) => {
    original.forEach(med => {
      if (med.medicine.name === name) {
        med.alarms = params
      }
    })
    console.log(original, '<<<< this goes to reducer for update')
    dispatch({type: 'medicine/fetch', payload: original})
}

export const asyncFetchMeds = () => async (dispatch) => {
    console.log('masuk asyncFetchMeds');
    try {
      const cache = await AsyncStorage.getItem('user-data')
      const {access_token} = JSON.parse(cache)
      console.log(access_token, '<<< access');
      const {data} = await axios.get('/orders', {
        headers: {
          access_token
        }
      })
      const newOrder = data.filter(order => Object.keys(order).length > 0);
      const medicines = newOrder.reduce((acc, data) => [...acc, ...data.medicines], [])
      const newMedicines = medicines.reduce((acc, medicine) => {
        if (!acc[medicine.medicine.name]) {
          acc[medicine.medicine.name] = {
            total: medicine.totalMedicine,
            timesPerDay: medicine.timesPerDay,
            doses: medicine.doses
          }
          for (let i = 0; i < medicine.timesPerDay; i++) {
            if (!acc[medicine.medicine.name].alarms) {
              acc[medicine.medicine.name].alarms = []
            }
            acc[medicine.medicine.name].alarms.push('--:--')
           }
        } else {
          acc[medicine.medicine.name].total += medicine.totalMedicine
        }
        return acc
      }, {})
      const arrOfMeds = Object.entries(newMedicines).map(([key, value]) => ({
        ...value, medicine: {name:key}, totalMedicine: value.total
      }))
      dispatch({type: 'medicine/fetch', payload: arrOfMeds})
  } catch (error) {
      console.log('failed');
      console.log(error, '<<< error try catch')
  }
}

export const dispatchMedsFromCache = () => (dispatch) => {
  const object = {
    "alarms": [
      "--:--",
    ],
    "doses": 1,
    "medicine": {
      "description": "Vitamin",
      "id": "2",
      "name": "Vitamin D",
    },
    "notes": "",
    "timesPerDay": 1,
    "totalMedicine": 6,
  }
  return object
}

export const deleteMed = (deletedMedName) => {
  console.log('masuk action deleteMed');
  return ({type: 'medicine/delete', payload: deletedMedName})
}

export const asyncNewAppointment = (obj) => async (dispatch) => {
  const {doctorId, appointmentDate, access_token} = obj
  console.log(access_token, '<<< access_token');
  try {
    const response = await axios.post('/appointments', {
      // doctorId: '607efb50646cb091b2836594',
      doctorId,
      appointmentDate
    }, {
      headers: {
        access_token
      }
    })
    return response
  } catch (error) {
    return error
  }
}