const initialState = {
    doctors: [],
    upcomingAppointment: ''
}

export default function medicineReducer (state = initialState, action) {
    const {type, payload} = action
    if (type === 'doctor/fetch') {
        return {...state, doctors: payload}
    } else if (type === 'upcoming/set') {
        console.log('masuk doctor reducer upcoming/set');
        console.log(payload, '<<<< dari doctor reducer');
        return {...state, upcomingAppointment: payload}
    }
    return state
}