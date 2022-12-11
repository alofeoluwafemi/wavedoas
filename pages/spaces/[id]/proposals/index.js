import React, { useState } from 'react'
import { useRouter } from 'next/router';
import Layout from '../../../../components/Layout/Layout'
import { Tabs } from 'react-tabs'
import Tab from 'react-tabs/lib/components/Tab'
import TabList from 'react-tabs/lib/components/TabList'
import TabPanel from 'react-tabs/lib/components/TabPanel'
import ReturnIcon from '../../../../components/Icons/ReturnIcon';
import Link from 'next/link';
import DropdownIcon from '../../../../components/Icons/DropdownIcon';

const Proposals = () => {
    const router = useRouter();
    const goBack =()=>{
        router.back();
    }
    const [tabDropdown, setTabDropdown] = useState();


    const handleTabDropdown = () =>{
        console.log("clicked")
        setTabDropdown(!tabDropdown)

        
    }
  return (
    <div>
        <Layout>
            <div>
                <div className='flex items-center justify-between mb-6'>
                    <div>
                        <button className='flex items-center bg-[#3F3F3F] gap-2 px-6 py-4 rounded-full' onClick={goBack}>
                            <ReturnIcon /> Back
                        </button> 
                    
                    </div>
                    <div className='flex items-center flex-row gap-3'>
                            
                        <div className='h-14 w-14'>
                            <img src='/spaces-img/image1.svg' className='w-full object-cover rounded-full  '/>
                        </div>

                        <div>
                            <h4 className='mb-1'>Lets go on</h4>
                        </div>
                    </div>            
                </div>
                
                <div className=' w-full mt-3 md:mt-0  relative h-full px-2 lg:px-5 '>


               

                            <Tabs>
                                <div className='flex items-center py-4 mb-3 '>
                                    <div className='flex-1 w-full mb-0'>
                                        <h3 className='section__header'>Proposals</h3>
                                    </div>


                                    <div className='relative w-5/12 lg:hidden block '>
                                        <button className="flex items-center  bg-transparent text-sm border-[#545252] border px-5 py-2 rounded-full h-12 w-full justify-center" onClick={handleTabDropdown}>
                                            <span className='text-sm flex items-center pl-3' >
                                                All
                                            <DropdownIcon className="text-sm text-[#545252] "/>
                                            </span>
                                        </button>

                                        <div className={`absolute border-none category-menu ${tabDropdown ? "show" : ""}  large-dropdown  shadow-md rounded-md w-full h-64 max-w-full scrollbar-change fade-in z-10 py-3 mt-2`}>
                                                        
                                        <TabList>

                                            <div className=" py-4 h-full scrollbar-change overflow-y-auto space-y-2">

                                                <Tab className=''>

                                                    <button className={`flex items-center py-3 px-3 text-sm justify-between   w-full  hover:bg-[#545252] transition duration-200 ease-in-out  `} type="button">
                                                        All
                                                    </button>

                                                </Tab>
                                                <Tab className=''>
                                                    <button className={`flex items-center py-3 px-3 text-sm justify-between  w-full  hover:bg-[#545252] transition duration-200 ease-in-out  `} type="button">
                                                        Pending
                                                    </button>
                                                </Tab>
                                                <Tab className=''>
                                                    <button className={`flex items-center py-3 px-3 text-sm justify-between  w-full  hover:bg-[#545252] transition duration-200 ease-in-out  `} type="button">
                                                        Active
                                                    </button>
                                                </Tab>
                                                <Tab className=''>
                                                    <button className={`flex items-center py-3 px-3 text-sm justify-between  w-full  hover:bg-[#545252] transition duration-200 ease-in-out  `} type="button">
                                                        Closed
                                                    </button>
                                                </Tab>
                                                
                                            
                                            </div>
                                        </TabList>

                                        </div>

                                    </div>

                                    <TabList className='hidden lg:flex flex-row items-center justify-start  tabs-header rounded-md gap-3'>
                                        <Tab className=''>
                                            <button className="flex items-center text-sm px-6 py-3 rounded button2 h-12">
                                                All
                                            </button>
                                        </Tab>
                                        <Tab className=''>
                                            <button className="flex items-center text-sm px-6 py-3 rounded h-12 button2">
                                                Pending
                                            </button>
                                        </Tab>
                                        <Tab className=''>
                                            <button className="flex items-center text-sm px-6 py-3 rounded h-12 button2">
                                                Active
                                            </button>
                                        </Tab>
                                        <Tab className=''>
                                            <button className="flex items-center text-sm px-6 py-3 rounded h-12 button2">
                                            Closed
                                            </button>
                                        </Tab>
                                    </TabList>
                                </div>

                                <div className='py-4'>
                                    <TabPanel>
                                        <div className=" w-full mt-3 md:mt-0  relative rounded h-full fade-in">
                                            <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-x-7 gap-y-7'>

                                                    <Link href="/spaces/2/proposals/4/basic-voting">
                                                
                                               
                                                        <div className="px-5 py-7 border border-[#545252] text-white text-sm font-medium rounded-lg flex items-start justify-start flex-col form-check gap-2 cursor-pointer">
                                                            <div className='flex items-start flex-wrap md:flex-nowrap mb-3 gap-3'>
                                                                <div className='grow'>
                                                                    <h4 className='mb-3 text-sm text-[#E6E5E5]'>Increase Liquidity Pool Token Reserve by 1.5% before the next bull run.</h4>
                                                                    <div className='inline-flex items-center space-x-2'>
                                                                        <span className='text-[#8F8F8F]'>by</span>
                                                                        <span className='inline-flex items-center gap-1 text-xs'><img src='/spaces-img/image3.svg' className='w-6 h-6'/>0x6tRuldks...v223</span>
                                                                    </div>
                                                                </div>

                                                                {/* <div className="relative  font-normal inline-block text-gray-500 leading-tight ">
                                                            
                                                                    <span className="bg-gray-200 flex items-center rounded-full   justify-start py-2 px-5 ">
                                                                        <span className="h-2 w-4 text-gray-500 rounded-full mr-1">
                                                                        <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <circle cx="3" cy="3" r="3" fill="currentColor"/>
                                                                        </svg>
                                                                    </span>
                                                                    
                                                                    Pending
                                                                    </span>
                                                                    
                                                                </div> */}
                                                                <div className="relative  flex items-center md:justify-end font-normal  text-[#EEF0F2] leading-tight border border-[#545252] rounded-full bg-[#3F3F3F]">
                                                                    <span className="flex items-center rounded-full text-sm  justify-start py-2 px-5 ">
                                                                        <span className="h-2 w-4 text-green-500 rounded-full text-center">
                                                                            <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <circle cx="3" cy="3" r="3" fill="currentColor"/>
                                                                            </svg>
                                                                        </span>
                                                                        Active
                                                                    </span>
                                                                    
                                                                </div>
                                                                
                                                            </div>

                                                            <div className='flex items-start justify-start flex-col space-y-2'>
                                                                {/* <h5 className=' text-[#E6E5E5] text-sm'>Weighted voting</h5> */} 
                                                                <p className='text-xs text-[#C3C3C3] leading-5'>Egestas feugiat posuere vel diam egestas tortor eget magna elementum. Odio blandit sit egestas tellus. Volutpat gravida laoreet elementum morbi aliquam id quam lorem. Et leo sem malesuada risus a orci nullam mauris faucibus. Integer dignissim nunc odio quis..</p>
                                                            </div>

                                                            <div className='flex items-center justify-between w-full mt-4 flex-wrap gap-2'>
                                                                <span className='text-[#8F8F8F]'>3 days left</span>
                                                                <span><span className='text-[#8F8F8F] mr-4'>End:</span> Dec 1, 2022 - 10:00am </span>
                                                            </div>
                                                        </div>

                                                    </Link>
                                                
                                                    <Link href="/spaces/2/proposals/4/weighted-voting">

                                                        <div className="px-5 py-7 border border-[#545252] text-white text-sm font-medium rounded-lg flex items-start justify-start flex-col form-check gap-2 cursor-pointer">
                                                            <div className='flex items-start flex-wrap md:flex-nowrap mb-3 gap-3'>
                                                                <div className='grow'>
                                                                    <h4 className='mb-3 text-sm text-[#E6E5E5]'>Increase Liquidity Pool Token Reserve by 1.5% before the next bull run.</h4>
                                                                    <div className='inline-flex items-center space-x-2'>
                                                                        <span className='text-[#8F8F8F]'>by</span>
                                                                        <span className='inline-flex items-center gap-1 text-xs'><img src='/spaces-img/image3.svg' className='w-6 h-6'/>0x6tRuldks...v223</span>
                                                                    </div>
                                                                </div>
                                                                <div className="relative  flex items-center md:justify-end font-normal  text-[#EEF0F2] leading-tight border border-[#545252] rounded-full bg-[#3F3F3F]">
                                                                    <span className="flex items-center rounded-full text-sm  justify-start py-2 px-5 ">
                                                                        <span className="h-2 w-4 text-[#A4A1A1] rounded-full text-center">
                                                                            <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <circle cx="3" cy="3" r="3" fill="currentColor"/>
                                                                            </svg>
                                                                        </span>
                                                                        Pending
                                                                    </span>
                                                                    
                                                                </div>
                                                                
                                                            </div>

                                                            <div className='flex items-start justify-start flex-col space-y-2'>
                                                                {/* <h5 className=' text-[#E6E5E5] text-sm'>Weighted voting</h5> */} 
                                                                <p className='text-xs text-[#C3C3C3] leading-5'>Egestas feugiat posuere vel diam egestas tortor eget magna elementum. Odio blandit sit egestas tellus. Volutpat gravida laoreet elementum morbi aliquam id quam lorem. Et leo sem malesuada risus a orci nullam mauris faucibus. Integer dignissim nunc odio quis..</p>
                                                            </div>

                                                            <div className='flex items-center justify-between w-full mt-4'>
                                                                <span className='text-[#8F8F8F]'>Starting soon</span>
                                                                {/* <span><span className='text-[#8F8F8F] mr-4'>End:</span> Dec 1, 2022 - 10:00am </span> */}
                                                            </div>
                                                        </div>
                                                    </Link>


                                                    <div className="px-5 py-7 border border-[#545252] text-white text-sm font-medium rounded-lg flex items-start justify-start flex-col form-check gap-2 cursor-pointer">
                                                        <div className='flex items-start flex-wrap md:flex-nowrap mb-3 gap-3'>
                                                            <div className='grow'>
                                                                <h4 className='mb-3 text-sm text-[#E6E5E5]'>Increase Liquidity Pool Token Reserve by 1.5% before the next bull run.</h4>
                                                                <div className='inline-flex items-center space-x-2'>
                                                                    <span className='text-[#8F8F8F]'>by</span>
                                                                    <span className='inline-flex items-center gap-1 text-xs'><img src='/spaces-img/image3.svg' className='w-6 h-6'/>0x6tRuldks...v223</span>
                                                                </div>
                                                            </div>
                                                            <div className="relative  flex items-center md:justify-end font-normal  text-[#EEF0F2] leading-tight border border-[#545252] rounded-full bg-[#3F3F3F]">
                                                                <span className="flex items-center rounded-full text-sm  justify-between py-2 px-5 gap-2">
                                                                    <span className=" text-[#CF95F2] rounded-full text-center">
                                                                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M6.11301 9.88732L9.88634 6.11398M9.88634 9.88732L6.11301 6.11398M7.99967 14.6673C11.6663 14.6673 14.6663 11.6673 14.6663 8.00065C14.6663 4.33398 11.6663 1.33398 7.99967 1.33398C4.33301 1.33398 1.33301 4.33398 1.33301 8.00065C1.33301 11.6673 4.33301 14.6673 7.99967 14.6673Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                        </svg>
                                                                    </span>
                                                                    Closed
                                                                </span>
                                                                
                                                            </div>
                                                            
                                                        </div>


                                                        <div className='flex items-start justify-start flex-col lg:flex-row space-y-2 gap-3'>
                                                            <p className='w-full lg:w-6/12 text-xs text-[#C3C3C3] leading-5 lg:border-r border-[#545252] pr-3'>Egestas feugiat posuere vel diam egestas tortor eget magna elementum. Odio blandit sit egestas tellus. Volutpat gravida laoreet elementum morbi aliquam id quam lorem</p>

                                                            <div className='w-full lg:w-6/12 flex flex-row '>
                                                                
                                                                <div className='flex items-start justify-center py-4 md:py-0'>
                                                                    <img src='/basic_voting.svg' className='h-20 w-20'/>
                                                                </div>


                                                                <div className='grid grid-cols-1 gap-4 mt-0 md:mt-0 px-5 py-4 md:py-0'>
                                                                    <div className='flex items-center justify-start w-full gap-3'>
                                                                        <span className='w-2 h-2 p-1 bg-[#B869E8] rounded-full'></span>
                                                                        <span className='text-left text-xs'>For (85%)</span>
                                                                    </div>
                                                                    <div className='flex items-center justify-start w-full gap-3'>
                                                                        <span className='w-2 h-2 p-1 bg-[#F35DB7] rounded-full'></span>
                                                                        <span className='text-left text-xs'>Abstain (12%)</span>
                                                                    </div>
                                                                    <div className='flex items-center justify-start w-full gap-3'>
                                                                        <span className='w-2 h-2 p-1 bg-[#EDA460] rounded-full'></span>
                                                                        <span className='text-left text-xs'>Against (3%)</span>
                                                                    </div>
                                                                </div>
                                                        
                                                            </div>
                                                        </div>

                                                        
                                                    </div>
                                                    <div className="px-5 py-7 border border-[#545252] text-white text-sm font-medium rounded-lg flex items-start justify-start flex-col form-check gap-2 cursor-pointer">
                                                        <div className='flex items-start flex-wrap md:flex-nowrap mb-3 gap-3'>
                                                            <div className='grow'>
                                                                <h4 className='mb-3 text-sm text-[#E6E5E5]'>Increase Liquidity Pool Token Reserve by 1.5% before the next bull run.</h4>
                                                                <div className='inline-flex items-center space-x-2'>
                                                                    <span className='text-[#8F8F8F]'>by</span>
                                                                    <span className='inline-flex items-center gap-1 text-xs'><img src='/spaces-img/image3.svg' className='w-6 h-6'/>0x6tRuldks...v223</span>
                                                                </div>
                                                            </div>
                                                            <div className="relative  flex items-center md:justify-end font-normal  text-[#EEF0F2] leading-tight border border-[#545252] rounded-full bg-[#3F3F3F]">
                                                                <span className="flex items-center rounded-full text-sm  justify-start py-2 px-5 ">
                                                                    <span className="h-2 w-4 text-[#A4A1A1] rounded-full text-center">
                                                                        <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <circle cx="3" cy="3" r="3" fill="currentColor"/>
                                                                        </svg>
                                                                    </span>
                                                                    Pending
                                                                </span>
                                                                
                                                            </div>
                                                            
                                                        </div>

                                                        <div className='flex items-start justify-start flex-col space-y-2'>
                                                            {/* <h5 className=' text-[#E6E5E5] text-sm'>Weighted voting</h5> */} 
                                                            <p className='text-xs text-[#C3C3C3] leading-5'>Egestas feugiat posuere vel diam egestas tortor eget magna elementum. Odio blandit sit egestas tellus. Volutpat gravida laoreet elementum morbi aliquam id quam lorem. Et leo sem malesuada risus a orci nullam mauris faucibus. Integer dignissim nunc odio quis..</p>
                                                        </div>

                                                        <div className='flex items-center justify-between w-full mt-4'>
                                                            <span className='text-[#8F8F8F]'>Starting soon</span>
                                                            {/* <span><span className='text-[#8F8F8F] mr-4'>End:</span> Dec 1, 2022 - 10:00am </span> */}
                                                        </div>
                                                    </div>

                                                <Link href="/spaces/2/proposals/4/">

                                                    <div className="px-5 py-7 border border-[#545252] text-white text-sm font-medium rounded-lg flex items-start justify-start flex-col form-check gap-2 cursor-pointer">
                                                        <div className='flex items-start flex-wrap md:flex-nowrap mb-3 gap-3'>
                                                            <div className='grow'>
                                                                <h4 className='mb-3 text-sm text-[#E6E5E5]'>Increase Liquidity Pool Token Reserve by 1.5% before the next bull run.</h4>
                                                                <div className='inline-flex items-center space-x-2'>
                                                                    <span className='text-[#8F8F8F]'>by</span>
                                                                    <span className='inline-flex items-center gap-1 text-xs'><img src='/spaces-img/image3.svg' className='w-6 h-6'/>0x6tRuldks...v223</span>
                                                                </div>
                                                            </div>

                                                            <div className="relative  flex items-center md:justify-end font-normal  text-[#EEF0F2] leading-tight border border-[#545252] rounded-full bg-[#3F3F3F]">
                                                                <span className="flex items-center rounded-full text-sm  justify-start py-2 px-5 ">
                                                                    <span className="h-2 w-4 text-green-500 rounded-full text-center">
                                                                        <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <circle cx="3" cy="3" r="3" fill="currentColor"/>
                                                                        </svg>
                                                                    </span>
                                                                    Active
                                                                </span>
                                                                
                                                            </div>
                                                            
                                                        </div>

                                                        <div className='flex items-start justify-start flex-col space-y-2'>
                                                            {/* <h5 className=' text-[#E6E5E5] text-sm'>Weighted voting</h5> */} 
                                                            <p className='text-xs text-[#C3C3C3] leading-5'>Egestas feugiat posuere vel diam egestas tortor eget magna elementum. Odio blandit sit egestas tellus. Volutpat gravida laoreet elementum morbi aliquam id quam lorem. Et leo sem malesuada risus a orci nullam mauris faucibus. Integer dignissim nunc odio quis..</p>
                                                        </div>

                                                        <div className='flex items-center justify-between w-full mt-4 flex-wrap gap-2'>
                                                            <span className='text-[#8F8F8F]'>3 days left</span>
                                                            <span><span className='text-[#8F8F8F] mr-4'>End:</span> Dec 1, 2022 - 10:00am </span>
                                                        </div>
                                                    </div>
                                                </Link>                                                
                                                
                                                <div className="px-5 py-7 border border-[#545252] text-white text-sm font-medium rounded-lg flex items-start justify-start flex-col form-check gap-2 cursor-pointer">
                                                        <div className='flex items-start flex-wrap md:flex-nowrap mb-3 gap-3'>
                                                            <div className='grow'>
                                                                <h4 className='mb-3 text-sm text-[#E6E5E5]'>Increase Liquidity Pool Token Reserve by 1.5% before the next bull run.</h4>
                                                                <div className='inline-flex items-center space-x-2'>
                                                                    <span className='text-[#8F8F8F]'>by</span>
                                                                    <span className='inline-flex items-center gap-1 text-xs'><img src='/spaces-img/image3.svg' className='w-6 h-6'/>0x6tRuldks...v223</span>
                                                                </div>
                                                            </div>
                                                            <div className="relative  flex items-center md:justify-end font-normal  text-[#EEF0F2] leading-tight border border-[#545252] rounded-full bg-[#3F3F3F]">
                                                                <span className="flex items-center rounded-full text-sm  justify-between py-2 px-5 gap-2">
                                                                    <span className=" text-[#CF95F2] rounded-full text-center">
                                                                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M6.11301 9.88732L9.88634 6.11398M9.88634 9.88732L6.11301 6.11398M7.99967 14.6673C11.6663 14.6673 14.6663 11.6673 14.6663 8.00065C14.6663 4.33398 11.6663 1.33398 7.99967 1.33398C4.33301 1.33398 1.33301 4.33398 1.33301 8.00065C1.33301 11.6673 4.33301 14.6673 7.99967 14.6673Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                        </svg>
                                                                    </span>
                                                                    Closed
                                                                </span>
                                                                
                                                            </div>
                                                            
                                                        </div>


                                                        <div className='flex items-start justify-start flex-col lg:flex-row space-y-2 gap-3'>
                                                            <p className='w-full lg:w-6/12 text-xs text-[#C3C3C3] leading-5 lg:border-r border-[#545252] pr-3'>Egestas feugiat posuere vel diam egestas tortor eget magna elementum. Odio blandit sit egestas tellus. Volutpat gravida laoreet elementum morbi aliquam id quam lorem</p>

                                                            <div className='w-full lg:w-6/12 flex flex-row '>
                                                                
                                                                <div className='flex items-start justify-center py-4 md:py-0'>
                                                                    <img src='/basic_voting.svg' className='h-20 w-20'/>
                                                                </div>


                                                                <div className='grid grid-cols-1 gap-4 mt-0 md:mt-0 px-5 py-4 md:py-0'>
                                                                    <div className='flex items-center justify-start w-full gap-3'>
                                                                        <span className='w-2 h-2 p-1 bg-[#B869E8] rounded-full'></span>
                                                                        <span className='text-left text-xs'>For (85%)</span>
                                                                    </div>
                                                                    <div className='flex items-center justify-start w-full gap-3'>
                                                                        <span className='w-2 h-2 p-1 bg-[#F35DB7] rounded-full'></span>
                                                                        <span className='text-left text-xs'>Abstain (12%)</span>
                                                                    </div>
                                                                    <div className='flex items-center justify-start w-full gap-3'>
                                                                        <span className='w-2 h-2 p-1 bg-[#EDA460] rounded-full'></span>
                                                                        <span className='text-left text-xs'>Against (3%)</span>
                                                                    </div>
                                                                </div>
                                                        
                                                            </div>
                                                        </div>

                                                        
                                                    </div>


                                            </div>
                                           
                                            
                                        </div>

                                    </TabPanel>
                                    <TabPanel>

                                        <div className=" w-full mt-3 md:mt-0  relative rounded h-full fade-in">
                                            <div className='flex items-center justify-center flex-col gap-4 py-8 max-w-md mx-auto'>
                                                <img src="/Group.svg" />
                                                <p>
                                                No pending proposal yet
                                                </p>

                                                <Link href="/spaces/2/create-proposals" className='w-full rounded-full bg-[#736C77] text-white py-3 mt-4 block text-center'>Create Proposals</Link>
                                            </div>
                                            
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div className=" w-full mt-3 md:mt-0  relative rounded h-full fade-in">
                                            <div className='flex items-center justify-center flex-col gap-4 py-8 max-w-md mx-auto'>
                                                <img src="/Group.svg" />
                                                <p>
                                                No active proposal yet
                                                </p>

                                                <Link href="/spaces/2/create-proposals" className='w-full rounded-full bg-[#736C77] text-white py-3 mt-4 block text-center'>Create Proposals</Link>
                                            </div>
                                            
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div className=" w-full mt-3 md:mt-0  relative rounded h-full fade-in">
                                            <div className='flex items-center justify-center flex-col gap-4 py-8 max-w-md mx-auto'>
                                                <img src="/Group.svg" />
                                                <p>
                                                No closed proposal yet
                                                </p>

                                                <Link href="/spaces/2/create-proposals" className='w-full rounded-full bg-[#736C77] text-white py-3 mt-4 block text-center'>Create Proposals</Link>
                                            </div>
                                            
                                        </div>
                                    </TabPanel>

                                </div>



                            </Tabs>

                </div>
               
            </div>
        </Layout>
    </div>
  )
}

export default Proposals