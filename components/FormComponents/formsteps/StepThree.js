import Link from 'next/link';
import React from 'react'
import { useState } from 'react'
import DropdownIcon from '../../Icons/DropdownIcon'

const StepThree = ({currentStep, steps}) => {
    const [makePublic, setMakePublic] = useState();
    const [congrats, setCongrats] = useState();


    const toggleMakePublic = (e) => {
        e.preventDefault();
        setMakePublic(!makePublic);
      };
    
      const toggleCongrats = (e) => {
        e.preventDefault();
        setMakePublic(false);
        setCongrats(!congrats);
      };
  return (
    <>
        <div className='fade-in'>

                <form>
                    <p className="mb-2">Proposal Settings</p>
                    <p className="text-sm text-gray-300 mb-6">
                    This directs voters on how to vote. You can always change it
                    later.
                    </p>
                    <label>Threshold</label>
                    <p className="text-sm text-gray-300">
                    Minimum Voting Power required to create a proposal
                    </p>
                    <input
                    type="text"
                    placeholder=""
                    className="bg-transparent border w-full h-12 border-[#545252]  rounded-3xl px-4 py-3  mb-10 focus:outline-none"
                    />
                    <br />
                    <label>Quorum</label>
                    <p className="text-sm text-gray-300">
                    Minimum number of votes necessary for a proposal to pass
                    </p>
                    <input
                    type="text"
                    placeholder=""
                    className="bg-transparent border w-full h-12 border-[#545252]  rounded-3xl px-4 py-3  mb-10 focus:outline-none"
                    />
                    <div className="flex">
                    <div>
                        <label>Voting Delay</label>
                        <p className="text-sm pr-6 text-gray-300">
                        This states how long voting can be delayed for
                        </p>
                        <input
                        type="text"
                        placeholder=""
                        className="bg-transparent border w-4/5 h-12 border-[#545252]  rounded-3xl px-4 py-3  mb-10 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label>Voting Period</label>
                        <p className="text-sm pr-6 text-gray-300">
                        This states how long voting can be held for{" "}
                        </p>
                        <input
                        type="text"
                        placeholder=""
                        className="bg-transparent border w-4/5 h-12 border-[#545252]  rounded-3xl px-4 py-3  mb-10 focus:outline-none"
                        />
                    </div>
                    </div>
                    <p className="mb-2">Add Treasury</p>
                    <p className="text-sm text-gray-300 mb-6">
                    This directs voters on how to vote. You can always change it
                    later..
                    </p>
                    <label>Network</label>
                    <br />
                    <input
                    type="text"
                    placeholder=""
                    className="bg-transparent border w-full h-12 border-[#545252]  rounded-3xl px-4 py-3 mb-10 focus:outline-none"
                    />
                    <br></br>
                    <label>Name</label>
                    <br />
                    <input
                    type="text"
                    placeholder=""
                    className="bg-transparent border w-full h-12 border-[#545252]  rounded-3xl px-4 py-3  mb-10 focus:outline-none"
                    />
                    <br />
                    <label>Address</label>
                    <br />
                    <input
                    type="text"
                    placeholder=""
                    className="bg-transparent border w-full h-12 border-[#545252]  rounded-3xl px-4 py-3 mb-10 focus:outline-none"
                    />
                    <br></br>
                    <div className="text-right">
                    <button className="rounded-3xl text-pin border border-pin h-12 px-4 py-3 text-sm mb-12  ">
                        Add Another
                    </button>
                    </div>
                    <button
                    className="button1 button1 h-12 w-full m-auto rounded-3xl"
                    onClick={toggleMakePublic}
                    >
                    Create Space
                    </button>
                </form>
        </div>


        {/* Make Public Modal */}
        <div className={`modal__box ${makePublic ? "show" : ""}`}>
          <div className="modal__box-wrapper shadow-lg rounded-2xl">
            <div className="flex items-start justify-between mb-6">
              <div className="grow">
                <h1 className="text-2xl font-semibold mb-3">
                  Do you want to make this space Public
                </h1>
              </div>

              <button
                className=" flex items-center absolute top-3 right-2  "
                onClick={() => setMakePublic(false)}
              >
                <span className="pointer-events-none flex items-center p-2">
                  <svg
                    className="h-5 w-5 "
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
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
                className="button1 px-9 py-3 border border-[#545252] bg-[#3F3F3F] text-white rounded-full flex items-center justify-center gap-5"
                onClick={toggleCongrats}
                type="button"
              >
                Yes
              </button>

              <button
                className=" px-9 py-3 border border-[#545252] bg-[#3F3F3F] text-white rounded-full flex items-center justify-center gap-5"
                onClick={toggleCongrats}
                type="button"
              >
                No
              </button>
            </div>
          </div>
        </div>
        {/* congrats modal */}

        <div className={`modal__box ${congrats ? "show" : ""}`}>
          <div className="modal__box-wrapper shadow-lg rounded-2xl text-center">
            <div className="flex items-start justify-between mb-6">
              <div className="grow">
                <h1 className="text-2xl font-semibold mb-3">Congratulations</h1>
                <p>Your space ( Lets go on) is live and public!!</p>
                <p className="text-sm font-thin text-gray-300">
                  You can now start creating proposals and invite others to your
                  space
                </p>
              </div>

              <button
                className=" flex items-center absolute top-3 right-2  "
                onClick={() => setCongrats(false)}
              >
                <span className="pointer-events-none flex items-center p-2">
                  <svg
                    className="h-5 w-5 "
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
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
              <Link href="/spaces" className="">
                {" "}
                <button
                  className="button1 m-auto px-9 py-3 border border-[#545252] bg-[#3F3F3F] text-white rounded-full flex items-center justify-start gap-5"
                  type="button"
                >
                  Go to Spaces
                </button>
              </Link>
            </div>
          </div>
        </div>
    </>
  )
}

export default StepThree