// import styles from '../styles/shared/Home.module.sass'

export default function Home() {
  const socket = new WebSocket('wss://localhost:8080', 'echo-protocol')

  socket.onopen = () => {
    socket.send("Hello!")
  };

  socket.onmessage = (data) => {
    console.log(data)
  }

  return (
    <>
      <p>Eiusmod excepteur duis eu reprehenderit amet sit magna irure ipsum pariatur do tempor sit est. Commodo ut tempor eu labore proident quis minim adipisicing voluptate magna excepteur velit fugiat. Anim in sunt adipisicing amet aliquip eu amet aliqua fugiat adipisicing.</p>
    </>
  )
}
