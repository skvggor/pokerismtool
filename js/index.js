
const buttonJoin = $('button')

const join = (event) => {
  const username = $('#username')
  const room = $('#room')

  const socket = io()

  socket.emit('join', { username: $(username).val(), room: $(room).val() })
  // socket.on('connect', () => {
  //   console.log(socket.id)
  // })

  socket.on('roomCreated', (data) => {
    const room = $('.room')
    const join = $('.join')
    const roomname = $('.roomname')
    const username = $('.username')
    const members = $('.members')

    join.addClass('-hidden')
    room.removeClass('-hidden')


    let listItems = ''

    data.all.map((user) => {
      listItems += `<li class="${user.id === socket.id ? '-current' : ''}">${user.username}</li>`
    })

    members
      .html('')
      .append(listItems)

    username.text($('.-current').text())
    roomname.text(data.room)
  })

  // socket.on('disconnect', () => {
  //   console.log(socket.id)
  // })
}

buttonJoin.on('click', join)


