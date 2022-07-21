
import InstallPWA from "../components/InstallPWA.js"
function MyApp({ Component, pageProps }) {
  return (
    <>
      <InstallPWA />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
