
import { NavLink } from 'react-router-dom'
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { IoHeartOutline } from "react-icons/io5";
import { useState } from 'react';
import { useRef } from 'react';


const HomeNavbar = () => {

    const navigate = useNavigate();
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const cartbuttonRef = useRef<HTMLButtonElement | null>(null);


  return (
    <nav className="w-[1280px] mx-auto px-[40px] border-b border-b-[#E5E8EB] sticky top-[0px] bg-white z-50 flex justify-between sm:px[10px]">
        <div className="w-[395px] h-[23px] flex gap-[32px]  my-[20.5px]">
           <div className="w-[156px] h-[23px] flex gap-[16px] items-center">
               <div className='w-[16px] h-[16px] my-[3.5px]'>
                 <img src="/image.png" alt='aa'/>
            </div>
               <div className="font-bold text-[#121712] text-[18px]">FreshHarvest</div>
           </div>
           <div className=" h-[21px] flex gap-[36px]">
               <NavLink to="/products" className="font-medium text-[14px] focus:border-b">Shop</NavLink>
               <NavLink to="#" className="font-medium text-[14px] focus:border-b">About</NavLink>
               <NavLink to="/farmers" className="font-medium text-[14px] w-[85px] h-[21px] focus:border-b">Our farmers</NavLink>
               <NavLink to="/orderhistory" className="font-medium text-[14px] focus:border-b">Orders</NavLink>
               <NavLink to="#" className="font-medium text-[14px] focus:border-b">Contact</NavLink>
           </div>
        </div>
        <div className="h-[40px] flex gap-[32px] my-[12px]">
            <div className={`flex bg-[#F2F5F0] rounded-[8px] ${isFocused ? 'border border-[#708763]' : ''}`}>
                <div className="w-[40px] h-[40px] pl-[16px] py-[8px]">
                    <IoSearchOutline className='w-[24px] h-[24px] text-[#708763]' />
                </div>
                <div>
                    <input type="text" placeholder="Search" className={`py-1 pl-[8px] pr-4 w-[120px] h-[38px] bg-[#F2F5F0] outline-none rounded-[8px] `}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}/>
                </div>
            </div>
            <div className="w-[132px] h-[40px] flex gap-[8px]">
                <button className="w-[84px] h-[40px] px-[26px] py-[9.5px] bg-[#F2F5F0] font-bold text-[14px] rounded-[8px] cursor-pointer hover:bg-gray-200 focus:border"
                 ref = {cartbuttonRef}
                 onClick={()=>{navigate("cart");
                                setTimeout(() => {
                                    cartbuttonRef.current?.blur();
                                } , 200)
                            }}>Cart</button>
                <div className="w-[40px] h-[40px] px-[10px] bg-[#F2F5F0] p-[10px] rounded-[8px]">
                    <IoHeartOutline className='w-[20px] h-[20px] text-[#121712] font-bold' />
                </div>
            </div>
            <div className="w-[40px] h-[40px]">
                <img src="/image7.png" alt="AA" className="rounded-full object-cover"></img>
            </div>
        </div>
    </nav>
  )
}

export default HomeNavbar