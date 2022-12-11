import React from 'react'
import ReturnIcon from '../../../components/Icons/ReturnIcon'
import Layout from '../../../components/Layout/Layout'
import { useRouter } from 'next/router';
import DropdownIcon from '../../../components/Icons/DropdownIcon';


const CreateProposals = () => {
    const router = useRouter();
    const goBack =()=>{
        router.back();
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
                    <div className='flex-1 w-full mb-5'>
                        <h3  className='section__header'>Create Proposals</h3>
                    </div>

                    <div className='mt-5 w-full lg:w-8/12'>
                        <div className='space-y-5 py-6 '>

                                <div className='flex flex-col gap-2'>
                                    <label className='text-sm text-[#E6E5E5]'>Title of Proposal</label>
                                    <div className='space-x-4'>
                                        <input type="text" className='w-full h-12 rounded-full bg-transparent text-[#8F8F8F] border border-[#3F3F3F] px-4 focus:border-[#8F8F8F] active:border-[#8F8F8F] focus:outline-none transition duration-150 ease-in-out' />
                                    </div>
                                </div>
                                
                                <div>
                                    <div className='flex items-center justify-between mb-3'>
                                        <label className='flex flex-col gap-3 text-sm text-[#E6E5E5]'>Description of space</label>

                                        <span className='text-sm text-[#E6E5E5]'>0/2000 characters</span>
                                    </div>
                                    
                                    <textarea className="w-full border border-[#545252] focus:outline-none active:outline-none p-3  placeholder-text-primary bg-transparent rounded-lg textarea placeholder-text-sm text-[#8F8F8F] scrollbar-change" aria-placeholder="Leave a note for your client" rows="6" id="description" defaultValue="Nulla interdum odio lectus quis donec nulla egestas lectus at. Risus sollicitudin venenatis vitae natoque ut netus. Sit sed a sagittis vel nibh viverra dui odio. Urna auctor mauris eu et pellentesque erat. Imperdiet dui viverra sit phasellus. ">
                                    
                                    </textarea>
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <label className='text-sm text-[#E6E5E5]'>Input Discussion URL (Optional)</label>
                                    <div className='space-x-4'>
                                        <input type="text" className='w-full h-12 rounded-full bg-transparent text-[#8F8F8F] border border-[#545252] px-4 focus:border-[#8F8F8F] active:border-[#8F8F8F] focus:outline-none transition duration-150 ease-in-out' />
                                    </div>
                                </div>

                                <div className='flex flex-col gap-2 py-4'>
                                    <h3 className='mb-5 text-sm text-[#E6E5E5]'>Voting Strategy</h3>
                                    

                                    <div className='space-y-8  w-full gap-5'>
                                        <div>
                                            <h4 className='mb-4 text-sm  text-[#E6E5E5]'>Type</h4>
                                            <div className='lg:space-x-4 flex flex-col md:flex-row w-full gap-5'>
                                        
                                       
                                                <div className="w-full lg:w-1/2">
                                                    <label className="px-4 py-6 border border-[#545252] text-white text-sm font-medium rounded-md flex items-start justify-start form-check gap-2 cursor-pointer">
                                                        <input type="radio" name="vehicle" className="w-7 h-7 text-red-600 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 bg-transparent"/>

                                                        <span className='flex items-start justify-start flex-col space-y-2'>
                                                            <h5 className=' text-[#E6E5E5] text-sm'>Basic voting</h5>
                                                            <p className='text-xs text-[#8F8F8F]'>These votings have three choices. For, Against and Abstain</p>
                                                        </span>
                                                    </label>
                                                    
                                                </div>
                                                <div className="w-full lg:w-1/2">

                                                    <div className="">
                                                        <label className="px-4 py-6 border border-[#545252] text-white text-sm font-medium rounded-md flex items-start justify-start form-check gap-2 cursor-pointer">
                                                            <input type="radio" name="vehicle" className="w-8 h-8 text-red-600 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200"/>

                                                            <span className='flex items-start justify-start flex-col space-y-2'>
                                                                <h5 className=' text-[#E6E5E5] text-sm'>Weighted voting</h5>
                                                                <p className='text-xs text-[#8F8F8F]'>Each voter has the ability to cast their votes across any number of options.</p>
                                                            </span>
                                                        </label>
                                                    </div>
                                                        
                                                </div>
                                                
                                            </div>
                                        </div>

                                        <div>
                                            <h4  className='mb-4 text-sm text-[#E6E5E5]'>Set Options</h4>
                                            <div className='space-y-4'>
                                                <div className='flex flex-row items-center gap-2'>
                                                    <label className='w-4/12 lg:w-2/12 text-sm text-[#8F8F8F]'>Option 1</label>
                                                    <div className='space-x-4 w-full lg:w-7/12 '>
                                                        <input type="text" className='w-full h-12 rounded-full bg-transparent text-[#8F8F8F] border border-[#545252] px-4 focus:border-[#8F8F8F] active:border-[#8F8F8F] focus:outline-none transition duration-150 ease-in-out' />
                                                    </div>
                                                </div>
                                                <div className='flex flex-row items-center gap-2'>
                                                    <label className='w-4/12 lg:w-2/12 text-sm text-[#8F8F8F]'>Option 2</label>
                                                    <div className='space-x-4 w-full lg:w-7/12'>
                                                        <input type="text" className='w-full h-12 rounded-full bg-transparent text-[#8F8F8F] border border-[#545252] px-4 focus:border-[#8F8F8F] active:border-[#8F8F8F] focus:outline-none transition duration-150 ease-in-out' />
                                                    </div>
                                                </div>
                                                <div className='flex flex-row items-center gap-2'>
                                                    <label className='w-4/12 lg:w-2/12 text-sm text-[#8F8F8F]'>Option 3</label>
                                                    <div className='space-x-4  w-full lg:w-7/12'>
                                                        <input type="text" className='w-full h-12 rounded-full bg-transparent text-[#8F8F8F] border border-[#545252] px-4 focus:border-[#8F8F8F] active:border-[#8F8F8F] focus:outline-none transition duration-150 ease-in-out' />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div>
                                            <h4  className='mb-4 text-sm  text-[#E6E5E5]'>Voting Duration</h4>
                                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-5'>
                                                <div className='flex flex-row items-center gap-2'>
                                                    <label className='w-3/12 text-sm text-[#8F8F8F]'>Begins</label>
                                                    <div className='space-x-4 w-9/12'>
                                                        <button className='flex items-center justify-end gap-2 h-12  px-4 py-4 w-full text-[#8F8F8F] border border-[#545252] rounded-full'>
                                                            <span className='flex items-center justify-between w-full text-xs'>
                                                            dd/mm/yyyy
                                                                <DropdownIcon/>
                                                            </span>
                                                            
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className='flex flex-row items-center gap-4'>
                                                    <label className='w-3/12 text-sm lg:text-right text-[#8F8F8F]'>Time</label>
                                                    <div className='space-x-4 w-9/12'>
                                                        <button className='flex items-center justify-end gap-2 h-12  px-4 py-4 w-full text-[#8F8F8F] border border-[#545252] rounded-full'>
                                                            <span className='flex items-center justify-end gap-3 w-full text-xs'>
                                                            am
                                                                <DropdownIcon/>
                                                            </span>
                                                            
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className='flex flex-row items-center gap-2'>
                                                    <label className='w-3/12 text-sm text-[#8F8F8F] '>Ends</label>
                                                    <div className='space-x-4 w-9/12'>
                                                        <button className='flex items-center justify-end gap-2 h-12  px-4 py-4 w-full text-[#8F8F8F] border border-[#545252] rounded-full'>
                                                            <span className='flex items-center justify-between w-full text-xs'>
                                                            dd/mm/yyyy
                                                                <DropdownIcon/>
                                                            </span>
                                                            
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className='flex flex-row items-center gap-4'>
                                                    <label className='w-3/12 text-sm lg:text-right text-[#8F8F8F]'>Time</label>
                                                    <div className='space-x-4 w-9/12'>
                                                        <button className='flex items-center justify-end gap-2 h-12  px-4 py-4 w-full text-[#8F8F8F] border border-[#545252] rounded-full'>
                                                            <span className='flex items-center justify-end gap-3 w-full text-xs'>
                                                            am
                                                                <DropdownIcon/>
                                                            </span>
                                                            
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        
                                    </div>
                                    
                                </div>
                                
                            </div>

                            <div className='w-full my-5 py-7'>
                                <button className='button1 px-7 py-3 flex justify-center items-center text-center gap-5 rounded-full w-full'>
                                Create Proposal
                                </button>
                            </div>

                        </div>




                </div>
            </div>
        </Layout>
    </div>
  )
}

export default CreateProposals