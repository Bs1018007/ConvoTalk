import React, { useState } from 'react'
import Navbar from "../components/Navbar";

const HomePage = () => {
  const [selectedUser] = useState(null);
  return (
    <div>
      <Navbar />
      <div className='h-screen grid lg:grid-cols-2'>
        <div className='flex flex-col items-center justify-center px-6'>
          <div className='w-full max-w-md space-y-8'>
            <div className=''>
              <div className='flex flex-col items-center gap-2'>
                <h1 className='text-2xl font-bold bg-gradient-to-r from red-500 to marker:yellow-400'>Welcome to the Home Page</h1>
                <p className='text-gray-600'>This is the home page of the app</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default HomePage;
