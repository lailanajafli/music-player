import { createContext, useEffect, useState } from "react";

export const AppContext = createContext({});

export const MainContext = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0)
  const [cartCount, setCartCount] = useState(0);

  const addToCart = (data) => {
    const existingProduct = cart.find((item) => item.id === data.id);
    if (existingProduct) {
      const updatedCart = cart.filter((item) => {
        if (item.id === existingProduct.id) {
          return { ...item, quantity: item.quantity++ };
        } else {
          return item;
        }
      });
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...data, quantity: 1 }]);
    }
  };

  const increaseDecrease = (data, type) => {
    const existingProduct = cart.find((item => item.id === data.id));
    if (existingProduct) {
      const updatedCart = cart.filter((item) => {
        if (item.id === existingProduct.id) {
          if (type === "increment") {
            return { ...item, quantity: item.quantity++ };
          } else {
            if(item.quantity > 1){
              return { ...item, quantity: item.quantity-- };
            }
          }
        } else {
          return item;
        }
      });
      setCart(updatedCart);
    }
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };


  const calculateTotoalPrice = () => {
    const sum = cart.map((item) => item.quantity * String(item.price).replace(".", ""));
    const totalValue = sum.reduce((acc, curr) => acc + curr, 0);
    setTotalPrice(totalValue);
  }

const calculateCartCount = () => {
  const sum = cart.map((item) => item.quantity);
  const totalValue = sum.reduce((acc, curr) => acc +curr, 0);
  setCartCount(totalValue);
}


const saveToLocal = async () => {
    localStorage.setItem('cart', JSON.stringify(cart))
}

  useEffect(() => {
    calculateTotoalPrice();
    calculateCartCount();
    saveToLocal()
  },[cart])

  const globals = {
    cart,
    setCart,
    totalPrice,
    cartCount,
    addToCart,
    increaseDecrease,
    removeItem,
  };

  return <AppContext.Provider value={globals}>{children}</AppContext.Provider>;
};
