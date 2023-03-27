import React, { useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import Sidebar from '../components/Layout/Sidebar'
import Link from 'next/link'
import { useState } from 'react'
import StepOne from '../components/FormComponents/formsteps/StepOne'
import StepTwo from '../components/FormComponents/formsteps/StepTwo'
import StepThree from '../components/FormComponents/formsteps/StepThree'
import { UseContextProvider } from '../components/contexts/NavigationContext'
import ReturnIcon from '../components/Icons/ReturnIcon'
import FormStepper from '../components/FormComponents/formsteps/FormStepper'
import useSigner from '../components/hooks/useSigner'

const CreateSpace = () => {
  // const [connectWallet, setConnectWallet] = useState()
  const [currentStep, setCurrentStep] = useState(1)
  const [startForm, setStartForm] = useState(false)
  const [user, signer, provider, setUser, login] = useSigner()
  const [data, setData] = useState()

  // const toggleConnectWalletModal = (e) => {
  //   e.preventDefault()
  //   setConnectWallet(!connectWallet)
  // }

  const createSpace = async () => {
    let user
    try {
      user = await signer.login()
    } catch (error) {
      alert(error.message)
      return false
    }
    setUser(user)
    setData({
      ...data,
      controller: user?.address,
      admins: [],
      authors: [],
      public_key: user?.publicKey,
      socials: { twitter: '', discord: '', github: '' },
      settings: {
        erc20Balance: {
          symbol: '',
          address: '',
          decimals: 2,
        },
      },
    })

    setStartForm(true)
  }

  const steps = [1, 2, 3]

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return (
          <StepOne
            key={1}
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
            data={data}
            setData={setData}
          />
        )
      case 2:
        return (
          <StepTwo
            key={2}
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
            data={data}
            setData={setData}
          />
        )
      case 3:
        return (
          <StepThree
            key={3}
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
            data={data}
            setData={setData}
            signer={signer}
          />
        )
      //   case 4:
      //     return <Final />;
      default:
    }
  }

  const handleClick = (direction, formData = {}) => {
    console.log('handle click: passed', formData)
    console.log('handle click: before', data)
    let newStep = currentStep

    setData({ ...data, ...formData })

    console.log('handle click: after', data)

    direction === 'next' ? newStep++ : newStep--
    // check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep)
  }

  // const handleConnectWallet = () => {
  //   setConnectWallet(false)
  //   setStartForm(true)
  // }

  return (
    <div>
      {/* first page connect wallet */}
      <Layout user={user}>
        <div className=" w-full lg:w-4/6">
          {startForm && (
            <div className="flex items-center justify-between my-5 py-3 transition duration-200 ease-in-out">
              <div>
                {currentStep === 1 ? (
                  ''
                ) : (
                  <button
                    className="flex items-center bg-[#3F3F3F] gap-2 px-6 py-4 rounded-full"
                    onClick={() => handleClick('back', {})}
                  >
                    <ReturnIcon /> Back
                  </button>
                )}
              </div>
              <div className="w-4/12 transition duration-200 ease-in-out mr-5">
                <FormStepper steps={steps} currentStep={currentStep} />
              </div>
            </div>
          )}

          {!startForm && (
            <div className=" pl-0 lg:pl-10">
              <h2 className="text-2xl font-bold my-4">Create a Space</h2>
              <p className="text-sm font-thin text-gray-300 mb-4 ">
                WavesDaos is bringing off-chain voting to the Waves DAO ecosystem by building with the design patterns
                used by popular DAO systems. <br />
                Create your own space right away and begin making choices!
              </p>
              <div className="m-auto  text-centers">
                {/* <img src="/no-money-in-wallet.svg" className="m-auto" />
                <p className="text-center m-4 text-gray-300 text-sm">
                  Connect waves excahnge wallet to begin making decisions
                </p> */}
                <button className="button1 h-12 w-4/5 m-autos rounded-3xl" onClick={createSpace}>
                  Create Space
                </button>
              </div>
            </div>
          )}

          {startForm && (
            <div>
              <div className=" px-3 lg:px-10 py-6">
                <h2 className="text-2xl font-bold my-4">Create a Space</h2>

                <UseContextProvider>{displayStep(currentStep)}</UseContextProvider>
              </div>
            </div>
          )}

          {/* Modal Boxes */}

          {/* <div className={`modal__box ${connectWallet ? 'show' : ''}`}>
            <div className="modal__box-wrapper shadow-lg rounded-2xl">
              <div className="flex items-start justify-between mb-6">
                <div className="grow">
                  <h1 className="text-2xl font-semibold mb-3">Connect Wallet</h1>
                </div>

                <button className=" flex items-center absolute top-3 right-2  " onClick={() => setConnectWallet(false)}>
                  <span className="pointer-events-none flex items-center p-2">
                    <svg className="h-5 w-5 " viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M15 5L5 15M5 5L15 15"
                        stroke="currentColor"
                        strokeWidth="1.67"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>

              <div className="flex flex-col gap-4 mt-5 w-full">
                <button
                  className="px-9 py-3 border border-[#545252] bg-[#3F3F3F] text-white rounded-full flex items-center justify-start gap-5"
                  type="button"
                  onClick={handleConnectWallet}
                >
                  <img src="/Image.svg" /> Metamask
                </button>

                <button
                  className="px-9 py-3 border border-[#545252] bg-[#3F3F3F] text-white rounded-full flex items-center justify-start gap-5"
                  type="button"
                >
                  <img src="/image 1.svg" /> Keeper
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </Layout>
    </div>
  )
}

export default CreateSpace
