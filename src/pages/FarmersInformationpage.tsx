import { useState , useEffect} from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import { NavLink } from "react-router-dom";

interface Product {
  id : number;
  product_name : string,
  image : string;
  product_price : string
}

interface Farm {
  id : number;
  farm_name : string;
  about : string;
  location:string;
  farm_products : Product[]
}

interface Farmer {
  id : number;
  farmer_name : string;
  about : string;
  ph_no : number;
  location : string;
  image : string
  farm : Farm[]
}

const FarmersInformation = () => {

  const fetchFarmer = async () => {
    try {
        const token = localStorage.getItem('token');

        if(!token){
            
            return;
        }
        
       console.log('hiii')
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/farmers/${num.id}` ,  {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
        //console.log(response)
       
        //console.log(response.data)
        setFarmer(response.data);
       
        
      } catch (error : any) {

       
      }
  }

  const [farmer , setFarmer] = useState<Farmer>();


  useEffect(()=>{
     fetchFarmer()
  } , [])

  const num = useParams();
  return (
    <div className='rounded-lg p-6 bg-white shadow-lg border border-gray-200 '>
        <div className="flex justify-center p-2">
            <img className='w-1/4 h-1/4' src='/image6.png' alt='image'></img>
        </div>
        <div className="text-center">
          <h2 className="font-bold text-2xl text-gray-900">{farmer?.farmer_name}</h2>
          <p className="font-medium text-4 text-[#708763]">{farmer?.location}</p>
        </div>
        <div className="text-center my-2 border-t mb-4">
            <h2 className="text-center font-bold text-2xl text-gray-900">{farmer?.farm?.[0].farm_name} - <span className="font-medium text-lg text-[#708763]">{farmer?.farm?.[0].location}</span></h2>
            <p className="font-medium text-4 text-gray-900 p-2">{farmer?.farm?.[0].about}</p>
        </div>
        <h2 className="font-bold text-2xl text-gray-900">Products</h2>
        {farmer?.farm?.[0].farm_products.map((product) => (
        <NavLink to={`/products/${product.id}`}>  <div className="flex gap-3 rounded-lg p-6 bg-white shadow-lg border border-gray-200 w-1/2 m-6">
          <div className="w-1/4 h-1/4">
            <img className="w-3/5 h-3/5" src={product.image}></img>

          </div>
          <div>
            <h2 className="font-bold text-lg text-gray-900">{product.product_name}</h2>
            <p className="font-bold text-lg text-[#708763]">{`Rs ${product.product_price}`}</p>
          </div>
        </div>
        </NavLink>  ))}
        
        

    </div>
  )
}

export default FarmersInformation