import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {},
  reducers: {
    addToCart: (state, action) => {
      const productId = action.payload.productId;
      const quantity = Number(action.payload.quantity);
      if (productId in state){
        state[productId] += quantity;
      }
      else{
        state[productId] = quantity;
      }
    },
    changeQuantityCart: (state, action) => {
      const productId = action.payload.productId;
      const quantity = Number(action.payload.quantity);
      if (quantity === 0){
        delete state[productId];
      }
      else{
        state[productId] = quantity;
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      if (productId in state){
        delete state[productId];
      }
    },
    removeAllFromCart: () => {
      return {};
    },
  }
});

export const { addToCart, changeQuantityCart, removeFromCart, removeAllFromCart} = cartSlice.actions;
export default cartSlice.reducer;