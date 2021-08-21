const socket = io()

socket.on('connect', () => {
  console.log(socket.id) // x8WIv7-mJelg7on_ALbx
})

socket.on('roomCreated', (room) => {
  console.log('Room', room)
})

socket.on('disconnect', () => {
  console.log(socket.id) // undefined
})
