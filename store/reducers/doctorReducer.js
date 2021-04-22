const initialState = {
    doctors: [],
    upcomingAppointment: '',
    history: []
}

export default function medicineReducer (state = initialState, action) {
    const {type, payload} = action
    if (type === 'doctor/fetch') {
        return {...state, doctors: payload}
    } else if (type === 'upcoming/set') {
        console.log('masuk doctor reducer upcoming/set');
        console.log(payload, '<<<< dari doctor reducer');
        return {...state, upcomingAppointment: payload}
    } else if (type === 'history/fetch') {
        return {...state, history: payload}
    }
    return state
}