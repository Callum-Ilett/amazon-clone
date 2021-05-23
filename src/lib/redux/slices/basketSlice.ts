import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../types";

interface InitialState {
  items: Products;
}

const initialState: InitialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => (basketItem.id = action.payload.id)
      );

      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      }

      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

export const selectItems = (state: RootState) => state.basket.items;

export const selectTotal = (state: RootState) =>
  state.basket.items.reduce((total, { price }) => total + price, 0);

export default basketSlice.reducer;
