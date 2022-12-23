import {Dish} from "../types";
import {createSlice} from "@reduxjs/toolkit";
import {deleteDish, fetchDishes} from "./dishesThunks";
import {RootState} from "../app/store";

interface DishesState {
  items: Dish[];
  fetchLoading: boolean;
  deleteLoading: false | string;
}

const initialState: DishesState = {
  items: [],
  fetchLoading: false,
  deleteLoading: false
};

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDishes.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchDishes.fulfilled, (state, {payload: dishes}) => {
      state.fetchLoading = false;
      state.items = dishes;
    });
    builder.addCase(fetchDishes.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(deleteDish.pending, (state, {meta: {arg: dishId}}) => {
      state.deleteLoading = dishId;
    });
    builder.addCase(deleteDish.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteDish.rejected, (state) => {
      state.deleteLoading = false;
    })
  }
});

export const dishesReducer = dishesSlice.reducer;

export const selectDishes = (state: RootState) => state.dishes.items;
export const selectDishesFetchLoading = (state: RootState) => state.dishes.fetchLoading;
export const selectDishDeleteLoading = (state: RootState) => state.dishes.deleteLoading;