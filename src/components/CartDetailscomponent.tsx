import { HiPlus } from "react-icons/hi";
import { HiMinusSm } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";

interface Product {
  id: number;
  product_name: string;
  product_price: string;
  image: string;
}

interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  fetchCart: () => void;
}

const CartDetailscomponent = ({
  id,
  product,
  quantity,
  fetchCart,
}: CartItem) => {
  const navigate = useNavigate();

  const decreaseRef = useRef<HTMLButtonElement | null>(null);
  const increaseRef = useRef<HTMLButtonElement | null>(null);

  const increseQuantity = async () => {
    setTimeout(() => {
      increaseRef.current?.blur();
    }, 200);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
      }

      const response = await axios.patch(
        `http://127.0.0.1:8000/api/v1/carts/cartdetails/${id}/increase/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCart();
      console.log(response);
    } catch (error: any) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;

        if (errorData.code == "token_not_valid") {
          navigate("/login");
        }
      }
    }
  };

  const decreaseQuantity = async () => {
    setTimeout(() => {
      decreaseRef.current?.blur();
    }, 200);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
      }

      const response = await axios.patch(
        `http://127.0.0.1:8000/api/v1/carts/cartdetails/${id}/decrease/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCart();
      console.log(response);
    } catch (err: any) {}
  };

  return (
    <div className="flex justify-between py-2 px-4">
      <div className=" flex gap-5">
        <div className="w-[56px]">
          <img
            className="w-full h-full object-cover rounded-lg mr-1"
            src={product?.image}
            alt="aa"
          />
        </div>
        <div className="my-[1.6px] py-[5.5px]">
          <p className="font-medium text-4 text-[#121712]">
            {product?.product_name}
          </p>
          <p className="font-medium text-3.5 text-[#708763]">{`Rs ${product?.product_price} / kg`}</p>
        </div>
      </div>
      <div className="flex gap-2 my-3.5">
        <button
          className="bg-[#F2F5F0] rounded-full  w-7 h-7 font-medium text-4 text-[#121712] flex items-center justify-center hover:bg-gray-200 focus:border"
          ref={decreaseRef}
          onClick={decreaseQuantity}
        >
          <HiMinusSm />
        </button>
        <div className="">{quantity}</div>
        <button
          className="bg-[#F2F5F0] rounded-full w-7 h-7 font-medium text-4 text-[#121712] flex items-center justify-center hover:bg-gray-200 focus:border"
          onClick={increseQuantity}
          ref={increaseRef}
        >
          <HiPlus />
        </button>
      </div>
    </div>
  );
};

export default CartDetailscomponent;
