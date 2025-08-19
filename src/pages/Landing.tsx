
import SingnupLoginButton from '../components/SingnupLoginButton'

const Landing = () => {
  return (
    <div className='w-[1280px] h-[553px] py-[20px] px-[160px]'>
        <div className='w-[960px] h-[512px] p-[16px]'>
            <div className="relative bg-[url('public/image1.png')] bg-cover bg-center h-[480px] w-[928px]">
                <div className='w-[896px] h-[116px]  mx-[16px] flex gap-[8px] flex-col'>
                    <h1 className='w-[896px] h-[60px] mt-[85px] font-bold text-[48px] text-[#FFFFFF] text-center'>Connect with Local Farmers</h1>
                    <p className='w-[896px] h-[48px] font-medium text-[17px] text-center text-[#FFFFFF]'>
                    Discover fresh, locally-sourced produce directly from the farm. Support your community and enjoy the taste of freshness
                   </p>
                   
               </div> 
               <div className='absolute top-[391px] left-[539px]'> 
                       <SingnupLoginButton th={48} gap={8} w={85} h={48}/>
                   </div>
               
            </div>
        </div>
    </div>
  )
}

export default Landing