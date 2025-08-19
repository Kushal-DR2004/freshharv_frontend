import CartDetailscomponent from "../components/CartDetailscomponent";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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
}

interface DiscountCode {
  id: number;
  code: string;
  discount_percent: number;
  active: boolean;
}

interface Cart {
  id: number;
  user: number;
  items?: CartItem[];
  discount_code?: DiscountCode | null;
}

const CartPage = () => {
  const navigate = useNavigate();

  const procedToOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const product = productList.join(",");
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }
      console.log(13);
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/carts/orders/`,
        {
          delivered_address: deliveryadress,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);

      console.log(product);
      navigate("/order", {
        state: {
          id: response?.data?.id,
          product,
          address: response?.data?.delivered_address,
          totalprice: response?.data?.total_price,
        },
      });
    } catch (err: any) {}
  };

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountCode(e.target.value);
    setDiscountError("");
  };

  const applyDiscountCode = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }
      console.log(13);
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/v1/carts/discountapply/12/`,
        {
          discount_code: discountcode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCart();
      console.log(response);
    } catch (err: any) {
      setDiscountError(err.response.data.error);
    }
  };

  const calculate = (cart: Cart) => {
    let total = 0;
    const calculatedProducts: string[] = [];
    cart?.items?.forEach((item) => {
      total += parseFloat(item?.product?.product_price) * item.quantity;
      calculatedProducts.push(item?.product?.product_name);
    });

    let disprice = 0;
    if (cart?.discount_code) {
      const percent = cart?.discount_code?.discount_percent;
      disprice = (percent / 100) * total;
    }
    setTotalprice(total);
    setDiscountprice(disprice);
    setProductList(calculatedProducts);
  };

  const fetchCart = async () => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        navigate("/login");
      }

      const response = await axios.get(
        "http://127.0.0.1:8000/api/v1/carts/cartitems/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      calculate({ ...response.data[0] });
      setCart({ ...response.data[0] });
    } catch (error: any) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;

        if (errorData.code == "token_not_valid") {
          navigate("/login");
        }
      }
    }
  };

  const handleAdressChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDeliveryadress(e.target.value);
  };

  const [cart, setCart] = useState<Cart>();
  const [totalprice, setTotalprice] = useState<number>(0);
  const [discountprice, setDiscountprice] = useState<number>(0);
  const [discountcode, setDiscountCode] = useState<string>("");
  const [discountError, setDiscountError] = useState<string>("");
  const [deliveryadress, setDeliveryadress] = useState<string>();
  const [productList, setProductList] = useState<string[]>([]);

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="py-5  w-200">
      <section className="w-full">
        <div className="p-4 flex gap-2 w-full">
          <span className="font-medium text-4 text-[#708763]">Cart</span>
          <span className="font-medium text-4 text-[#708763]">/</span>
          <span className="font-medium text-4 text-[#121712]">Summary</span>
        </div>
        <div className="p-4 font-bold text-[32px] text-[#121712]">
          Your Cart
        </div>
        {cart?.items?.map((item) => (
          <CartDetailscomponent
            key={item.id}
            id={item.id}
            product={item.product}
            quantity={item.quantity}
            fetchCart={fetchCart}
          />
        ))}
      </section>
      {!cart?.discount_code && cart && cart.items && cart.items.length > 0 && (
        <section>
          <form onSubmit={applyDiscountCode}>
            <div className="p-4 pb-2 font-bold text-[18px] text-[#121712]">
              Apply Discount Code
            </div>
            <div className="w-1/2 py-3 px-4">
              <input
                className="w-full rounded-lg border border-[#DEE5DB] p-4"
                placeholder="Enter discount code"
                value={discountcode}
                onChange={handleDiscountChange}
                required
              />
            </div>
            {discountError && (
              <div className="p-4 font-bold text-red-500">{discountError}</div>
            )}
            <div className="py-3 px-4">
              <button
                type="submit"
                className="bg-[#F2F5F0] px-4 py-2 rounded-lg font-bold text-3.5 text-[#121712] focus:border hover:bg-gray-200"
              >
                Apply
              </button>
            </div>
          </form>
        </section>
      )}
      {cart && cart.items && cart.items.length > 0 && (
        <section>
          <h1 className="p-4 font-bold text-4.5 text-[#121712]">
            Order Summary
          </h1>

          <h1 className="p-4 font-bold text-4.5 text-[#121712]">
            Order Summary
          </h1>

          <div className="p-4">
            <div className="flex justify-between py-2">
              <span className="font-epilogue text-secondary-text">
                Subtotal
              </span>
              <span className="font-epilogue">Rs. {totalprice}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-epilogue text-secondary-text">
                Delivery
              </span>
              <span className="font-epilogue">{`+ Rs ${80}`}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-epilogue text-secondary-text">
                Discount
              </span>
              <span className="font-epilogue">{`- Rs ${discountprice}`}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-epilogue text-secondary-text">Total</span>
              <span className="font-epilogue">
                {` Rs ${totalprice + 80 - discountprice}`}
              </span>
            </div>
          </div>

          {/*<table className="p-8 w-full">
                    <tbody>
                        <tr>
                            <td className="font-medium text-[14px] text-[#708763] px-2 pr-[826px] py-2">Subtotal</td>
                            <td className="font-medium text-[14px] text-[#121712] px-2 py-2">{` Rs ${totalprice}`}</td>
                        </tr>
                        <tr>
                            <td className="font-medium text-[14px] text-[#708763] px-2 pr-[826px] py-2">Delivery</td>
                            <td className="font-medium text-[14px] text-[#121712] px-2 py-2">{`+ Rs ${80}`}</td>
                        </tr>
                        <tr>
                            <td className="font-medium text-[14px] text-[#708763] px-2 pr-[826px] py-2">Discount</td>
                            <td className="font-medium text-[14px] text-[#121712] px-2 py-2">{`- Rs ${discountprice}`}</td>
                        </tr>
                        <tr>
                            <td className="font-medium text-[14px] text-[#708763] px-2 pr-[826px] py-2">Total</td>
                            <td className="font-medium text-[14px] text-[#121712] px-2 py-2">{` Rs ${totalprice + 80 - discountprice}`}</td>
                        </tr>
                    </tbody>
                </table>*/}
        </section>
      )}

      {cart && cart.items && cart.items.length > 0 && (
        <form onSubmit={procedToOrder}>
          <div className="m-2 p-2">
            <label htmlFor="adress" className="block font-bold mb-2">
              Delivery Adress:
            </label>
            <textarea
              id="feedback"
              value={deliveryadress}
              onChange={handleAdressChange}
              rows={2}
              placeholder="Add your delivery adress here"
              className="w-full border border-gray-300 rounded p-3"
              required
            />
          </div>

          <button
            type="submit"
            className="my-3 mx-4 bg-[#4AB814] rounded-lg font-bold text-[14px] text-[#121712] py-3 w-4/10 focus:border hover:bg-green-600"
          >
            Proceed to Checkout
          </button>
        </form>
      )}

      <div className="flex justify-center py-4">
        <button
          className="bg-[#F2F5F0] rounded-lg font-bold text-[14px]  text-[#121712] py-3 w-2/10 focus:border hover:bg-gray-200"
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default CartPage;
