
import InstallPWA from "../components/InstallPWA.js"
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <InstallPWA />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
