import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cartitems from "./components/cartItems";
import Rendering from "./components/rendering";

function App() {
  const [itemss, setItemess] = useState([]);

  const addToCart = (item) => {
    const existingItem = itemss.find((cartItem) => cartItem.id === item.id);
   
   

    if (existingItem) {
      setItemess(
        itemss.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setItemess([...itemss, { ...item, quantity: 1 }]);
    }
  };
  
  const Increment = (id) => {
    setItemess(
      itemss.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } :item
      )
    );
  };

  const Decrement = (id) => {
    setItemess(
      itemss
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removingcartItems = (prod) => {
    setItemess(itemss.filter((data) => prod.id !== data.id));
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Cartitems addtocart={addToCart} itemss={itemss} />}
          />
          <Route
            path="cards"
            element={
              <Rendering
                itemss={itemss}
                removingcartItems={removingcartItems}
                Increment={Increment}
                Decrement={Decrement}
              />
            }
          />
          <Route path="Grocery">

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
