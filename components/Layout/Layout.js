import React from 'react'
import Footer from './Footer'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = ({ children, connectWallet }) => {
  return (
    <>
      <Head>
        <title>WaveDAOs</title>
        <meta
          name="description"
          content="WavesDaos is bringing off-chain voting to the Waves DAO ecosystem by building with the design patterns used by popular DAO systems such as snapshots and XDAO"
        />
        <meta name="keywords" content="Waves, DAO, Snapshot, XDAO, Dorahacks" />
        <meta property="og:title" content="WaveDAOs" />
        <meta property="og:image" content="https://www.wavedoas.com/no-money-in-wallet.svg" />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
        <meta property="og:site_name" content="WaveDAOs" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="images/Logo.svg" />
      </Head>
      <div className="h-screen flex flex-row justify-start border-none">
        <Sidebar />
        <div className="bg-[#373636] flex-1  h-full overflow-y-auto">
          <Header toggleconnectWallet={connectWallet} />
          <div className="px-12 py-4 pb-9 mb-12 mt-6 max-w-6xl mx-auto">{children}</div>

          {/* <Footer/> */}
        </div>
      </div>
    </>
  )
}

export default Layout
