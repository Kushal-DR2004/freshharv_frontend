import { useState , useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export interface Product {
  id: number;
  product_name: string;
  product_price: string;
  image: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: number;
  order_date: string;
  status: string;
  total_price: string;
  delivered_date: string | null;
  delivered_address: string;
  discounted_price: string;
  items: OrderItem[];
}


const OrderHistory = () => {

    const navigate = useNavigate();

    const dateConverter = (arg : string) => {

        const date = new Date(arg);

        const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'long', // e.g., "July"
        day: 'numeric', // e.g., "24"
        year: 'numeric' // e.g., "2004"
        }).format(date).replace(',' ,'')

        return formattedDate;
    }

    const fetchOrders = async () => {
        try {
        const token = localStorage.getItem('token');

        if(!token){
            navigate('/login')
            return;
        }
        
        
        const response = await axios.get('http://127.0.0.1:8000/api/v1/carts/orders/' ,  {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
       
        SetOrders(response.data);
        
        
        const calculatedOrdered: string[] = [];
        response.data.forEach((order : any) => {
             const calculatedProducts: string[] = [];
             order.items.forEach((el : any) => {
                calculatedProducts.push(el.product.product_name);
             });
             console.log(calculatedProducts)
            calculatedOrdered.push(calculatedProducts.join(','))
        })
        console.log(calculatedOrdered)
       setitemList(calculatedOrdered);
       
      }catch(error : any){
          if (error.response && error.response.data) {
           const errorData = error.response.data;
          
           if(errorData.code ==  "token_not_valid"){
             navigate('/login')
           }
      }
    }
  }


    const [orders , SetOrders] = useState<Order[]>();
    const [itemList , setitemList] = useState<string[]>()

    useEffect(()=>{
        fetchOrders();
    } , [])

  return (
    <div className='w-full flex flex-col items-center'>
        <h1 className='p-5 font-bold text-3xl text-[#121712]'>Order History</h1>
        <table className='w-py-5 border border-[#DEE5DB] rounded-xl'>
            <thead>
                <tr className=''>
                    <td className='py-2 px-4 w-1/5 font-medium text-[#121712]'>Order Date</td>
                    <td className='py-2 px-4 w-1/5 font-medium text-[#121712]'>Order Number</td>
                    <td className='py-2 px-4 w-1/5 font-medium text-[#121712]'>Items</td>
                    <td className='py-2 px-4 w-1/5 font-medium text-[#121712]'>Total</td>
                    <td className='py-2 px-4 w-1/5 font-medium text-[#121712]'>Status</td>
                </tr>
            </thead>
            <tbody>
                {orders?.map((item , i) => (<tr className='border-t border-[#DEE5DB]'>
                                        <td className='p-4 w-1/5 font-medium text-[#708763] text-[14px]'>{dateConverter(item.order_date)}</td>
                                        <td className='p-4 w-1/5 font-medium text-[#708763] text-[14px]'>{`Order #${item?.id}`}</td>
                                        <td className='p-4 w-1/5 font-medium text-[#708763] text-[14px]'>{itemList ? itemList[i] : ''}</td>
                                        <td className='p-4 w-1/5 font-medium text-[#708763] text-[14px]'>{`Rs ${item.total_price}`}</td>
                                        <td className='p-4 w-1/5 font-medium text-[#708763] text-[14px]'><button className='px-4 py-2 rounded-lg bg-[#F2F5F0]'>{item.status}</button></td>
                                        </tr>))}
            </tbody>
        </table>
    </div>
  )
}

export default OrderHistory