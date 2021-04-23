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

export const setInitialState = (payload) => (dispatch) => {
  dispatch({type: 'patient/signin', payload})
}

export const asyncSignIn = (signInData) => async (dispatch) => {
    console.log('enter action signIn')
    try {
        const {data} = await axios.post('/login', signInData)
        console.log("success")
        // console.log(data, '<<<< logged in account');
        await AsyncStorage.setItem('user-data', JSON.stringify(data))
        // const cache = await AsyncStorage.getItem('user-data')
        // console.log(cache, '<<<<<<< cache without parse');
        // console.log(JSON.parse(cache), '<<<<<<< cache')
        dispatch({type: 'patient/signin', payload: data})
    } catch (error) {
        // console.log("failed")
        console.log(error)
    }
}

export const asyncSignOut = () => async (dispatch) => {
  console.log('enter action signOut')
  try {
    await AsyncStorage.removeItem('user-data')
    dispatch({type: 'patient/signout', payload: {}})
  } catch (error) {
    console.log(error);
  }
}

export const asyncFetchDoctors = () => async (dispatch) => {
    console.log('masuk asyncFetchDoctors')
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
    // console.log(original, '<<<< this goes to reducer for update')
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
  const {doctorId, appointmentDate, access_token, setDate} = obj
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
    console.log(response, '<<<<< response after create new appointment');
    dispatch({type: 'upcoming/set', payload: setDate})
    return response
  } catch (error) {
    return error
  }
}

export const drinkMedicine = (medicineName, doses) => async (dispatch) => {
  dispatch({type: 'medicine/drink', payload: {medicineName, doses}})
}

export const getUpcomingAppointment = () => async (dispatch) => {
  const cache = await AsyncStorage.getItem('user-data')
  const {access_token} = JSON.parse(cache)
  console.log(access_token, '<<< access');
  const {data} = await axios.get('/appointments', {
    headers: {
      access_token
    }
  })

  let date = ''
  const filtered = data.filter(appointment => appointment.isCompleted === false)
  filtered.forEach(appointment => {
    if (date === '' || appointment.appointmentDate < date) {
      date = appointment.appointmentDate
    }
  })
  console.log(date, '<<<<< date');

  const day = new Date(String(date)).getDay()
  let theDay = ''
  switch (day) {
      case 0:
          theDay = 'Sunday'
          break;
      case 1:
          theDay = 'Monday'
          break;
      case 2:
          theDay = 'Tuesday'
          break;
      case 3:
          theDay = 'Wednesday'
          break;
      case 4:
          theDay = 'Thursday'
          break;
      case 5:
          theDay = 'Friday'
          break;
      case 6:
          theDay = 'Saturday'
          break;
  }
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = monthNames[new Date(date).getMonth()]
  const payload = `${theDay}, ${new Date(date).getDate()} ${month} ${new Date(date).getFullYear()}`
  const tester = new Date (payload)
  if (tester === "Invalid Date") {
    payload = '-'
    console.log("tester equals to invalid date");
  }
  console.log(tester, '<<< tester');
  console.log(payload, '<<< payload after check');
  if (payload === ", NaN undefined NaN") {
    console.log("payload NaN and undefined");
  } else {
    dispatch({type: 'upcoming/set', payload})
  }
}

export const getHistory = () => async (dispatch) => {
  const cache = await AsyncStorage.getItem('user-data')
  const {access_token} = JSON.parse(cache)
  console.log(access_token, '<<< access');
  const {data} = await axios.get('/orders', {
    headers: {
      access_token
    }
  })

  let date = ''
  const filtered = data.filter(appointment => appointment._id)
  console.log(filtered, '<<<<<< filtered');
  console.log(data.length, '<<<<< data history length')
  console.log(filtered.length, '<<<<<< filtered length');
  
  let temp = []

  filtered.forEach(order => {
    let doctorName = ''
    let diseases = []
    let medicineGiven = []
    let date = order.appointment.appointmentDate
    doctorName = order.appointment.doctor.name
    order.diseases.forEach(disease => {
      diseases.push(disease)
    })
    order.medicines.forEach(med => {
      medicineGiven.push(med.medicine.name)
    })
    temp.push({
      name : doctorName,
      diseases,
      medicines: medicineGiven,
      date
    })
  })
  console.log(temp, '<<<<<')
  dispatch({type: 'history/fetch', payload:temp})
}