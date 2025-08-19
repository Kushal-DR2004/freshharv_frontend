import { useState, useEffect } from "react";
import FarmerComponent from "../components/FarmerComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface farm {
  id?: number;
  farm_name?: string;
}

interface farmer {
  id?: number;
  about?: string;
  image?: string;
  ph_no?: number;
  farmer_name: string;
  farm?: farm[];
}

const Farmerspage = () => {
  const navigate = useNavigate();

  //fetch the farmer products
  const fetchfarmers = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(
        "http://127.0.0.1:8000/api/v1/farmers/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //console.log(response)
      setFarmers(response.data);
      //console.log(response.data)
    } catch (error: any) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;

        if (errorData.code == "token_not_valid") {
          navigate("/login");
        }
      }
    }
  };

  useEffect(() => {
    fetchfarmers();
  }, []);

  const [farmers, setFarmers] = useState<farmer[]>();

  return (
    <div className="mt-3">
      <h2 className="text-center text-2xl font-bold text-[#121712] p-4">
        Our farmers
      </h2>
      <div className="grid grid-cols-2 ml-30 mt-5 gap-3">
        {farmers?.map((farmer) => (
          <FarmerComponent
            key={farmer.id}
            id={farmer.id}
            about={farmer.about}
            farmer_name={farmer.farmer_name}
            ph_no={farmer.ph_no}
            farm={farmer?.farm}
          />
        ))}
      </div>
    </div>
  );
};

export default Farmerspage;
