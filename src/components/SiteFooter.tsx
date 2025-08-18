
const SiteFooter = () => {
  return (
    <footer className="px-[160px] w-[1280px] h-[200px] ">
        <div className="h-[200px] w-[960px] py-[40px] px-[20px] flex flex-col gap-[24px]">
            <div className="flex justify-between px-[20px]">
                <a className="text-[#708763] font-normal text-[16px] w-[160px] h-[24px] text-center
                ">About Us</a>
                <a className="text-[#708763] font-normal text-[16px] w-[160px] h-[24px] text-center">Contact</a>
                <a className="text-[#708763] font-normal text-[16px] w-[160px] h-[24px] text-center">Privacy Policy</a>
                <a className="text-[#708763] font-normal text-[16px] w-[160px] h-[24px] text-center">Term Of Service</a>
            </div>
            <div className='w-[920px] h-[24px] flex gap-[16px] justify-center'>
                <div className='w-[24px] h-[24px]'>
                    <img src="/image2.png" alt='aa' className='object-cover'></img>
                </div>
                <div className='w-[24px] h-[24px]'>
                    <img src="/image3.png" alt='aa' className='object-cover'></img>
                </div>
                <div className='w-[24px] h-[24px]'>
                    <img src="/image4.png" alt='aa' className='object-cover'></img>
                </div>
            </div>
            <p className="h-[24px] text-[#708763] text-center px-[20px]">@2024 freshHarvest .All rights reserved</p>
        </div>

    </footer>
  )
}

export default SiteFooter