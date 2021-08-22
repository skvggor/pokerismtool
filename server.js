const http = require('http')
const socketio = require('socket.io')
const nunjucks = require('nunjucks')
const express = require('express')
const app = express()

const server = http.createServer(app)
const io = socketio(server)

const PORT = process.env.PORT || 3000

app.use(express.static('public'))
app.use('/libs', express.static('node_modules'))
app.use('/socket.io', express.static('node_modules/socket.io'))
app.use('/js', express.static('js'))

nunjucks.configure('views', {
  express: app,
  autoescape: true
})

app.set('view engine', 'njk')

app.get('/', (request, response) => response.render('index'))

const users = []

io.on('connection', (socket) => {
  socket.on('join', (data) => {
    socket.join(data.room)

    users.push({ username: data.username, id: socket.id })

    io.to(data.room).emit('roomCreated', { all: users, room: data.room, username: data.username })

    console.log(io.sockets.adapter.rooms.get(data.room))

    console.log(`User '(${data.username})[${socket.id}]' joined room '${data.room}'.`)
  })


  // console.log('Room', room)
})

server.listen(PORT, () => {
  console.log("server up", PORT)
})
