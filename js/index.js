const navigation = () => {
  const startPage = $('.start-page')
  const entrarButton =  $('.start-page_entrar')
  const criarButton = $('.start-page_criar')
  const entrarPage = $('.entrar-page')
  const criarPage = $('.criar-page')
  const votarPage = $('.votacao-page')

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

      $(document).on('voting', () => {

        console.log('voting...')

        $('.votar').on('click', (event) => {
          console.log('clicked')
          socket.emit('vote', {
            vote: $(event.currentTarget).data('vote'),
            username: $(username).val()
          })
        })
      })

      $(document).trigger('voting')
    })

    socket.on('roomCreated', (data) => {
      criarPage.addClass('-hidden')
      votarPage.removeClass('-hidden')
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

      $(document).off().on('voting', () => {

        console.log('voting...')

        $('.votar').on('click', (event) => {
          console.log('clicked')
          socket.emit('vote', {
            vote: $(event.currentTarget).data('vote'),
            username: $(username).val()
          })
        })
      })

      $(document).trigger('voting')
    })

    socket.on('roomCreated', (data) => {
      entrarPage.addClass('-hidden')
      votarPage.removeClass('-hidden')
    })
  })
}

const init = () => {
  navigation()
}

init()
