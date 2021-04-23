const initialState = {
    loggedAccount : {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21vcmJpZCI6WyJkaWFiZXRlcyIsIiBrb2xlc3Ryb2wiXSwicm9sZSI6IlBhdGllbnQiLCJfaWQiOiI2MDdmYTdiMDhiNmRlZDAwMTUwYzcwOGIiLCJuYW1lIjoiQWNvbmciLCJlbWFpbCI6IkFjb25nQG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkWnN2MC9GNEF3a2pkdmliSVRnT3dodTdBWC5ab05MMGRkaFZJaGJkNkt3NXc1U0x1RXBNb3kiLCJhZ2UiOjI1LCJnZW5kZXIiOiJtYWxlIiwiaWF0IjoxNjE5MTYwMTI5fQ.vFAgfip2olD3_ZEhO17r-Za0dnRyg8IaUsw1nI8jsm0",
        "account": {
          "_id": "607fa7b08b6ded00150c708b",
          "age": 25,
          "comorbid": [
            "diabetes",
            " kolestrol",
          ],
          "email": "Acong@mail.com",
          "gender": "male",
          "name": "Acong",
          "password": "$2a$10$Zsv0/F4AwkjdvibITgOwhu7AX.ZoNL0ddhVIhbd6Kw5w5SLuEpMoy",
          "role": "Patient",
        },
      }
}

export default function patientReducer (state = initialState, action) {
    const {type, payload} = action
    if (type === 'patient/signin') {
        console.log('masuk patient reducer signin');
        console.log(payload, '<<<<<<< payload from patient reducer');
        return {...state, loggedAccount: payload}
    } else if (type === 'signout') {
        console.log('masuk patient reducer signout');
        return {...state, loggedAccount: {}}
    }
    return state
}