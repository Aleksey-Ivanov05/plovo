import React from 'react';
import Dishes from "../../components/Dishes/Dishes";
import Cart from "../../components/Cart/Cart";
import {CartDish, Dish} from "../../types";
import Spinner from "../../components/Spinner/Spinner";
import axiosApi from "../../axiosApi";

interface Props {
  dishesLoading: boolean;
  dishes: Dish[];
  addToCart: (dish: Dish) => void;
  cartDishes: CartDish[];
  fetchDishes: () => void;
}

const Home: React.FC<Props> = ({ dishesLoading, dishes, addToCart, cartDishes, fetchDishes}) => {
  const deleteDish = async (id: string) => {
    if (window.confirm('Do you really want to delete this dish?')) {
      await axiosApi.delete('/dishes/' + id + '.json');
      await fetchDishes();
    }
  };

  return (
    <div className="row mt-2">
      <div className="col-7">
        {dishesLoading ? <Spinner/> : <Dishes dishes={dishes} addToCart={addToCart} deleteDish={deleteDish}/>}
      </div>
      <div className="col-5">
        <Cart cartDishes={cartDishes} />
      </div>
    </div>
  );
};

export default Home;