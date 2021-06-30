const { response } = require('express')
const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
   console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.lenai.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const noteSchema = new mongoose.Schema({ //模式
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//   content: 'Say Hello to you',
//   date: new Date(),
//   important: false,
// })

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()//关闭数据库连接
// })
// note.save().then(result => {
//     console.log('note saved');
//     mongoose.connect.close()
// })
Note.find().then(result => {
   result.forEach(note => {
       console.log(note);
   })
   mongoose.connect.close()
})