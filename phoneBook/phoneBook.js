const mongoose = require('mongoose')

 const url = `mongodb+srv://fullstack:fullstack@cluster0.lenai.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
//   `mongodb+srv://fullstack:fullstack@cluster0.lenai.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
console.log(url)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
 .then(result => {
     console.log('connected to MongoDB');
 })
 .catch((error) => {
     console.log('error connecting to MongoDB:',error.message);
 })
const phoneSchema = new mongoose.Schema({
    name: String,
    number: Number
})

phoneSchema.set('toJSON', {
    transform:(document,returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject._v;
    }
  })
module.exports = mongoose.model('Person',phoneSchema)  