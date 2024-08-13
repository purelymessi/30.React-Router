import { useNavigate } from "react-router-dom";

export default function Card({
  id,
  name,
  description,
  price,
  category,
  imageUrl,
  slug,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/products/" + slug);
    console.log("test");
  };
  return (
    <div className="border rounded-xl items-start flex flex-col gap-2 p-4 border-black ">
      <div className="h-[200px] w-full">
        <img className="object-contain w-full h-full" src={imageUrl} />
      </div>
      <h1 className="text-2xl font-semibold text-slate-900">{name}</h1>
      <h1 className="text-sm font-regular capitalize text-slate-900">
        {category}
      </h1>
      <p className="opacity-65 line-clamp-3">{description}</p>
      <p className="font-semibold text-2xl mt-auto">{price}$</p>
      <button
        onClick={handleClick}
        className="bg-black py-3 px-6 rounded-md text-sm cursor-pointer hover:bg-black/70  transition-all duration-300 ease-in-out text-white"
      >
        View Product
      </button>
    </div>
  );
}
