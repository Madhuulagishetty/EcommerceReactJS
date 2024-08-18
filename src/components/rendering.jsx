import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";


const Rendering = ({ itemss, removingcartItems, Increment, Decrement }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState();


  

  const handleRemoveClick = (dta) => {
    setShowModal(true);
    setItemToRemove(dta);
  };
  const Close = () => {
    setShowModal(false);
  };

  const confirmRemoveItem = () => {
    removingcartItems(itemToRemove);
    setShowModal(false);

  };

  const getTotalPrice = () => {
    return itemss.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (



    <div className="bg-[#f1f3f6]">
      <div>
        {" "}
        {itemss.length !== 0 && (


          <div className=" fixed right-8 top-[5rem] bg-white">
            <div className="border shadow-lg  p-12">
              <h1 className="uppercase text-center text-xl">Price Details</h1>
              <hr />
              {itemss.map((item) => (
                <div key={item.id} className="flex m-4 gap-3">
                  <h1 className="font-semibold">
                    {item.title.slice(0, 20)} ({item.quantity}):
                  </h1>
                  <p>
                    ${item.price * item.quantity}
                  </p>
                </div>
              ))}
              <h1 className="text-start m-4">
                Taxs and Charge :
                <br/>                Total Price: ${getTotalPrice().toFixed(2)}
              </h1>
              <h1></h1>
            </div>
          </div>
        )}
      </div>
      <div>
        {showModal && (
          <div
            className="BackgroundChange fixed w-full bg-opacity-[0.6] flex justify-center items-center z-10 h-[100vh]"
            style={{
              opacity: showModal ? 0.8 : "",
            }}
          >
            <div className="bg-white p-5 rounded-lg shadow-lg ">
              <IoClose
                className="float-right top-2 right-2 text-2xl cursor-pointer"
                onClick={Close}
              />
              <h1 className="font-bold text-center p-4 text-xl">Remove Item</h1>
              <p>Are you sure you want to delete this item?</p>
              <button
                onClick={confirmRemoveItem}
                className="border-red-700 bg-red-700 text-white h-[5vh] m-2 p-2"
              >
                Remove
              </button>
            </div>
          </div>
        )}
      </div>
      <h1 className="font-bold text-2xl text-center">Items in Cart</h1>

      <button
        onClick={() => navigate("/")}
        className="mt-4 px-4 py-2 bg-gray-500 text-white"
      >
        Go Back
      </button>
      <div
        style={{
          flex: itemss.length === 0 ? "none" : "flex",
        }}
      >
        <div className="flex">
          {itemss.length === 0 ? (
            <div className="   h-[70vh]  w-[80%] bg-white m-[auto] flex justify-center items-center flex-col ">
              <div className="  bg-white  text-center p-4">
                <img
                  src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
                  alt=""
                  width={"200px"}
                  height={"200px"}
                />
                <p className="pt-4">Your cart is empty !</p>
                <p className="pt-4">Add iitems to it now .</p>
                <button
                  className="bg-blue-700 mt-6 rounded-lg text-white p-2"
                  onClick={() => navigate("/")}
                >
                  Shop Now
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-4  border shadow-lg m-5 w-[350px] flex-col">
              {itemss.map((item) => (
                <div key={item.id} className="border-[2px] flex gap-6 p-10">
                  <img src={item.images} alt={item.title} width="100px" />
                  <div>
                    <p>{item.title.slice(0, 20)}</p>
                    <p>Price: ${item.price}</p>
                    <div className="flex items-center gap-2">
                      <button onClick={() => Decrement(item.id)}>-</button>
                      {item.quantity}          

                               <button onClick={() => Increment(item.id)}>+</button>
                  
                    </div>
                    <button
                      onClick={() => handleRemoveClick(item)}
                      className="border-red-700 bg-red-700 text-white h-[5vh]"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
      </div>
    
    
    </div>
  );
};

export default Rendering;
