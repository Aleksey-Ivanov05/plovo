import React, {useCallback, useEffect, useState} from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./containers/Home/Home";
import NewDish from "./containers/NewDish/NewDish";
import type {ApiDishesList, CartDish, Dish} from "./types";
import Checkout from "./containers/Checkout/Checkout";
import CustomerForm from "./containers/CustomerForm/CustomerForm";
import axiosApi from "./axiosApi";
import EditDish from "./containers/EditDish/EditDish";
import Orders from "./containers/Orders/Orders";
import Layout from "./components/Layout/Layout";

function App() {
  const location = useLocation();
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [cartDishes, setCartDishes] = useState<CartDish[]>([]);
  const [loading, setLoading] = useState(false);

  const updateCart = useCallback((dishes: Dish[]) => {
    setCartDishes(prev => {
      const newCartDishes: CartDish[] = [];

      prev.forEach(cartDish => {
        const existingDish = dishes.find(dish => dish.id === cartDish.dish.id);

        if (!existingDish) {
          return;
        }

        newCartDishes.push({
          ...cartDish,
          dish: existingDish,
        })
      });

      return newCartDishes;
    });
  }, [])

  const fetchDishes = useCallback(async () => {
    try {
      setLoading(true);
      const dishesResponse = await axiosApi.get<ApiDishesList | null>('/dishes.json');
      const dishes = dishesResponse.data;
      let newDishes: Dish[] = [];


      if (dishes) {
        newDishes = Object.keys(dishes).map(id => {
          const dish = dishes[id];
          return {
            ...dish,
            id
          }
        });
      }


      setDishes(newDishes);
      updateCart(newDishes);
    } finally {
      setLoading(false);
    }
  }, [updateCart]);

  const clearCart = () => {
    setCartDishes([]);
  }

  useEffect(() => {
    if (location.pathname === '/') {
      void fetchDishes();
    }
  }, [location, fetchDishes]);

  const addDishToCart = (dish: Dish) => {
    setCartDishes(prev => {
      const existingIndex = prev.findIndex(item => {
        return item.dish.id === dish.id;
      });

      if (existingIndex !== -1) {
        const itemsCopy = [...prev];
        const itemCopy = {...prev[existingIndex]};
        itemCopy.amount++;
        itemsCopy[existingIndex] = itemCopy;
        return itemsCopy;
      }

      return [...prev, {dish, amount: 1}];
    });
  };

  return (
    <Layout>
      <Routes>
        <Route path="/" element={(
          <Home
            dishesLoading={loading}
            dishes={dishes}
            addToCart={addDishToCart}
            cartDishes={cartDishes}
            fetchDishes={fetchDishes}
          />
        )}/>
        <Route path="/new-dish" element={(<NewDish/>)}/>
        <Route path="/edit-dish/:id" element={(<EditDish/>)}/>
        <Route path="/checkout" element={(
          <Checkout cartDishes={cartDishes}/>
        )}>
          <Route path="continue" element={(
            <CustomerForm cartDishes={cartDishes} clearCart={clearCart}/>
          )}/>
        </Route>
        <Route path="/orders" element={(<Orders/>)}/>
        <Route path="*" element={(
          <h1>Not found!</h1>
        )}/>
      </Routes>
    </Layout>
  );
}

export default App;
