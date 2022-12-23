import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiDishesList, Dish} from "../types";
import axiosApi from "../axiosApi";
import {AppDispatch} from "../app/store";
import {updateDishes} from "./cartSlice";

export const fetchDishes = createAsyncThunk<Dish[], undefined, {dispatch: AppDispatch}>(
  'dishes/fetchAll',
  async (arg, thunkAPI) => {
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

    thunkAPI.dispatch(updateDishes(newDishes));

    return newDishes;
  }
);

export const deleteDish = createAsyncThunk<void, string>(
  'dishes/delete',
  async (dishId) => {
    await axiosApi.delete('/dishes/' + dishId + '.json');
  }
);