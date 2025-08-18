import React from 'react'
import { NavLink } from 'react-router-dom'
import SingnupLoginButton from './SingnupLoginButton'

const LoginNavbar = () => {
  return (
    <nav className='max-w-[1280px] mx-auto h-[65px] px-[40px] border-b border-b-[#E5E8EB] py-[12px] flex '>
        <div className="flex items-center gap-4 w-1/4">
        <img src="/image.png" alt="Logo" className="w-4 h-4" />
        <span className="font-bold text-[#121712] text-lg">FreshHarvest</span>
      </div>
        <div className=' w-[1044px] flex gap-8 justify-end'>
          <div className=' w-[235px] flex gap-8 py-[9.5px] '>
              <NavLink to="#" className="font-medium text-[14px] text-[#121712]">About</NavLink>
              <NavLink to="/products" className="font-medium text-[14px] text-[#121712]">Products</NavLink>
              <NavLink to="#" className="font-medium text-[14px] text-[#121712]">Contacts</NavLink>
          </div>
          
          <SingnupLoginButton th={40} gap={8} w={85} h={40} />

        </div>

    </nav>
  )
}

export default LoginNavbar