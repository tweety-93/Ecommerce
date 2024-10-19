import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
      state.totalQuantity++;
      state.totalPrice += newItem.price;
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const removeItem = state.items.find((item) => item.id === id);
      if (removeItem) {
        state.items = state.items.filter((item) => item.id !== id);
        state.totalQuantity -= removeItem.quantity;
        state.totalPrice -= removeItem.price * removeItem.quantity;
      }
    },
    increaseItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
        state.totalQuantity++;
        state.totalPrice += existingItem.price;
      }
    },
    decreaseItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          existingItem.quantity--;
        }
        state.totalQuantity--;
        state.totalPrice -= existingItem.price;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseItem,
  decreaseItem,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
