import React, { useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import Sidebar from './Sidebar'
import Head from 'next/head'

const Layout = ({ children, connectWallet }) => {
  const [showMobileNavbar, setShowMobileNavbar] = useState(false);

    const navbarToggler = () =>{
        setShowMobileNavbar(!showMobileNavbar);
    }
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
        <link rel="icon" href="./favicon.png" />
      </Head>
        <div className='h-screen flex flex-row justify-start border-none'>
            <Sidebar showMobileNavbar={showMobileNavbar} setShowMobileNavbar={setShowMobileNavbar}/>
            <div className='bg-[#373636] flex-1  h-full overflow-y-auto'>
                <Header toggleconnectWallet={connectWallet} navbarToggler={navbarToggler}/>
                <div className='px-4 lg:px-8 xl:px-12 py-4 pb-9 mb-12 mt-6 max-w-6xl mx-auto'>
                    {children}
                </div>
                
                {/* <Footer/> */}
            </div>
            
            
        </div>
    </>
  )
}

export default Layout
