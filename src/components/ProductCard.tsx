interface ProductCardPropsProps {
  name: string;
  image: string;
  farm: string;
}

const ProductCard = ({ name, image, farm }: ProductCardPropsProps) => {
  return (
    <div className="pb-3 flex flex-col gap-3">
      <div className="w-[176px] h-[176px] mb-3">
        <img
          className="w-full h-full  object-cover rounded-[8px]"
          src={image}
          alt=""
        />
      </div>
      <div className="">
        <p className="w-full font-medium text-[16px]">{name}</p>
        <p className="w-full font-normal text-[14px] text-[#708763]">{farm}</p>
      </div>
    </div>
  );
};

export default ProductCard;
