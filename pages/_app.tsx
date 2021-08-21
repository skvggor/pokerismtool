import '../styles/globals.sass'

function MyApp({ Component, pageProps }) {
  return (
    <div suppressHydrationWarning={true}>
      { process.browser && <Component { ...pageProps } /> }
    </div>
  )
}

export default MyApp
