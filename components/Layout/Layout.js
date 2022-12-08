import React from 'react'
import Footer from './Footer'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = ({children, connectWallet}) => {
  return (
    <div className='h-screen flex flex-row justify-start border-none'>
        <Sidebar/>
        <div className='bg-[#373636] flex-1  h-full overflow-y-auto'>
            <Header toggleconnectWallet={connectWallet}/>
            <div className='px-12 py-4 pb-9 mb-12 mt-6 max-w-6xl mx-auto'>
                {children}
            </div>
            
            {/* <Footer/> */}
        </div>
        
        
    </div>
  )
}

export default Layout