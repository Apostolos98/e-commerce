import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./Home";
import Category from "./Category"
import Search from "./Search";
import Product from "./Product";
import { createContext } from "react";

export const CartContext = createContext(null)

function ForContext({ children }) {
  const [cartItems, setItems] = useState([])
  const [searchWord, setSearchWord] = useState('"Most popular products"')
  
  function addToCart(item) {
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].name === item.name) {
        setItems(cartItems.map((el, ind) => ind===i?{...el, number: el.number + 1}:el))
        return;
      }
    }
    setItems([...cartItems, { name: item.name, url: item.url, price: item.price, number: 1}])
  }

  function removeFromCart(item, all=false) {
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].name === item.name) {
        if (all === true || cartItems[i].number === 1) setItems(cartItems.filter((el, ind) => ind!==i))
        else setItems(cartItems.map((el, ind) => ind===i?{...el, number:el.number - 1}:el))
      }
    }
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, searchWord, setSearchWord }}>
      {children}
    </CartContext.Provider>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/category/:id",
    element: <Category />
  },
  {
    path: "/search/:q",
    element: <Search />
  },
  {
    path: "/:id",
    element: <Product />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ForContext >
      <RouterProvider router={router} />
    </ForContext>
  </React.StrictMode>
);
