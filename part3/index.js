
const { response, request } = require('express')
const express  = require('express')
const cors = require('cors');
//在导入Note模块之前导入dotenv，保证是全局可用的
require('dotenv').config()
const Note = require('./note')
const app = express()
app.use(express.static('build'))

app.use(cors())
app.use(express.json()) //中间件，中间件是可以用来处理请求和相应的函数
//实现自己的中间件
//打印发送到服务器的每个请求的信息
// const requestLogger = (request,response,next) => {
//   console.log('Method',request.method);
//   console.log('Path',request.path);
//   console.log('body',request.body);
//   console.log('--');
//   next();
// }
// app.use(requestLogger)
// const unknownEndpoint = (request,response) => {
//   response.status(404).json({
//     error: "unknow endpoint"
//   })
// }
// app.use(unknownEndpoint);

//后端连接到数据库


// const Note = mongoose.model('Note',noteSchema)


let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2019-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2019-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2019-05-30T19:20:14.298Z",
      important: true
    }
  ]
// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'text/plain' })
//   response.end(JSON.stringify(notes))
// })
app.get('/',(request,response) => {
    response.send('<h1>Hello World</h1>')
})
app.get('/api/notes',(request,response) => {
    //response.json(notes)
    Note.find({}).then(notes => {
      response.json(notes)
    })
})
app.get('/api/notes/:id', (request, response) => {
    // const id = Number(request.params.id)
    // const note = notes.find(note => note.id === id)
    // response.json(note)
    Note.findById(request.params.id).then(note => {
      response.json(note)
    })
  })

  app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
  })
  
  const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }
  
  app.post('/api/notes', (request, response) => {
    const body = request.body
  
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const note =  new Note({ //创建note为Note的实例
      content: body.content,
      important: body.important || false,
      date: new Date(),
      id: generateId(),
    })
    console.log(note)
    // notes = notes.concat(note)
  
    // response.json(note)
    
    note.save().then(savedNote => {
      response.json(savedNote)
    })
  })
  const PORT = process.env.PORT || 3002
app.listen(PORT)
console.log(`Server running on port ${PORT}`)