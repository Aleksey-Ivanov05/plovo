import React from 'react';
import CartDishes from "../../components/Cart/CartDishes";
import {CartDish} from "../../types";
import {Link, Navigate, NavLink, Outlet} from "react-router-dom";

interface Props {
  cartDishes: CartDish[]
}

const Checkout: React.FC<Props> = ({cartDishes}) => {
  if (cartDishes.length === 0) {
    return <Navigate to="/"/>;
  }

  return (
    <div className="row mt-2">
      <div className="col-4 m-auto">
        <h4>Checkout</h4>
        <CartDishes cartDishes={cartDishes}/>
        <div className="d-flex gap-2">
          <Link to="/" className="btn btn-danger">Cancel</Link>
          <NavLink to="continue" className="btn btn-primary">Continue</NavLink>
        </div>
        <Outlet/>
      </div>
    </div>
  );
};

export default Checkout;