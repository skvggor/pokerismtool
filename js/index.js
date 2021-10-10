const navigation = () => {
  const startPage = $('.start-page')
  const entrarButton =  $('.start-page_entrar')
  const criarButton = $('.start-page_criar')
  const entrarPage = $('.entrar-page')
  const criarPage = $('.criar-page')

  entrarButton.on('click', () => {
    startPage.addClass('-hidden')
    entrarPage.removeClass('-hidden')
    criarPage.addClass('-hidden')
  })

  criarButton.on('click', () => {
    startPage.addClass('-hidden')
    entrarPage.addClass('-hidden')
    criarPage.removeClass('-hidden')
  })

  const criarRoom = $('.criar-page_criar')

  criarRoom.on('click', () => {
    const username = $('.criar-page_nome')
    const room = $('.criar-page_sala')
    const socket = io()

    socket.emit('join', {
      username: $(username).val(),
      room: $(room).val()
    })

    socket.on('connect', () => {
      console.log(socket.id)
    })

    socket.on('roomCreated', (data) => {
      console.log(data)
      criarPage.addClass('-hidden')
    })
  })

  const entrarRoom = $('.entrar-page_entrar')

  entrarRoom.on('click', () => {
    const username = $('.entrar-page_nome')
    const room = $('.entrar-page_sala')
    const socket = io()

    socket.emit('join', {
      username: $(username).val(),
      room: $(room).val()
    })

    socket.on('connect', () => {
      console.log(socket.id)
    })

    socket.on('roomCreated', (data) => {
      console.log(data)
      entrarPage.addClass('-hidden')
    })
  })
}

const init = () => {
  navigation()
}

init()
