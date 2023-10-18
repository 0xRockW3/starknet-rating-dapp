import Head from 'next/head'
import Header from '../components/layouts/Header'
import Footer from '../components/layouts/Footer'
import Wallet from '../components/starknet/Wallet'

export default function Home() {
  const APPLICATION_TITLE = "0xRock's Ratings for StarkHubTR DApp"

  return (
    <>
      <Head>
        <title>{APPLICATION_TITLE}</title>
        <meta name="description" content={`${APPLICATION_TITLE}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="container mx-auto px-20 text-center app-cont">
        <Header />
        <Wallet />
        <Footer />
      </main>
    </>
  )
}
