import React from 'react'
import UserRemoveIcon from '../../Icons/UserRemoveIcon'

const StepTwo = ({handleClick, currentStep, steps}) => {
  return (
    <>
         <div className='fade-in'>
                <form>
                    <div className='flex items-center justify-between'>
                         <label className="">Set up Controller address</label>
                    
                         <label><input type="checkbox" className="text-sm text-gray-300" /> Use address in this account</label>
                    
                    </div>
                   <p className="text-sm text-gray-300 my-3">
                    The user account with control over the space&apos;s settings is
                    the space controller.
                    </p>
                    <div className="mt-1 relative rounded-full flex-1 bg-transparent items-center grow flex h-14 w-full  ">
                                <div className="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none h-full">
                                <span className="text-gray-500 px-3 w-14 h-14">
                                    <img src="/spaces-img/image3.svg" className="w-full h-full" />
                                </span>
                                </div>
                                <input
                                placeholder="Paste URL"
                                type="text"
                                name="github_address"
                                id="github_address" 
                                defaultValue="0x6tRtdgji7644780bxsdgi098rewwdgi09986hgdwq4t7v223"
                                className="  py-2 block w-full pl-16 pr-7  sm:text-sm rounded-full h-full focus:outline-none bg-transparent border border-[#545252] transition ease-in duration-200 text-[#A4A1A1]"
                                />
                            </div>

                    <div className="border my-7 px-4 py-8 border-[#545252] rounded-md">
                        <p className="text-lg">Add Partners</p>
                        <p className="text-sm text-gray-300 mb-6">
                            They would be able to manage this space and create proposals
                        </p>

                        <label className="text-sm text-gray-300">Address</label>
                        <br />
                        <div className='flex flex-col gap-6'>
                            <div className="flex">
                                <input
                                type="text"
                                defaultValue="0x6tRtdgji7644780bxsdgi098rewwdgi09986hgdwq4t7v223"
                                className="bg-transparent border w-3/4 h-12 border-[#545252]  focus:outline-none rounded-3xl px-4  py-3 text-sm"
                                />
                                <button className="rounded-full text-pin border border-[#CF95F2] h-12 p-4  mx-4 text-sm">
                                <UserRemoveIcon />
                                </button>
                            </div>
                            <div className="flex">
                                <input
                                type="text"
                                placeholder=" 0x6tRtdgji7644780bxsdgi098rewwdgi09986hgdwq4t7v223"
                                className="bg-transparent border w-3/4 h-12 border-[#545252]  focus:outline-none rounded-3xl px-4  py-3 text-sm"
                                />
                                <button className="rounded-3xl text-pin border border-pin h-12 px-4 py-3  mx-4 text-sm">
                                Add Partner
                                </button>
                            </div>
                        </div>
                        
                    </div>
                    <div className="border my-7 px-4 py-8 border-[#545252] rounded-md">
                        <p className=" text-lg">Add Creators</p>
                        <p className="text-sm text-gray-300 mb-6">
                        They would always be able to create proposals
                        </p>

                        <label className="text-sm text-gray-300">Address</label>
                        <br />
                        <div className="flex">
                            <input
                            type="text"
                            placeholder=" 0x6tRtdgji7644780bxsdgi098rewwdgi09986hgdwq4t7v223"
                            className="bg-transparent border w-3/4 h-12 border-[#545252] text-sm focus:outline-none rounded-3xl px-4  py-3"
                            />
                            <button className="rounded-3xl text-pin border border-pin h-12 px-4 py-3 text-sm mx-4">
                            Add Partner
                            </button>
                        </div>
                    
                    </div>
                </form>
                <button className="button1 button1 h-12 w-full m-auto rounded-3xl" onClick={()=>handleClick("next")}>
                    Next
                </button>
        </div>

    </>
  )
}

export default StepTwo