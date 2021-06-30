const mongoose = require('mongoose')

if(process.argv.length < 3) {
    console.log('Please provide the password as a argument:');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.lenai.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const phoneSchema = new mongoose.Schema ({
    name: String,
    number: Number
})
const Person = mongoose.model('Person',phoneSchema)
const personName = process.argv[3];
const personNumber = process.argv[4];
const person = new Person({
    name: personName,
    number: personNumber
})

person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
})
// Person.find({}).then(result => {
//     result.forEach(person => {
//         console.log(person);
//     })
//     mongoose.connection.close()
// })