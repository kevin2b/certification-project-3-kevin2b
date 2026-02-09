import { createSlice } from '@reduxjs/toolkit';
import products from '@/data.json';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: products,
    status: "idle", //idle, loading, done, error
  },
  reducers: {
    reduceStock: (state, action) => {
      const productId = Number(action.payload.productId);
      const quantity = Number(action.payload.quantity);
      const product = state.items.find(product => product.id === productId);
      if (product){
        product.stock = Math.max(0, product.stock-quantity)
      }
    }
  }
});

export const {reduceStock} = productsSlice.actions;
export default productsSlice.reducer;