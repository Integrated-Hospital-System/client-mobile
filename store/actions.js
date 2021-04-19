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
    const userData = await AsyncStorage.getItem('user-data')
    const parsed = JSON.parse(userData)
    console.log('masuk asyncFetchDoctors');
    try {
      const {data} = await axios.get('/accounts', {
          headers : {
              access_token : parsed.access_token
          }
      })
      const filtered = data.filter(account => account.role === 'doctor')
      dispatch({type: 'doctor/fetch', payload: filtered})
    } catch (error) {
        console.log(error, '<<< error try catch')
    }
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
    const userData = await AsyncStorage.getItem('user-data')
    const parsed = JSON.parse(userData)
    console.log('masuk asyncFetchMeds');
    // console.log(parsed.access_token, '<<< access_token dari async storage');
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
            dispatch({type: 'medicine/fetch', payload: temp})
        } catch (error) {
            console.log(error, '<<< error try catch')
        }
    // console.log('masuk asyncFetchMeds');
    // return async (dispatch) => {
    //     try {
    //         const {data} = await axios({
    //             url: 'http://localhost:3001/orders',
    //             method: 'get'
    //         })
    //         const filtered = data.filter(order => (order.appointment.patient.id === '5'))
    //         const filteredMeds = filtered.map(order => {
    //             return order.medicines
    //         })
    //         let temp = []
    //         // console.log(filteredMeds[0][1].timesPerDay, '<<< timesPerDay');
    //         for (let i = 0; i < filteredMeds[0].length; i++) {
    //             for (let j = 0; j < filteredMeds[0][i].timesPerDay; j++) {
    //                 temp.push('--:--')
    //                 if (j === filteredMeds[0][i].timesPerDay - 1 ) {
    //                     filteredMeds[0][i].alarm = temp
    //                     temp = []
    //                     break
    //                 }
    //             }
    //         }
    //         dispatch({type: 'medicine/fetch', payload: filteredMeds[0]})
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
}

export const deleteMed = (newMeds) => async (dispatch) => {
  dispatch({type: 'medicine/fetch', payload: newMeds})
}