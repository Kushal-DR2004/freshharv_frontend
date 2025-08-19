//import RatingComponent from "./RatingComponent";
import CustemerReviews from "./CustemerReviews";
import Compo from "./Compo";
import Badges from "./Badges";

import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IoMdSend } from "react-icons/io";

import { useRef } from "react";

interface Farmer {
  id: number;
  farmer_name: string;
  about: string;
  ph_no: number;
  location: string;
  image: string;
}

interface Farm {
  id: number;
  farm_name: string;
  about: string;
  location: string;
  farmer_id: Farmer;
}

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

interface FarmProduct {
  id: string;
  product_name: string;
  product_price: string;
  harvested_date: string;
  image: string;
  image2?: string;
  image3?: string;
  farm_id: Farm;
  reviews: Review[];
}

const ProductInformation = () => {
  const navigate = useNavigate();

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [product, setProduct] = useState<FarmProduct>();
  const [farm, setFarm] = useState<Farm>();
  const [farmaer, setFarmer] = useState<Farmer>();
  const [reviews, setReviews] = useState<Review[]>();
  const [reviewRating, setReviewRating] = useState<number[]>();
  const [totalreview, setTotalreview] = useState<number>();
  const [reviewcount, setReviewcount] = useState<number>();
  const [userreview, setUserreview] = useState<string>();
  const [rating, setRating] = useState<number>(1);

  const num = useParams();

  //handle the reviews
  const handleaddreview = async () => {
    if (rating > 0 && userreview != "") {
      const token = sessionStorage.getItem("token");
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/v1/products/reviews/",
          { product_id: product?.id, rating: rating, description: userreview },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        fetchProducts();
        setRating(0);
        setUserreview("");
        console.log(response.data);
      } catch (e: any) {
        console.log(e);
      }
    }
  };

  //
  const handleFocus = () => {
    setTimeout(() => {
      buttonRef.current?.blur();
    }, 1000);
  };

  //handle the cart , add the product to the cart
  const handleCart = async () => {
    handleFocus();
    try {
      const token = sessionStorage.getItem("token");

      console.log(product?.id);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/carts/cartdetails/",
        { product_id: product?.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/cart");
    } catch (error) {
      console.log("Error adding to cart:", error);
    }
  };

  //calculating the review rating
  const reviewRatingfunc = (reviews: Review[]) => {
    let rating = [0, 0, 0, 0, 0];
    let count = 0;
    let total = 0;
    reviews.map((review) => {
      let number = parseFloat(review.rating);
      let rounded = Math.round(number);
      rating[rounded - 1]++;
      total += number;
      count++;
    });
    total = Number((total / count).toFixed(1));
    setReviewRating(rating);
    setTotalreview(total);
    setReviewcount(count);
    //console.log(rating)
  };

  //fetching the individual products
  const fetchProducts = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const url = `http://127.0.0.1:8000/api/v1/products/productitems/${num.id}/`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProduct(response.data);
      setFarm(response.data?.farm_id);
      setFarmer(response.data?.farm_id?.farmer_id);
      setReviews(response.data?.reviews);
      reviewRatingfunc([...response.data?.reviews]);
      //console.log(response?.data?.reviews)
      setLoading(false);
    } catch (error: any) {
      //console.error('Failed to fetch products:', err);
      setError("Failed to fetch products");
      setLoading(false);

      if (error.response && error.response.data) {
        const errorData = error.response.data;

        if (errorData.code == "token_not_valid") {
          navigate("/login");
        }
      }
    }
  };

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts();
  }, []);

  //ui untill data fetch
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }
  return (
    <div className="w-full">
      <section>
        <div className=" pt-5 px-4 pb-3">
          <h1 className=" h-7 font-bold text-[22px] text-[#121712]">
            Product Details
          </h1>
        </div>
        <div className=" p-4">
          <div className="w-full  flex gap-2">
            <div className="w-2/4 ">
              <img
                className=" w-full h-[305px] object-cover"
                src={product?.image}
                alt=""
              />
            </div>
            <div className="w-1/4 h-[305px]">
              <img
                className="w-full h-[305.5px] object-cover "
                src={product?.image}
                alt=""
              />
            </div>
            <div className="w-1/4 h-[305.5px]">
              <img
                className="w-full h-[305.5px] object-cover"
                src={product?.image}
                alt=""
              />
            </div>
          </div>
          <div className="w-full h-[60px] pt-5 px-4 pb-4">
            <h1 className=" h-7 font-bold text-[22px]">
              {product?.product_name}
            </h1>
          </div>
          <div className="w-full h-10 pt-1 px-4 pb-3">
            <p className=" h-6 font-medium text-4">{`Rs. ${product?.product_price} per Kilogram`}</p>
          </div>
          <div className="w-full  p-4 flex flex-col gap-6">
            <div className="h-[71px] flex gap-6">
              <div className="w-[186px]  border-t border-[#E5E8EB]">
                <p className="w-[186px] h-[21px] font-medium text-[14px] text-[#708763]">
                  Harvest Date
                </p>
                <p className="w-[186px] h-[21px] font-medium text-[14px] text-[#121712]">
                  {product?.harvested_date}
                </p>
              </div>
              <div className=" border-t border-[#E5E8EB]">
                <p className="w-[186px] h-[21px] font-medium text-[14px] text-[#708763]">
                  Farm Location
                </p>
                <p className="w-[186px] h-[21px] font-medium text-[14px] text-[#121712]">
                  {farm?.location}
                </p>
              </div>
            </div>
            <div className="h-[71px]">
              <div className="w-[186px]  border-t border-[#E5E8EB]">
                <p className="w-[186px] h-[21px] font-medium text-[14px] text-[#708763]">
                  Organic/Natural Labels
                </p>
                <p className="w-[186px] h-[21px] font-medium text-[14px] text-[#121712]">
                  Certified Organic
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="px-4 pb-3">
          <h2 className="text-[22px] font-bold text-[#121712]">
            Farmer Profile
          </h2>
        </div>
        <div className="flex gap-4 p-4">
          <div className="h-full w-1/6">
            <img src="/image6.png"></img>
          </div>
          <div className="w-5/6 py-[14px]">
            <h2 className="font-bold text-[22px] text-[#121712]">
              {farmaer?.farmer_name}
            </h2>
            <p className="font-medium text-4 text-[#708763]">
              {farm?.farm_name}
            </p>
            <p className="font-medium text-4 text-[#708763]">
              {farmaer?.about}
            </p>
          </div>
        </div>
        <div className="pt-1 pb-3 px-4 font-medium text-4 text-[#121712]">
          {farm?.about}
        </div>
      </section>
      <section>
        <div className="w-full pt-5 px-4 pb-3">
          <h1 className="font-bold text-[22px] texr-[#121712]">
            Pricing & Delivery
          </h1>
        </div>
        <div className="flex gap-6 p-4">
          <div className="py-5  border-t w-1/5 border-[#E5E8EB]">
            <p className="font-medium text-[14px] text-[#708763]">
              Price per Kilogram
            </p>
            <p className="font-medium text-[14px] text-[#121712]">{`Rs . ${product?.product_price}`}</p>
          </div>
          <div className="py-5  border-t w-4/5 border-[#E5E8EB]">
            <p className="font-medium text-[14px] text-[#708763]">
              Estimated Delivery Time
            </p>
            <p className="font-medium text-[14px] text-[#121712]">
              2-3 business days
            </p>
          </div>
        </div>
        <div className="py-3 px-4">
          <button
            ref={buttonRef}
            onClick={handleCart}
            className="bg-[#4AB814] rounded-[8px] font-bold text-[14px] text-[#121712] px-4 py-[9.5px] cursor-pointer hover:bg-green-600 focus:border"
          >
            Add to Cart
          </button>
        </div>
      </section>
      <section className="pb-3">
        <Compo
          reviewRating={reviewRating}
          totalreview={totalreview}
          reviewcount={reviewcount}
        />
      </section>
      <div className=" my-2 flex gap-8 border-y border-[#E5E8EB] mb-3 pb-2">
        <div>
          <h3 className="font-medium text-[14px] text-[#121712] px-8 py-5">
            Add your review here
          </h3>
          <div className="flex gap-3">
            <label htmlFor="rating" className=" w-20 block h-3">
              Rating: {rating}
            </label>
            <input
              className="w-20 mt-1"
              id="rating"
              type="range"
              min="1.0"
              max="5.0"
              step="0.2"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            />
          </div>
        </div>
        <div className=" w-1/2 my-4">
          <textarea
            rows={3}
            className="border w-full rounded-lg p-2 h-12"
            value={userreview}
            onChange={(e) => setUserreview(e.target.value)}
            placeholder="add your review"
          ></textarea>
        </div>
        <div
          className="w-12 h-12 rounded-full bg-gray-100 my-4 flex justify-center items-center hover:bg-gray-200"
          onClick={handleaddreview}
        >
          <IoMdSend className="w-10 h-10 p-2" />
        </div>
      </div>
      <section>
        <div className="p-4 flex flex-col gap-8">
          {reviews?.map((review) => (
            <CustemerReviews
              key={review.id}
              review={review}
              fetchProducts={fetchProducts}
            />
          ))}
        </div>
      </section>
      <Badges />
    </div>
  );
};

export default ProductInformation;
