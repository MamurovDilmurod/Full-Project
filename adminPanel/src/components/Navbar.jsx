import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({ setToken }) => {
  return (
    <div className='flex justify-between items-center py-2 px-[4%]'>
      <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />
      <button 
        onClick={() => setToken('')} 
        className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm 
                   transition-all duration-200 ease-in-out 
                   hover:bg-gray-700 hover:scale-105 
                   active:bg-gray-800 active:scale-95 
                   focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2'
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar
