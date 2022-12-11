import React, {useState} from 'react'

const StepOne = ({handleClick, currentStep, steps, data}) => {
  return (
    <>
        <div className='fade-in'>

            {/* 1 0f 3 Create a space */}

            
            <form>

                <div className='space-y-7'>

                
                    <div className='w-full'>
                        <label className="text-sm text-gray-300">Name of Space</label>
                        <input type="text"
                        placeholder="Lets go on"
                        className="bg-transparent border w-full text-sm h-12 border-[#545252] focus:outline-none  rounded-3xl p-3 text-[#A4A1A1]"
                        />
                    </div>

                    <div className='w-full'>
                        <label className="text-sm text-gray-300 ">
                            Description of Space
                        </label>
                        <input type="text" placeholder="Tell us about your space. What is it about?" className="bg-transparent border w-full h-12 border-[#545252] text-sm rounded-3xl px-4 py-3 text-[#A4A1A1] focus:outline-none "
                        />
                    </div>

                    <div>

                        <div className='w-full mb-3'>
                            <label className="text-sm text-gray-300">Select category</label>
                            <input type="text" placeholder="You can type in what category is your space?" className="bg-transparent border w-full h-12 border-[#545252] text-sm rounded-3xl p-3 mb-1 focus:outline-none  "
                            />
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                            <button className="bg-lyt  py-3 px-6 text-xs rounded-full">Art</button>
                            <button className="bg-lyt  py-3 px-6 text-xs rounded-full">Protocol</button>
                            <button className="bg-lyt  py-3 px-6 text-xs rounded-full">Social</button>
                            <button className="bg-lyt  py-3 px-6 text-xs rounded-full">Investment</button>
                            <button className="bg-lyt  py-3 px-6 text-xs rounded-full">Services</button>
                        </div>
                    </div>

                    <div>

                        <h4 className="text-sm ">Your Logo</h4>
                        <p className="text-sm text-gray-300 mb-4">This will be displayed on your profile.</p>
                        <div className="flex mb-6">
                            <div className="rounded-full mr-6 bg-lyt w-12 h-12 flex items-center justify-center">
                                <img className="border rounded" src="/gallery.svg" />
                            </div>
                            <div className="flex gap-3 items-center">
                                <button className=" text-sm text-gray-300 p-2">Delete</button>
                                <button className="text-purple-700 text-sm p-2">Update</button>
                            </div>
                            
                        </div>
                    </div>

                    <div className='w-full'>
                        <label className="text-sm text-gray-300">Websites</label>
                        <input type="text" placeholder="Paste URL of your website if any" className="bg-transparent border w-full h-12 border-[#545252]  rounded-3xl px-4 py-3 text-[#A4A1A1] text-sm focus:outline-none "
                        />
                    </div>

                    <div className='w-full'>
                        <label className="text-sm text-gray-300">Terms of service</label>
                        <input type="text" placeholder="Paste URL of your terms of service if any" className="bg-transparent border w-full h-12 border-[#545252]  rounded-3xl px-4 py-3 text-[#A4A1A1] text-sm focus:outline-none "
                        />
                        
                    </div>
                
                </div>



                <div className="border my-7 px-7 py-8 border-[#545252] rounded-md">
                    <h4 className="mb-5">Add Socials</h4>
                    <div className='space-y-6'>

                        <div>
                            <label className="text-sm text-gray-300">Github</label>
                            <br />
                            <div className="mt-1 relative rounded-full flex-1 bg-transparent items-center grow flex h-14 w-full  ">
                                <div className="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none h-full">
                                <span className="text-gray-500 px-3 w-22 h-22">
                                    <img src="/github.svg" className="w-full h-full" />
                                </span>
                                </div>
                                <input
                                placeholder="Paste URL"
                                type="text"
                                name="github_address"
                                id="github_address"
                                className="  py-2 block w-full pl-16 pr-7  sm:text-sm rounded-full h-full focus:outline-none bg-transparent border border-[#545252] transition ease-in duration-200 text-[#A4A1A1]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm text-gray-300">Twitter</label>
                            <br />
                            <div className="mt-1 relative rounded-full flex-1 bg-transparent items-center grow flex h-14 w-full  ">
                                <div className="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none h-full">
                                <span className="text-gray-500 px-3 w-22 h-22">
                                    <img src="/twitter.svg" className="w-full h-full" />
                                </span>
                                </div>
                                <input
                                placeholder="Paste URL"
                                type="text"
                                name="twitter_address"
                                id="twitter_address"
                                className="  py-2 block w-full pl-16 pr-7  text-sm rounded-full h-full focus:outline-none bg-transparent border border-[#545252] transition ease-in duration-200 text-[#A4A1A1]"
                                />
                            </div>

                        </div>

                        <div>
                            <label className="text-sm text-gray-300">Discord</label>
                            <div className="mt-1 relative rounded-full flex-1 bg-transparent items-center grow flex h-14 w-full  ">
                                <div className="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none h-full">
                                <span className="text-gray-500 px-3 w-22 h-22">
                                    <img src="/discord.svg" className="w-full h-full" />
                                </span>
                                </div>
                                <input
                                placeholder="Paste URL"
                                type="text"
                                name="discord_address"
                                id="discord_address"
                                className="  py-2 block w-full pl-16 pr-7  text-sm rounded-full h-full focus:outline-none bg-transparent border border-[#545252] transition ease-in duration-200 text-[#A4A1A1]"
                                />
                            </div>

                        </div>
                    </div>

                </div>
                <button
                    onClick={() => handleClick("next")}
                    className="button1 h-12 w-full m-auto rounded-3xl"
                    >
                    {currentStep === steps.length - 1 ? "Confirm" : "Next"}
                </button>


            </form>
        </div>





    </>
  )
}

export default StepOne