import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import ProductCard from '../components/ProductCard';
import SelectSearch from '../components/SelectSearch';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import type { SelectChangeEvent } from '@mui/material/Select';
import { useEffect } from 'react';
import axios from 'axios';
import ShimmerUi from '../components/ShimmerUi';


interface Product {
  id: number;
  product_name: string;
  farm_name: string;
  image: string;
}

const Productpage = () => {
    const navigate = useNavigate();

    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');

        if(!token){
            navigate('/login')
            return;
        }
        
        const url = search
        ? `http://127.0.0.1:8000/api/v1/products/productitems/?search=${search}`
        : `http://127.0.0.1:8000/api/v1/products/productitems/`;

        console.log(url)
       
        const response = await axios.get(url ,  {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
        
        //console.log(response)
        setProducts([...response.data]);
        //console.log(response.data)
       
        setLoading(false);
      } catch (error : any) {

        if (error.response && error.response.data) {
           const errorData = error.response.data;
           //setError(errorData);
           if(errorData.code ==  "token_not_valid"){
             navigate('/login')
           }
         } else {
          // setError('Something went wrong!' );
         }
        setLoading(false);
      }
    }; 

    
    const [selectedByOrganic , setSelectedByOrganic] = useState<string>('')
    const [selectedByPrice , setSelectedByPrice] = useState<string>('')
    const [selectedByProduct , setSelectedByProduct] = useState<string>('')

    const [search , setSearch] = useState<string>('');
    
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    //const [error, setError] = useState<string>('');
    const [isfocus , setIsFocus] = useState<boolean>(false)

    const handleChange = (e : React.ChangeEvent<HTMLInputElement> ) => {
        setSearch(e.target.value)
    }
    
    useEffect(() => {


      const handler = setTimeout(() => {
        fetchProducts();
      }, 500);

      return () => clearTimeout(handler);
        
        
    } , [search])

     

    const handleSelect = (e : SelectChangeEvent) : void => {

        const name = e.target.name;   
        const value = e.target.value; 
          switch (name) {
            case 'Organic':
                setSelectedByOrganic(value);
                console.log(selectedByOrganic)
                break;
            case 'Price Range':
                setSelectedByPrice(value);
                console.log(selectedByPrice)
                break;
            case 'Product Type':
                setSelectedByProduct(value);
                break;
            default:
                break;
        }
    }
    

  return (
    <main className="w-full py-[20px] 2xl:px-[288px]">
        <div className="">
           <div className="w-full  py-[12px] px-[16px]">
               <div className={`flex bg-[#F2F5F0] rounded-[8px] ${isfocus ? 'border border-[#708763]' : ''}`}>
                <div className="w-1/10 h-[48px] pl-[16px] py-[12px]">
                    <IoSearchOutline className='w-[24px] h-[24px] text-[#708763]' />
                </div>
                <div className='w-9/10'>
                    <input type="text" placeholder="Search for product and farms"
                     className="py-[8px] pl-[8px] pr-[16px] w-full h-[46px] bg-[#F2F5F0] rounded-[8px] outline-none"
                     value = {search}
                     onChange={handleChange}
                     onFocus={()=>setIsFocus(true)}
                     onBlur={()=>setIsFocus(false)}/>
                </div>
            </div>
           </div>

           <div className="h-[56px] p-[12px] flex gap-[12px]">
                <SelectSearch name='Organic' handleSelect={handleSelect} options={["Organic"]} value={selectedByOrganic}/>
                <SelectSearch name='Price Range' handleSelect={handleSelect} options={["100" , "200"]} value={selectedByPrice}/>
                <SelectSearch name='Product Type' handleSelect={handleSelect} options={["vegetable" , "Fruits"]} value={selectedByProduct}/>    
           </div>

           <div className="w-full min-h-[534px] p-[16px] grid grid-cols-3 gap-3 lg:grid-cols-4 xl:grid-cols-5">
               {loading ? [1,2,3,4,5,6].map(() => <ShimmerUi/>):
               products.map((item) =>(<NavLink to={`${item.id}`}> 
                        <ProductCard key={item.id}  name={item.product_name} image = {item.image} farm={item.farm_name}/>
                    </NavLink>))}
              
            </div>
        </div>

        <div className="w-full h-[37px] pt-[4px] pb-[8px] px-[16px] text-center font-normal text-[14px] text-[#708763]">
            Showing 1-6 of 12 product
        </div>
        

    </main>
  )
}

export default Productpage