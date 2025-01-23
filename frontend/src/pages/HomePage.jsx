import React, { useState } from 'react'
import Navbar from "../components/Navbar";

const HomePage = () => {
  const [selectedUser] = useState(null);
  return (
    <div>
      <Navbar />
      Home
    </div>
  )
}

export default HomePage;
