import { UserContext } from "../components/UserProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const RegiSucessfullpage = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const { username } = userContext;

  return (
    <div className="w-[1289px] h-[519px] py-[20px] px-[160px]">
      <div className="w-[960px] h-[499px] py-[20px]">
        <div className="h-[67px] pt-[20px] pb-[12px] px-[16px]">
          <h1 className="w-[928px] h-[35px] text-center font-bold text-[28px] text-[#121712]">
            Welcome , {username}!
          </h1>
        </div>
        <div className="h-[40px] pt-[4px] pb-[12px] px-[16px]">
          <p className="w-[928px] h-[24px] font-medium text-[16px] text-[#121712] text-center">
            Your account has been successfully created. You're now ready to
            explore our farm-fresh produce.
          </p>
        </div>
        <div className="h-[64px] py-12px] px-[16px] flex items-center justify-center">
          <button
            className="h-[40px] bg-[#4AB814] px-[16px] rounded-[8px] font-bold text-[14px] text-[#121712] hover:bg-green-600 focus:border"
            onClick={() => navigate("/products")}
          >
            Go To Shop
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegiSucessfullpage;
