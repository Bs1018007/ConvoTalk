import React, { useState } from 'react'
import Navbar from "../components/Navbar";
import { ChatStore } from '../store/ChatStore';
import Sidebar from '../components/SideBar';
import UnSelectedChat from '../components/UnSelectedChat';
import ChatContainer from '../components/ChatContainer';


const HomePage = () => {
  const {selectedUser} = ChatStore();

  return (
    <div className='h-screen bg-base-200'>
      <div className='flex items-center justify-center pt-20 px-4'>
        <div className='bg-base-100 rounded-lg shawdow-cl w-full max-w-3xl'>
          <div className='flex h-full rounded-lg overflow-hidden'>
            <Sidebar />
            {!selectedUser ? <UnSelectedChat /> : <ChatContainer />}
          </div>
        </div>

      </div>
      <Navbar />
    
    </div>
  )
}

export default HomePage;
