import Link from 'next/link'
import React, { useState } from 'react'
import { Tabs } from 'react-tabs'
import Tab from 'react-tabs/lib/components/Tab'
import TabList from 'react-tabs/lib/components/TabList'
import TabPanel from 'react-tabs/lib/components/TabPanel'
import DropdownIcon from '../../components/Icons/DropdownIcon'
import Layout from '../../components/Layout/Layout'

const Spaces = () => {
    const [catDropdown, setCatDropdown] = useState();


    const handleCategoryDropdown = () =>{
        setCatDropdown(!catDropdown)
    }

    const categories = [
        {
            "id": 1,
            "name": "All",
            "selected": true
        },
        {
            "id": 2,
            "name": "Collector",
        },
        {
            "id": 3,
            "name": "Creator",
        },
        {
            "id": 4,
            "name": "Grant",
        },
        {
            "id": 5,
            "name": "Investment",
        },
        {
            "id": 6,
            "name": "Media",
        },
        {
            "id": 7,
            "name": "Protocol",
        },
        {
            "id": 8,
            "name": "Service",
        },
        {
            "id": 9,
            "name": "Social",
        },

    ]
  return (
    <div>
        <Layout>
            <div>
                <div className='flex items-center justify-between'>
                    <h1 className='section__header'>Spaces</h1>

                    <div className='relative'>
                        <button className="flex items-center  bg-transparent text-sm border-[#545252] border px-5 py-2 rounded-full h-12" onClick={handleCategoryDropdown}>
                            <span  className='h-6 w-6 flex items-center mr-1'>
                                <img src='/educare.svg' className='h-full w-full'/>
                            </span>
                            Categories
                            <span className='text-sm flex items-center ml-4 pl-3 border-[#545252] border-l' >
                                All
                            <DropdownIcon className="text-sm text-[#545252] "/>
                            </span>
                        </button>

                        <div className={`absolute border-none category-menu  ${catDropdown ? 'show' : ''} large-dropdown  shadow-md rounded-md w-full h-64 max-w-full scrollbar-change fade-in z-10 py-3 mt-2`}>
                                                
                                        
                                        <div className=" py-4 h-full scrollbar-change overflow-y-auto px-3 space-y-2">

                                            {categories.map((category, index)=>(
                                                <button className={`flex items-center py-3 px-2 text-sm justify-between  rounded-lg w-full  hover:bg-[#545252] transition duration-200 ease-in-out  ${category.selected ? "bg-[#545252]": ""}`} type="button" key={index}>
                                                    {category.name}
                                                </button>
                                            ))}
                                        
                                        </div>
                                </div>
                    </div>
                </div>



                <div>
                        <Tabs>
                            <div className='flex items-center py-4 mb-3 flex-col lg:flex-row'>

                                <TabList className='flex flex-row items-center justify-start  tabs-header rounded-md gap-3'>
                                    <Tab className=''>
                                        <button className="flex items-center text-sm px-6 py-3 rounded button2 h-12">
                                            My spaces
                                        </button>
                                    </Tab>
                                    <Tab className=''>
                                        <button className="flex items-center text-sm px-6 py-3 rounded h-12 button2">
                                            Joined Spaces
                                        </button>
                                    </Tab>
                                </TabList>
                            </div>


                                <div className='py-4'>
                                    <TabPanel>
                                        <div className=" w-full mt-3 md:mt-0  relative overflow-hidden rounded h-full fade-in">
                                            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-x-12 gap-y-4">
                                                {/* <Link href="/spaces/2"> */}
                                                    <div className='flip'>
                                                        <div className="flex items-center text-sm w-full border border-[#545252] rounded-md front ">
                                                            <div className="flex rounded-md items-center flex-col justify-center gap-4 w-full p-3 py-5 bg-[#373636]">

                                                                <div className='h-20 w-20'>
                                                                    <img src='/spaces-img/image1.svg' className='w-full object-cover rounded-full  '/>
                                                                </div>
                                                        
                                                                <div className=' mt-2'>
                                                                    
                                                                    <h4 className='mb-1'>Lets go on</h4>
                                                                    <p className="text-[#8F8F8F]">Arts, Grant</p>
                                                                    <p className="text-[#8F8F8F]">5k Members</p>
                                                                </div>
                                                                
                                                            </div>
                                                        
                                                        </div> 
                                                        <div className="flex items-center text-sm w-full border border-[#545252] rounded-md back bg-[#373636]">
                                                            <div className="flex flex-col justify-evenly gap-2 w-full p-3 py-5 ">

                                                                <div className='flex items-center justify-start gap-4'>
                                                                    <img src='/spaces-img/image1.svg' className='object-cover rounded-full h-14 w-14 '/>
                                                                    <span className='text-lg'>Lets go on</span>
                                                                </div>
                                                        
                                                                <div className=''>
                                                                    
                                                                    <p className="text-[#8F8F8F]">Dynasty of a starter for things all being equal in a matter of space</p>
                                                                </div>

                                                                <Link href="/spaces/2" className='button1 py-2 px-6 w-full text-center rounded-full mt-2'>
                                                                    Join
                                                                </Link>
                                                                
                                                            </div>
                                                        
                                                        </div>
                                                    </div>
                                                    
                                                {/* </Link> */}
                                            </div>
                                        </div>

                                    </TabPanel>
                                    <TabPanel>

                                        <div className=" w-full mt-3 md:mt-0  relative overflow-hidden rounded h-full fade-in">
                                            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-x-12 gap-y-4">
                                                {/* <Link href="/spaces/2">

                                                    <div className="flex items-center flex-col justify-center mb-2 gap-4 text-sm w-full border border-[#545252] rounded-md p-3 py-5">
                                                        <div className='h-20 w-20'>
                                                            <img src='/spaces-img/image2.svg' className='w-full object-cover rounded-full  '/>
                                                        </div>
                                                
                                                        <div className=' mt-2'>
                                                            <h4 className='mb-1'>Lets go on</h4>
                                                            <p className="text-[#8F8F8F]">Arts, Grant</p>
                                                            <p className="text-[#8F8F8F]">5k Members</p>
                                                        </div> 
                                                    </div>
                                                </Link> */}
                                                    <div className='flip'>
                                                        <div className="flex items-center text-sm w-full border border-[#545252] rounded-md front ">
                                                            <div className="flex rounded-md items-center flex-col justify-center gap-4 w-full p-3 py-5 bg-[#373636]">

                                                                <div className='h-20 w-20'>
                                                                    <img src='/spaces-img/image2.svg' className='w-full object-cover rounded-full  '/>
                                                                </div>
                                                        
                                                                <div className=' mt-2'>
                                                                    
                                                                    <h4 className='mb-1'>Lets go on</h4>
                                                                    <p className="text-[#8F8F8F]">Arts, Grant</p>
                                                                    <p className="text-[#8F8F8F]">5k Members</p>
                                                                </div>
                                                                
                                                            </div>
                                                        
                                                        </div> 
                                                        <div className="flex items-center text-sm w-full border border-[#545252] rounded-md back bg-[#373636]">
                                                            <div className="flex flex-col justify-evenly gap-2 w-full p-3 py-5 ">

                                                                <div className='flex items-center justify-start gap-4'>
                                                                    <img src='/spaces-img/image2.svg' className='object-cover rounded-full h-14 w-14 '/>
                                                                    <span className='text-lg'>Lets go on</span>
                                                                </div>
                                                        
                                                                <div className=''>
                                                                    
                                                                    <p className="text-[#8F8F8F]">Dynasty of a starter for things all being equal in a matter of space</p>
                                                                </div>

                                                                <Link href="/spaces/2" className='button1 py-2 px-6 w-full text-center rounded-full mt-2'>
                                                                    Join
                                                                </Link>
                                                                
                                                            </div>
                                                        
                                                        </div>
                                                    </div>
                                                    <div className='flip h-full'>
                                                        <div className="flex items-center text-sm w-full border border-[#545252] rounded-md front ">
                                                            <div className="flex rounded-md items-center flex-col justify-center gap-4 w-full p-3 py-5 bg-[#373636]">

                                                                <div className='h-20 w-20'>
                                                                    <img src='/spaces-img/image3.svg' className='w-full object-cover rounded-full  '/>
                                                                </div>
                                                        
                                                                <div className=' mt-2'>
                                                                    
                                                                    <h4 className='mb-1'>Lets go on</h4>
                                                                    <p className="text-[#8F8F8F]">Arts, Grant</p>
                                                                    <p className="text-[#8F8F8F]">5k Members</p>
                                                                </div>
                                                                
                                                            </div>
                                                        
                                                        </div> 
                                                        <div className="flex items-center text-sm w-full border border-[#545252] rounded-md back bg-[#373636]">
                                                            <div className="flex flex-col justify-between gap-2 w-full h-full p-3 py-5 ">

                                                                <div className='flex items-center justify-start gap-4'>
                                                                    <img src='/spaces-img/image3.svg' className='object-cover rounded-full h-14 w-14 '/>
                                                                    <span className='text-lg'>Lets go on</span>
                                                                </div>
                                                        
                                                                <div className=''>
                                                                    
                                                                    <p className="text-[#8F8F8F]">Dynasty of a starter for things all being equal in a matter of space...</p>
                                                                </div>

                                                                <Link href="/spaces/2" className='button1 py-2 px-6 w-full text-center rounded-full'>
                                                                    Join
                                                                </Link>
                                                                
                                                            </div>
                                                        
                                                        </div>
                                                    </div>

                                                    <div className='flip h-full'>
                                                        <div className="flex items-center text-sm w-full border border-[#545252] rounded-md front ">
                                                            <div className="flex rounded-md items-center flex-col justify-center gap-4 w-full p-3 py-5 bg-[#373636]">

                                                                <div className='h-20 w-20'>
                                                                    <img src='/spaces-img/image4.svg' className='w-full object-cover rounded-full  '/>
                                                                </div>
                                                        
                                                                <div className=' mt-2'>
                                                                    
                                                                    <h4 className='mb-1'>Lets go on</h4>
                                                                    <p className="text-[#8F8F8F]">Arts, Grant</p>
                                                                    <p className="text-[#8F8F8F]">5k Members</p>
                                                                </div>
                                                                
                                                            </div>
                                                        
                                                        </div> 
                                                        <div className="flex items-center text-sm w-full border border-[#545252] rounded-md back bg-[#373636]">
                                                            <div className="flex flex-col justify-between gap-2 w-full h-full p-3 py-5 ">

                                                                <div className='flex items-center justify-start gap-4'>
                                                                    <img src='/spaces-img/image4.svg' className='object-cover rounded-full h-14 w-14 '/>
                                                                    <span className='text-lg'>Lets go on</span>
                                                                </div>
                                                        
                                                                <div className=''>
                                                                    
                                                                    <p className="text-[#8F8F8F]">Dynasty of a starter for things all being equal in a matter of space...</p>
                                                                </div>

                                                                <Link href="/spaces/2" className='button1 py-2 px-6 w-full text-center rounded-full'>
                                                                    Join
                                                                </Link>
                                                                
                                                            </div>
                                                        
                                                        </div>
                                                    </div>


                                                    <div className='flip h-full'>
                                                        <div className="flex items-center text-sm w-full border border-[#545252] rounded-md front ">
                                                            <div className="flex rounded-md items-center flex-col justify-center gap-4 w-full p-3 py-5 bg-[#373636]">

                                                                <div className='h-20 w-20'>
                                                                    <img src='/spaces-img/image5.svg' className='w-full object-cover rounded-full  '/>
                                                                </div>
                                                        
                                                                <div className=' mt-2'>
                                                                    
                                                                    <h4 className='mb-1'>Lets go on</h4>
                                                                    <p className="text-[#8F8F8F]">Arts, Grant</p>
                                                                    <p className="text-[#8F8F8F]">5k Members</p>
                                                                </div>
                                                                
                                                            </div>
                                                        
                                                        </div> 
                                                        <div className="flex items-center text-sm w-full border border-[#545252] rounded-md back bg-[#373636]">
                                                            <div className="flex flex-col justify-between gap-2 w-full h-full p-3 py-5 ">

                                                                <div className='flex items-center justify-start gap-4'>
                                                                    <img src='/spaces-img/image5.svg' className='object-cover rounded-full h-14 w-14 '/>
                                                                    <span className='text-lg'>Lets go on</span>
                                                                </div>
                                                        
                                                                <div className=''>
                                                                    
                                                                    <p className="text-[#8F8F8F]">Dynasty of a starter for things all being equal in a matter of space...</p>
                                                                </div>

                                                                <Link href="/spaces/2" className='button1 py-2 px-6 w-full text-center rounded-full'>
                                                                    Join
                                                                </Link>
                                                                
                                                            </div>
                                                        
                                                        </div>
                                                    </div>


                                                    <div className='flip h-full'>
                                                        <div className="flex items-center text-sm w-full border border-[#545252] rounded-md front ">
                                                            <div className="flex rounded-md items-center flex-col justify-center gap-4 w-full p-3 py-5 bg-[#373636]">

                                                                <div className='h-20 w-20'>
                                                                    <img src='/spaces-img/image6.svg' className='w-full object-cover rounded-full  '/>
                                                                </div>
                                                        
                                                                <div className=' mt-2'>
                                                                    
                                                                    <h4 className='mb-1'>Lets go on</h4>
                                                                    <p className="text-[#8F8F8F]">Arts, Grant</p>
                                                                    <p className="text-[#8F8F8F]">5k Members</p>
                                                                </div>
                                                                
                                                            </div>
                                                        
                                                        </div> 
                                                        <div className="flex items-center text-sm w-full border border-[#545252] rounded-md back bg-[#373636]">
                                                            <div className="flex flex-col justify-between gap-2 w-full h-full p-3 py-5 ">

                                                                <div className='flex items-center justify-start gap-4'>
                                                                    <img src='/spaces-img/image6.svg' className='object-cover rounded-full h-14 w-14 '/>
                                                                    <span className='text-lg'>Lets go on</span>
                                                                </div>
                                                        
                                                                <div className=''>
                                                                    
                                                                    <p className="text-[#8F8F8F]">Dynasty of a starter for things all being equal in a matter of space...</p>
                                                                </div>

                                                                <Link href="/spaces/2" className='button1 py-2 px-6 w-full text-center rounded-full'>
                                                                    Join
                                                                </Link>
                                                                
                                                            </div>
                                                        
                                                        </div>
                                                    </div>
                                                    <div className='flip h-full'>
                                                        <div className="flex items-center text-sm w-full border border-[#545252] rounded-md front ">
                                                            <div className="flex rounded-md items-center flex-col justify-center gap-4 w-full p-3 py-5 bg-[#373636]">

                                                                <div className='h-20 w-20'>
                                                                    <img src='/spaces-img/image7.svg' className='w-full object-cover rounded-full  '/>
                                                                </div>
                                                        
                                                                <div className=' mt-2'>
                                                                    
                                                                    <h4 className='mb-1'>Lets go on</h4>
                                                                    <p className="text-[#8F8F8F]">Arts, Grant</p>
                                                                    <p className="text-[#8F8F8F]">5k Members</p>
                                                                </div>
                                                                
                                                            </div>
                                                        
                                                        </div> 
                                                        <div className="flex items-center text-sm w-full border border-[#545252] rounded-md back bg-[#373636]">
                                                            <div className="flex flex-col justify-between gap-2 w-full h-full p-3 py-5 ">

                                                                <div className='flex items-center justify-start gap-4'>
                                                                    <img src='/spaces-img/image7.svg' className='object-cover rounded-full h-14 w-14 '/>
                                                                    <span className='text-lg'>Lets go on</span>
                                                                </div>
                                                        
                                                                <div className=''>
                                                                    
                                                                    <p className="text-[#8F8F8F]">Dynasty of a starter for things all being equal in a matter of space...</p>
                                                                </div>

                                                                <Link href="/spaces/2" className='button1 py-2 px-6 w-full text-center rounded-full'>
                                                                    Join
                                                                </Link>
                                                                
                                                            </div>
                                                        
                                                        </div>
                                                    </div>
                                                    <div className='flip h-full'>
                                                        <div className="flex items-center text-sm w-full border border-[#545252] rounded-md front ">
                                                            <div className="flex rounded-md items-center flex-col justify-center gap-4 w-full p-3 py-5 bg-[#373636]">

                                                                <div className='h-20 w-20'>
                                                                    <img src='/spaces-img/image8.svg' className='w-full object-cover rounded-full  '/>
                                                                </div>
                                                        
                                                                <div className=' mt-2'>
                                                                    
                                                                    <h4 className='mb-1'>Lets go on</h4>
                                                                    <p className="text-[#8F8F8F]">Arts, Grant</p>
                                                                    <p className="text-[#8F8F8F]">5k Members</p>
                                                                </div>
                                                                
                                                            </div>
                                                        
                                                        </div> 
                                                        <div className="flex items-center text-sm w-full border border-[#545252] rounded-md back bg-[#373636]">
                                                            <div className="flex flex-col justify-between gap-2 w-full h-full p-3 py-5 ">

                                                                <div className='flex items-center justify-start gap-4'>
                                                                    <img src='/spaces-img/image8.svg' className='object-cover rounded-full h-14 w-14 '/>
                                                                    <span className='text-lg'>Lets go on</span>
                                                                </div>
                                                        
                                                                <div className=''>
                                                                    
                                                                    <p className="text-[#8F8F8F]">Dynasty of a starter for things all being equal in a matter of space...</p>
                                                                </div>

                                                                <Link href="/spaces/2" className='button1 py-2 px-6 w-full text-center rounded-full'>
                                                                    Join
                                                                </Link>
                                                                
                                                            </div>
                                                        
                                                        </div>
                                                    </div>
                                                    <div className='flip h-full'>
                                                        <div className="flex items-center text-sm w-full border border-[#545252] rounded-md front ">
                                                            <div className="flex rounded-md items-center flex-col justify-center gap-4 w-full p-3 py-5 bg-[#373636]">

                                                                <div className='h-20 w-20'>
                                                                    <img src='/spaces-img/image9.svg' className='w-full object-cover rounded-full  '/>
                                                                </div>
                                                        
                                                                <div className=' mt-2'>
                                                                    
                                                                    <h4 className='mb-1'>Lets go on</h4>
                                                                    <p className="text-[#8F8F8F]">Arts, Grant</p>
                                                                    <p className="text-[#8F8F8F]">5k Members</p>
                                                                </div>
                                                                
                                                            </div>
                                                        
                                                        </div> 
                                                        <div className="flex items-center text-sm w-full border border-[#545252] rounded-md back bg-[#373636]">
                                                            <div className="flex flex-col justify-between gap-2 w-full h-full p-3 py-5 ">

                                                                <div className='flex items-center justify-start gap-4'>
                                                                    <img src='/spaces-img/image9.svg' className='object-cover rounded-full h-14 w-14 '/>
                                                                    <span className='text-lg'>Lets go on</span>
                                                                </div>
                                                        
                                                                <div className=''>
                                                                    
                                                                    <p className="text-[#8F8F8F]">Dynasty of a starter for things all being equal in a matter of space...</p>
                                                                </div>

                                                                <Link href="/spaces/2" className='button1 py-2 px-6 w-full text-center rounded-full'>
                                                                    Join
                                                                </Link>
                                                                
                                                            </div>
                                                        
                                                        </div>
                                                    </div>

                                                
                                                
                                                
                                                
                                                
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

export default Spaces