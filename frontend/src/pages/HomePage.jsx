import React, { useState } from 'react'
import Navbar from "../components/Navbar";

const HomePage = () => {
  const [selectedUser,setselectedUser] = useState(null);
  const [] = useState(null);
  return (
    <div>
      <Navbar />
      <div className='h-screen grid lg:grid-cols-3'>
        <div className="flex items-center justify-center bg-gradient-to-r from-bl-700 to-purple-500">
          <div className="text-3xl text-white font-bold">
            
          </div>
        </div>

        
      </div>
    </div>
  )
}

export default HomePage;
