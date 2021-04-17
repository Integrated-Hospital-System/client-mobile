const axios = require('axios')

export function asyncFetchDoctor () {
    return async (dispatch) => {
        try {
            const {data} = await axios({
                url: 'http://localhost:3001/accounts',
                method: 'get'
            })
            const filtered = data.filter(account => account.role === 'doctor')
            console.log(filtered, '<<< filtered account');
            dispatch({type: 'doctor/fetch', payload: filtered})
        } catch (error) {
            console.log(error)
        }
    }
}

export function asyncFetchMeds () {
    return async (dispatch) => {
        try {
            const {data} = await axios({
                url: 'http://localhost:3001/orders',
                method: 'get'
            })
            const filtered = data.filter(order => (order.appointment.patient.id === '5'))
            const filteredMeds = filtered.map(order => {
                return order.medicines
            })
            console.log(filteredMeds, '<<< filtered medicines');
            dispatch({type: 'medicine/fetch', payload: filteredMeds})
        } catch (error) {
            console.log(error)
        }
    }
}