const { response, request } = require('express');
const express = require('express')
require('dotenv').config()
const app = express();
const cors = require('cors');

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
  }

app.use(cors());
app.use(express.json())
app.use(express.static('build'))
app.use(errorHandler)

const Person = require('./phoneBook')

let  phoneBook  = [
    {
        id:1,
        name : "Arto Hellas",
        number : '040-123456'
    },
    {
        id:2,
        name:"Ada Lovelace",
        number: '39-445323523'
    },
    {
        id:3,
        name :'Marry Abramoy',
        number: '39-23-6423122'
    }
]
app.get('/api/persons' ,(request,response) => {
    Person.find({}).then(result => {
        response.json(result)
    })
})
app.get('/info',(request,response) => {
    let time = new Date();
    response.send(`<p>phoneBook has info for ${phoneBook.length} people</p> <p>${time} </p>`)
})

app.get('/api/persons/:id',(request,response,next) => {
    // let id = Number(request.params.id);
    // let phonebook = phoneBook.find(phone => phone.id === id);
    // if(phonebook === null) {
    //     response.status(404).end();
    // } else {
    //     response.json(phonebook)
    // }
    Person.findById(request.params.id)
    .then(resultPerson => {
        response.json(resultPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id',(request,response,next) => {
    // let  id = Number(request.params.id);
    // let phonebook = phoneBook.find(phone => phone.id === id);
    // if(phonebook === null) {
    //     response.status(404).end()
    // } else {
    // phoneBook = phoneBook.filter(phonebook => phonebook.id !== id);
    // // console.log(phoneBook)
    // response.status(204).end()
    // }

    Person.findByIdAndRemove(request.params.id)
    .then(result => {
        response.status(202).end()
    })
    .catch(error => next(error))
    
})
app.post('/api/persons',(request,response) => {
    let body = request.body;
    let phone = phoneBook.find(person => person.name === body.name)
    if(body.name === null || phone !== null) {
        response.status(400).json({
            error: 'name must be unique'
        })
    }
    let newPerson =  new Person ({
        id: Math.floor( Math.random() * 10000),
        name : body.name,
        number: body.number

    })
    // phoneBook = phoneBook.concat(newPerson)
    // response.json(phoneBook)

    newPerson.save().then(savePerson => {
        response.json(savePerson)
    })
})

app.put('api/persons/:id',(request,response) => {
    const body = request.body;

    const upPerson = {
        name : body.name ,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id,upPerson) 
        .then(returnPerson => {
            response.json(returnPerson)
        })
        .catch(error => next(error))

})


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Running at  ${PORT}`)  
})