
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

interface OrderState {
  id?: number;
  product?: string;
  address?: string;
  totalprice? : string
}


const OrderConfirmationPage = () => {


    const location = useLocation();
    const navigate = useNavigate()

   const state = location.state as OrderState || {};
   const { id, product, address , totalprice } = state;

   const date = new Date();
  date.setDate(date.getDate() + 3); 

   const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const formattedDate = date.toLocaleDateString('en-US', options).replace(',' , '');
 
  return (
    <div className='py-5 px-[12.5%]'>
        <h1 className='pt-5 pb-3  font-bold text-[28px] text-[#121712] text-center'>Order Confirmed!</h1>
        <div className='pt-1 pb-3'>
            <p className='font-medium text-4 text-[#121712] text-center'>Your order has been successfully placed. You'll receive an email confirmation shortly with all the details.</p>
        </div>
        <h1 className='p-4 pb-2 font-bold text-xl text-[#121712]'>Order Summary</h1>
        <div className='p-4 flex flex-col gap-6'>
            <div className='flex gap-6'>
                <div className='py-3 border-t border-[#E5E8EB] w-2/11'>
                    <p className='font-medium text-[14px] text-[#708763]'>Order Number</p>
                    <p className='font-medium text-[14px] text-[#121712]'>{id}</p>
                </div>
                <div className='py-3 border-t border-[#E5E8EB] w-9/11'>
                    <p className='font-medium text-[14px] text-[#708763]'>Items Purchased</p>
                    <p className='font-medium text-[14px] text-[#121712]'>{product}</p>
                </div>
            </div>
            <div className='flex gap-6'>
                <div className='py-3 border-t border-[#E5E8EB] w-2/11'>
                    <p className='font-medium text-[14px] text-[#708763]'>Total Amount</p>
                    <p className='font-medium text-[14px] text-[#121712]'>{totalprice}</p>
                </div>
                <div className='py-3 border-t border-[#E5E8EB] w-9/11'>
                    <p className='font-medium text-[14px] text-[#708763]'>Delivery Address</p>
                    <p className='font-medium text-[14px] text-[#121712]'>{address}</p>
                </div>
            </div>
            <div className='flex gap-6'>
                <div className='py-3 border-t border-[#E5E8EB] w-2/11'>
                    <p className='font-medium text-[14px] text-[#708763]'>Estimated Delivery</p>
                    <p className='font-medium text-[14px] text-[#121712]'>{formattedDate}</p>
                </div>    
            </div>
            <div className='pt-1 py-4 pb-3'>
                <p className='font-medium  text-[#121712] text-center'>Thank you for supporting local farmers! We're excited for you to enjoy the freshest produce.</p>
            </div>
            <div className='py-3 px-4 flex justify-center'>
                <button className='px-4 py-2 rounded-lg bg-[#4AB814] font-bold text-[#121712]' onClick={() => navigate('/orderhistory')}>View Order Details</button>
            </div>
            <p className='text-center font-medium text-[#708763]'>For any questions, please contact us at support@freshharvest.com</p>
        </div>
    </div>
  )
}

export default OrderConfirmationPage