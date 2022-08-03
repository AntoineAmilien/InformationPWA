import 'tailwindcss/tailwind.css'
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SessionProvider session={session}>
        <Head>
          <title>NXO - Informations</title>
          <meta name="description" content="NXO - Informations" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <GetLayoutComponent Component={Component} pageProps={pageProps} />
      </SessionProvider>
    </>
  )
}

//Obligé de creer un composant comme celui si pour ensuite le placer dans le SessionProvider et pas autour.
//Ca permet de recuperer la session dans le layout.
function GetLayoutComponent(props) {
  const { Component, pageProps } = props
  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(
    <>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
