import Link from 'next/link'
import React, { useState } from 'react'
import LockIcon from '../Icons/LockIcon'
import ToggleIcon from '../Icons/ToggleIcon'
import { useRouter } from 'next/router'
import Sidebar from './Sidebar'
import MobileSidebar from './MobileSidebar'


const Header = ({toggleconnectWallet, navbarToggler}) => {
    const [connectWallet, setConnectWallet] = useState();

    const toggleConnectWalletModal = () =>{
        setConnectWallet(!connectWallet);
    }
    

    const isauthenticated = true;
    const router = useRouter();


    
  return (
    <div className='sticky top-0 z-50 py-4 px-6 bg-[#373636] border-b border-[#545252]'>
        <div className='flex items-center justify-between '>
            <div className={`flex items-center justify-between ${isauthenticated ? "gap-8 w-6/12" : ""}`}>
                <button className='md:hidden items-center justify-between p-3 flex rounded-full bg-[#3F3F3F]' onClick={navbarToggler}>
                    <ToggleIcon />
                </button>


                {/* <div> */}
                {
                    isauthenticated && (router.asPath === "/spaces" || router.pathname.startsWith("/spaces")) &&
                    <div className="relative rounded-full flex-1 bg-[#3F3F3F] items-center grow flex h-12 w-full hidden lg:block ">
                        <div className="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none h-full">
                            <span className="text-gray-500 px-3 w-22 h-22">
                                <img src="/search.svg" className="w-full h-full" />
                            </span>
                        </div>
                        <input placeholder="Search Spaces" type="text" name="search" id="search" className="py-2 block w-full pl-16 pr-7 sm:text-sm rounded-full h-full focus:outline-none bg-transparent border-none border-[#545252] transition ease-in duration-200 text-[#A4A1A1]"
                        />
                    </div>

                }

                {/* </div> */}
                
            </div>

            <div className='flex items-center gap-8'>
                { isauthenticated 
                
                ? 

                    <button className='bg-transparent border border-[#545252] transition ease-in duration-200 text-white px-5 py-2 flex justify-start items-center gap-4 rounded-full' onClick={toggleConnectWalletModal}>
                        <span className="text-gray-500 w-8 h-8">
                            <img src="/spaces-img/image9.svg" className="w-full h-full" />
                        </span>
                        0x6tR...v223
                    </button>
                :
                    <button className='button1 px-7 py-3 flex justify-between items-center gap-5 rounded-full' onClick={toggleConnectWalletModal}>
                        <span>
                            <LockIcon/>
                        </span>
                        Connect Wallet
                    </button>

                }

                <button className='bg-[#3F3F3F] p-3 rounded-full h-12 w-12 hidden md:block'>
                    <img src='/sun.svg' className='h-full w-full object-cover'/> 
                </button>
            </div>

        </div>



        {/* MODAL BOX */}
        <div className={`modal__box ${connectWallet ? 'show' : ''}`}>
                <div className="modal__box-wrapper shadow-lg rounded-2xl">
        
                <div className="flex items-start justify-between mb-6">

                    <div className="grow">
                        <h1 className="text-2xl font-semibold mb-3">Connect Wallet</h1>
                    </div>
                    
                    <button className="flex items-center absolute top-3 right-2"  onClick={()=>setConnectWallet(false)}>
                        <span className="pointer-events-none flex items-center p-2">
                            <svg className='h-5 w-5 ' viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </span>
                    </button>

                </div>

                    <div className='flex flex-col gap-4 mt-5 w-full'>
                        <button className='px-9 py-3 border border-[#545252] bg-[#3F3F3F] text-white rounded-full flex items-center justify-start gap-5' type='button' >
                            <img src='/Image.svg'/> Metamask
                        </button>
                        
                        <button className='px-9 py-3 border border-[#545252] bg-[#3F3F3F] text-white rounded-full flex items-center justify-start gap-5' type='button' >
                            <img src='/image 1.svg'/> Keeper
                        </button>
                    </div>

                </div>
            </div>



        

    </div>
  )
}

export default Header