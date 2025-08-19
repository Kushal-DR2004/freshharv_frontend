import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  interface FormDataState {
    username: string;
    password: string;
  }

  interface ErrorState {
    detail?: string;
    general?: string;
  }

  const [formData, setFormData] = useState<FormDataState>({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<ErrorState>({});
  const [success, setSuccess] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/users/login/",
        formData,
        {}
      );
      console.log(response);
      setSuccess("LoginSucessfull successful!");
      setErrors({});
      setFormData({ username: "", password: "" });
      const token = response.data.access;
      sessionStorage.setItem("token", token);
      navigate("/products");
    } catch (error: any) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        setErrors(errorData);
      } else {
        setErrors({ general: "Something went wrong!" });
      }
      setSuccess("");
      setFormData({ username: "", password: "" });
    }
  };

  return (
    <div className="w-[1280px]  px-[160px] py-5">
      <div className=" py-5">
        <div className="py-5 px-4">
          <div className="font-bold text-[28px] text-center text-[#121712]">
            Welcome Back
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="py-3 px-4 gap-4 mx-[258px]">
            <div className="">
              <label className="block w-full  text-[#121712] font-medium text-[16px]">
                username
              </label>
              <input
                className="w-full border mt-2 border-[#DEE5DB] font-medium text-[16px] rounded-[8px] p-[15px]"
                type="text"
                name="username"
                required
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className=" py-3 px-4 gap-4 mx-[258px]">
            <div className="">
              <label className="block w-full text-[#121712] font-medium text-[16px]">
                Pasword
              </label>
              <input
                className="w-full mt-2 border border-[#DEE5DB] font-medium text-[16px] rounded-[8px] p-[15px]"
                type="password"
                name="password"
                required
                value={formData.password}
                placeholder="Enter your password"
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className=" pt-1 pb-3 px-4 mx-[225.5px]">
            <p className="text-[#708016] font-medium text-[16px]">
              Forgot password?
            </p>
          </div>
          <div className=" py-3 px-4 mx-[225.5px]">
            <button className="w-[477px] h-[48px] px-5 rounded-[8px] bg-[#4AB814] text-[16px] font-bold text-[#121712] hover:bg-green-600 focus:border">
              Log In
            </button>
          </div>
          <div className=" px-4 pt-1 pb-3">
            <p
              className="text-[14px] font-medium text-[#708763] text-center cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Don't have an account? Sign up
            </p>
          </div>
          {success && (
            <p className="text-center text-green-700 font-medium">{success}</p>
          )}
          {errors && (
            <p className="text-center text-red-400 font-medium">
              {errors.detail}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
