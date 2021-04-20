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
    const dummy = [
        {
          "id": "1",
          "appointment": {
            "id": "1",
            "doctor": {
              "id": "2",
              "name": "Hasan",
              "username": "hasan",
              "email": "hasan@email.com",
              "password": "hasan",
              "role": "doctor"
            },
            "patient": {
              "id": "5",
              "name": "Gunawan",
              "username": "gunawan",
              "email": "gunawan@email.com",
              "password": "gunawan",
              "role": "patient",
              "age": 50,
              "gender": "male",
              "comorbid": [
                "diabetes"
              ]
            },
            "appointmentDate": "15/04/2021 20:00",
            "isCompleted": false
          },
          "medicines": [
            {
              "medicine": {
                "id": "1",
                "name": "Panadol",
                "description": "sakit kepala"
              },
              "timesPerDay": 2,
              "doses": 3,
              "totalMedicine": 9,
              "notes": ""
            },
            {
              "medicine": {
                "id": "2",
                "name": "Vitamin D",
                "description": "Vitamin"
              },
              "timesPerDay": 1,
              "doses": 1,
              "totalMedicine": 3,
              "notes": ""
            },
            {
              "medicine": {
                "id": "10",
                "name": "Antibiotik",
                "description": "antibiotik"
              },
              "timesPerDay": 3,
              "doses": 1,
              "totalMedicine": 6,
              "notes": "habiskan"
            }
          ],
          "diseases": [
            "migraine"
          ]
        },
        {
          "id": "1",
          "appointment": {
            "id": "1",
            "doctor": {
              "id": "2",
              "name": "Hasan",
              "username": "hasan",
              "email": "hasan@email.com",
              "password": "hasan",
              "role": "doctor"
            },
            "patient": {
              "id": "5",
              "name": "Gunawan",
              "username": "gunawan",
              "email": "gunawan@email.com",
              "password": "gunawan",
              "role": "patient",
              "age": 50,
              "gender": "male",
              "comorbid": [
                "diabetes"
              ]
            },
            "appointmentDate": "15/04/2021 20:00",
            "isCompleted": false
          },
          "medicines": [
            {
              "medicine": {
                "id": "1",
                "name": "Panadol",
                "description": "sakit kepala"
              },
              "timesPerDay": 2,
              "doses": 3,
              "totalMedicine": 9,
              "notes": ""
            },
            {
              "medicine": {
                "id": "2",
                "name": "Vitamin D",
                "description": "Vitamin"
              },
              "timesPerDay": 1,
              "doses": 1,
              "totalMedicine": 3,
              "notes": ""
            },
            {
              "medicine": {
                "id": "10",
                "name": "Antibiotik",
                "description": "antibiotik"
              },
              "timesPerDay": 3,
              "doses": 1,
              "totalMedicine": 6,
              "notes": "habiskan"
            }
          ],
          "diseases": [
            "migraine"
          ]
        }
      ]
    try {
      let temp = []
      for (let i = 0; i < dummy[0].medicines.length; i++) {
        const med = dummy[0].medicines[i]
        for (let j = 1; j < dummy.length; j++) {
          const med2 = dummy[j].medicines
          for (let l = 0; l < med2.length; l++) {
            const medToCompare = dummy[j].medicines[l]
            if (med.medicine.name === medToCompare.medicine.name) {
              // console.log(medToCompare.medicine.name, '<<< sama')
              med.totalMedicine += medToCompare.totalMedicine
            }
          }
        }
        for (let i = 0; i < med.timesPerDay; i++) {
          if (!med.alarms) {
            med.alarms = []
          }
          med.alarms.push('--:--')
        }
        temp.push(med)
      }

      const cache = await AsyncStorage.getItem('user-data')
      const {access_token} = JSON.parse(cache)
      console.log(access_token, '<<< access');
      const {data} = await axios.get('/orders', {
        headers: {
          access_token
        }
      })

      data.forEach(order => {
        console.log(order.medicines, '<<<<< medicines tiap order');
      })






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