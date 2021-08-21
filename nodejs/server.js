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

io.on('connection', (socket) => {
  console.log('User is on', socket.id)

  const room = new Date()

  socket.join(room)

  io.to(room).emit('roomCreated', room)

  console.log('Room', room)
})

server.listen(PORT, () => {
  console.log("server up", PORT)
})
