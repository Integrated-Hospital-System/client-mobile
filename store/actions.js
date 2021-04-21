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
      let temp = []
      for (let i = 0; i < data[0].medicines.length; i++) {
        // const med = data[0].medicines[i]
        const med = data[0].medicines
        for (let j = 0; j < med.length; j++) {
          const med2 = med[j]
          temp.push(med2)
        }
      }
      for (let i = 1; i < data.length; i++) {
        const med = data[i].medicines
        for (let j = 0; j < med.length; j++) {
          const med2 = med[j]
          for (let l = 0; l < temp.length; l++) {
            if (med2.medicine.name === temp[l].medicine.name) {
              // temp[l].timesPerDay = med2.timesPerDay
              temp[l].totalMedicine = temp[l].totalMedicine + med2.totalMedicine
            }
          }
        }
      }
      for (let i = 0; i < temp.length; i++) {
        console.log(temp[i].timesPerDay)
        for (let j = 0; j < temp[i].timesPerDay; j++) {
          if (!temp[i].alarms) {
            temp[i].alarms = []
          }
          temp[i].alarms.push('--:--')
        }
      }
      await AsyncStorage.setItem('medicine-data', JSON.stringify(temp))
      dispatch({type: 'medicine/fetch', payload: temp})
  } catch (error) {
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