const mongoose = require('mongoose')

const url = process.env.MONGOOB_URL;
//   `mongodb+srv://fullstack:fullstack@cluster0.lenai.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
 .then(result => {
     console.log('connected to MongoDB');
 })
 .catch((error) => {
     console.log('error connecting to MongoDB:',error.message);
 })
const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

noteSchema.set('toJSON', {
    transform:(document,returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject._v;
    }
  })
module.exports = mongoose.model('Note',noteSchema)  