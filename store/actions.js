import { useSelector } from 'react-redux'
import axios from '../helpers/axios'

export const signUp = (signupdata) => async (dispatch) => {
    console.log('enter action signUp')
    try {
        const patient = await axios.post('/register', signupdata)
        console.log(patient);
    } catch (error) {
        console.log(error)
    }
}

export function asyncFetchDoctors () {
    console.log('masuk asyncFetchDoctors');
    // return async (dispatch) => {
    //     try {
    //         const {data} = await axios({
    //             url: 'http://localhost:3001/accounts',
    //             method: 'get'
    //         })
    //         const filtered = data.filter(account => account.role === 'doctor')
    //         dispatch({type: 'doctor/fetch', payload: filtered})
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
}

export function updateAlarm (name, params, original) {
    // original.forEach(med => {
    //     if (med.medicine.name === name) console.log('ketemu')
    //     med.alarm = params
    // });
    // console.log('masuk updateAlarm')
    // console.log(original, '<<<< ganti');
    // return async (dispatch) => {
    //     dispatch({type: 'alarm/update', payload: original})
    // }
}

export function asyncFetchMeds () {
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