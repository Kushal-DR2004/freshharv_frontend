
import RatingComponent from "./RatingComponent";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import axios from "axios";

interface ReviewUser {
  id: number;
  username: string;
  image: string | null;
}

interface Review {
  id: number;
  rating: string;
  description: string;
  date: string;
  user: ReviewUser;
  likes: any[];   
  unlikes: any[]; 
}

interface CustemerReviewsProps {
  review: Review;
  fetchProducts : () => void;
}



const CustemerReviews = ({review , fetchProducts} : CustemerReviewsProps)  => {

  const {id ,rating , description , date , user , likes , unlikes } : Review = review;

  

    const handleLIkes = async () => {
        const token = localStorage.getItem('token');
        try{
            const response = await axios.post(
                `http://127.0.0.1:8000/api/v1/products/reviews/${id}/like/`,{},
                 {
                    headers: {
                    Authorization: `Bearer ${token}`,
                   
                    },
                }
                );
                fetchProducts();
               
            }catch(e : any){

            }
         }

  

  const handleDislikes = async () => {

    const token = localStorage.getItem('token');

      try{
          const response = await axios.post(
                `http://127.0.0.1:8000/api/v1/products/reviews/${id}/unlike/`,{},
                 {
                    headers: {
                    Authorization: `Bearer ${token}`,
                   
                    },
                }
              );
            fetchProducts();
               
          }catch(e : any){

        }
    }

  

  let like = 0;
  let unlike = 0;

  likes.forEach(()=> { like++ });
  unlikes.forEach( () => {unlike++});
  return (
    <div className="flex flex-col gap-3">
        <div className="flex gap-3">
            <div className="w-11">
                <img className="object-cover   rounded-full " src='/image7.png' alt="A"></img>
            </div>
             <div className="">
                <p className="fond-medium text-4 text-[#121712]">{user.username}</p>
                <p className="fond-medium text-4 text-[#708763]">{date}</p>
            </div>
        </div>
        <div>
            <RatingComponent rating={rating}/>
        </div>
        <div className="font-medium text-4 text-[#121712] pr-4">
            {description}
        </div>
        <div className="flex gap-8">
            <div className="flex gap-2">
                <AiOutlineLike className="w-4 h-4 mt-1" onClick={handleLIkes} />
                <p>{like}</p>
            </div>
            <div className="flex gap-2">
                <AiOutlineDislike className="w-4 h-4 mt-1" onClick={handleDislikes} />
                <p>{unlike}</p>
            </div>
        </div>
    </div>
  )
}


export default CustemerReviews