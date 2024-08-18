import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { PiDotsThreeOutlineVerticalDuotone } from "react-icons/pi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { SlCallIn } from "react-icons/sl";
import OverlayPrice from "./OverlayPrice";

function Cartitems({ addtocart, itemss }) {
  const navigate = useNavigate(); 

  const [api, setApi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [DropdownVisible, setDropdown] = useState(false);
  const [maxPrice, setMaxPrice] = useState(100);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/products");
      const data = await response.json();
      setApi(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="h-[100vh] w-full flex justify-center items-center font-bold text-7xl">
        loading...
      </div>
    );
  }

  const filteredProducts = api
    .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
    .filter((item) => item.price <= maxPrice);

  return (
    <div>
      <div className="shadow-lg h-[10vh] fixed w-full z-10 bg-[#f1f3f6]">
        <ul className="flex gap-[3rem] items-center w-full relative pt-3 justify-center">
          <Link to="/">
            <div className="font-bold text-xl">E-commerce</div>
          </Link>
          <input
            type="search"
            name="search"
            value={search}
            className="border rounded-sm w-[40%] p-2"
            placeholder="search products"
            onChange={(e) => setSearch(e.target.value)}
          />

          <Link
            to="/cards"
            className="text-2xl flex justify-center items-center"
          >
            Cart
            <IoCartOutline className="text-2xl" />
            <div className="bg-red-700 text-white text-[15px] w-[27px] text-center rounded-3xl">
              <p className="rounded-lg w-full">{`${itemss.length}`}</p>
            </div>
          </Link>
          <div
            onMouseEnter={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}
            className="cursor-pointer p-4"
          >
            <PiDotsThreeOutlineVerticalDuotone className="text-black" />
            {DropdownVisible && (
              <div className="absolute mt-2 w-48 bg-white shadow-lg">
                <ul className="bg-white">
                  <li className="flex items-center p-2 gap-2 text-[15px] hover:bg-[#f1f3f6]">
                    <IoMdNotificationsOutline />
                    Notification
                  </li>
                  <li className="flex items-center p-2 gap-3 text-[15px] hover:bg-[#f1f3f6]">
                    <SlCallIn />
                    24/7 Customer care
                  </li>
                </ul>
              </div>
            )}
          </div>
        </ul>
      </div>

      {maxPrice > 10 ? (
        <div className="w-full flex pt-20">
          <div className="w-[20%]">
            <label>Price Range: </label>
            <input
              type="range"
              name="price-max"
              id="price-max"
              value={maxPrice}
              min="0"
              max="100"
              onChange={(e) => setMaxPrice((e.target.value))}
            />
            <span>${maxPrice}</span>
          </div>
          <div></div>
          <div className="w-[80%] flex flex-wrap gap-20">
            {filteredProducts.slice(0, 50).map((item) => (
              <div
                key={item.id}
                className="border-[2px] w-[200px] flex flex-col items-center"
              >
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-[100px] flex  hover:scale-[1.05]"
                  
                />
                {item.title}
                <br />
                <br />
                <p className="text-center p-5">Price: ${item.price}</p>
                <button
                  className="border-black bg-blue-500 text-white"
                  onClick={() => addtocart(item)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full h-[100vh] flex flex-col justify-center items-center">
          <button onClick={() => navigate()}>Go Back</button>
          <OverlayPrice />
        </div>
      )}
    </div>
  );
}

export default Cartitems;
