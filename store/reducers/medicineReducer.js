const initialState = {
    medicines: []
}

export default function doctorReducer (state = initialState, action) {
    const {type, payload} = action
    if (type === 'medicine/fetch') {
        return {...state, medicines: payload}
    } else if (type === 'alarm/update') {
        return {...state, medicines: payload}
    } else if (type === 'medicine/delete') {
        return {...state, medicines: state.medicines.filter(med => med.medicine.name !== payload)}
    } else if (type === 'medicine/drink') {
        const {medicineName, doses} = payload
        const newArr = JSON.parse(JSON.stringify(state.medicines))
        newArr.forEach(med => {
            if (med.medicine.name === medicineName) {
                console.log('found one with the same name');
                med.totalMedicine = med.totalMedicine - doses
                med.total = med.total - doses
                console.log(med.totalMedicine, '<<<< this is the number after decrement');
                console.log(med.total, '<<<< this is too');
            }
        })
        console.log(newArr, '<<<<<<<<<<< payload');
        return {...state, medicines: newArr}
    }
    return state
}