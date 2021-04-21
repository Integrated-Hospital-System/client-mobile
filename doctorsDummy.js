const dummyDoc = [
    {
      "_id": "607fa71c8b6ded00150c7084",
      "email": "chelsea@gmail.com",
      "image_url": "https://cdn.idntimes.com/content-images/community/2020/07/fromandroid-bc64e66ca82adaae225e1e6a4e752b5e.jpg",
      "name": "Drg. Chelsea",
      "password": "$2a$10$Zsv0/F4AwkjdvibITgOwhuqTXCnMotwK/guEUCLaWiaZ/tRWBjxTO",
      "practice": [
        {
          "_id": "607fa71c8b6ded00150c7085",
          "day": "Monday",
          "end": "16:20",
          "start": "15:20",
        },
        {
          "_id": "607fa71c8b6ded00150c7086",
          "day": "Tuesday",
          "end": "16:20",
          "start": "15:20",
        },
        {
          "_id": "607fa71c8b6ded00150c7087",
          "day": "Wednesday",
          "end": "16:20",
          "start": "15:20",
        },
        {
          "_id": "6080014a8b6ded00150c70b3",
          "day": "Thursday",
          "end": "21:40",
          "start": "20:40",
        },
        {
          "_id": "6080014a8b6ded00150c70b4",
          "day": "Friday",
          "end": "21:40",
          "start": "20:40",
        },
        {
          "_id": "6080014a8b6ded00150c70b5",
          "day": "Saturday",
          "end": "21:40",
          "start": "20:40",
        },
        {
          "_id": "6080014a8b6ded00150c70b6",
          "day": "Sunday",
          "end": "21:40",
          "start": "20:40",
        },
      ],
      "role": "Doctor",
      "speciality": [
        "Orthopedy",
        "  tht",
      ],
    },
    {
      "_id": "607fa77c8b6ded00150c7088",
      "email": "pevita@gmail.com",
      "image_url": "https://cdn.popbela.com/content-images/post/20210218/150165581-137362611498807-276696809352414833-n-d82d7daee746b93e2f33f9b376d15e79_750x500.jpg",
      "name": "Dr. Pevita Sp.KK",
      "password": "$2a$10$Zsv0/F4AwkjdvibITgOwhuqTXCnMotwK/guEUCLaWiaZ/tRWBjxTO",
      "practice": [
        {
          "_id": "607fa77c8b6ded00150c7089",
          "day": "Thursday",
          "end": "16:17",
          "start": "14:17",
        },
        {
          "_id": "607fa77c8b6ded00150c708a",
          "day": "Friday",
          "end": "16:17",
          "start": "14:17",
        },
      ],
      "role": "Doctor",
      "speciality": [
        "skin care",
      ],
    },
    {
      "_id": "607fa8178b6ded00150c708f",
      "email": "asep@mail.com",
      "image_url": "google.com",
      "name": "Asep",
      "password": "$2a$10$Zsv0/F4AwkjdvibITgOwhuqTXCnMotwK/guEUCLaWiaZ/tRWBjxTO",
      "practice": [
        {
          "_id": "607fa8178b6ded00150c7090",
          "day": "Monday",
          "end": "16:20",
          "start": "14:20",
        },
      ],
      "role": "Doctor",
      "speciality": [
        "Orthopedy",
        " tht",
      ],
    },
    {
      "_id": "607fa9228b6ded00150c7092",
      "email": "budi@mail.com",
      "image_url": "google.com",
      "name": "Budi",
      "password": "$2a$10$Zsv0/F4AwkjdvibITgOwhuqTXCnMotwK/guEUCLaWiaZ/tRWBjxTO",
      "practice": [
        {
          "_id": "607fa9228b6ded00150c7093",
          "day": "Monday",
          "end": "15:24",
          "start": "14:24",
        },
        {
          "_id": "607fa9228b6ded00150c7094",
          "day": "Tuesday",
          "end": "15:24",
          "start": "14:24",
        },
        {
          "_id": "607fa9228b6ded00150c7095",
          "day": "Wednesday",
          "end": "15:24",
          "start": "14:24",
        },
      ],
      "role": "Doctor",
      "speciality": [
        "Orthopedy",
        "  tht",
      ],
    },
  ]

const word = 'th'

const newData = dummyDoc.filter(eachDoc=>{
  let docName = eachDoc.name.toLocaleLowerCase()
  let docSpeciality = eachDoc.speciality.join(" ")
  if(docName.includes(word.toLocaleLowerCase()) || docSpeciality.includes(word.toLocaleLowerCase())){
    return eachDoc
  }
})

console.log(newData);