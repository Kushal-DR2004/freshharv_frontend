import { NavLink } from "react-router-dom";

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

const FarmerComponent = ({ id, about, ph_no, farmer_name, farm }: farmer) => {
  return (
    <NavLink to={`${id}`}>
      <div className="w-3/4 max-w-xl rounded-lg p-6 bg-white shadow-lg border border-gray-200">
        <div className="mb-4 flex gap-3">
          <img className="w-1/7 h-1/7 rounded-full" src="/image6.png"></img>
          <div>
            <h2 className="font-bold text-2xl text-gray-900">{farmer_name}</h2>
            {farm?.map((farm, index) => (
              <p className="font-medium text-4 text-[#708763]" key={index}>
                {farm.farm_name}
              </p>
            ))}
            <p>{`Ph no : ${ph_no}`}</p>
          </div>
        </div>
        <div>
          <p className="text-gray-600 border-t border-gray-200 pt-2">{about}</p>
        </div>
      </div>
    </NavLink>
  );
};

export default FarmerComponent;
