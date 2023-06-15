import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { HomeOutlined, BarcodeOutlined, HeartOutlined, UserOutlined } from '@ant-design/icons';

const BottomNavigationBar = () => {
  const [activeTab, setActiveTab] = useState('Home');
let navigate=useNavigate()
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // Navigate to the corresponding section
    navigate(`/${tab.toLowerCase()}`);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow">
      <nav className="flex justify-around py-2">
        <button
          className={`flex flex-col items-center focus:outline-none ${
            activeTab === 'Home' ? 'text-white' : 'text-[#1A947A]'
          }`}
          onClick={() => handleTabClick('Home')}
        >
          <div
           className={`rounded-full items-center justify-center flex flex-col w-24 h-16 mb-1 ${
            activeTab === 'Home' ? 'bg-[#1A947A]' : ''
          }`}
          >
          <HomeOutlined className="text-xl" />
          {activeTab === 'Home' && <span className="text-xs">Home</span>}</div>
        </button>

        <button
          className={`flex flex-col items-center focus:outline-none ${
            activeTab === 'Scan' ? 'text-white' : 'text-[#1A947A]'
          }`}
          onClick={() => handleTabClick('Scan')}
        >
          <div
            className={`rounded-full items-center justify-center flex flex-col w-24 h-16 mb-1 ${
              activeTab === 'Scan' ? 'bg-[#1A947A]' : ''
            }`}
          >
          <BarcodeOutlined className={"text-xl"} />
          {activeTab === 'Scan' && <span className="text-xs">Scan</span>}
          </div>
        </button>

        <button
          className={`flex flex-col items-center focus:outline-none ${
            activeTab === 'Health Tips' ? 'text-white' : 'text-[#1A947A]'
          }`}
          onClick={() => handleTabClick('Health Tips')}
        >
          <div
            className={`rounded-full items-center justify-center flex flex-col w-24 h-16 mb-1 ${
                activeTab === 'Health Tips' ? 'bg-[#1A947A]' : ''
              }`}
          >
          <HeartOutlined className="text-xl" />
          {activeTab === 'Health Tips' && <span className="text-xs">Health Tips</span>}</div>
        </button>

        <button
          className={`flex flex-col items-center focus:outline-none ${
            activeTab === 'Profile' ? 'text-white' : 'text-[#1A947A]'
          }`}
          onClick={() => handleTabClick('Profile')}
        >
          <div
           className={`rounded-full items-center justify-center flex flex-col w-24 h-16 mb-1 ${
            activeTab === 'Profile' ? 'bg-[#1A947A]' : ''
          }`}
          >
          <UserOutlined className="text-xl" />
          {activeTab === 'Profile' && <span className="text-xs">Profile</span>}</div>
        </button>
      </nav>
    </div>
  );
};

export default BottomNavigationBar;
