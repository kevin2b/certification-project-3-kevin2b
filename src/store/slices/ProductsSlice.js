import { createSlice } from '@reduxjs/toolkit';
import products from '@/data.json';

const productsSlice = createSlice({
  name: 'products',
  initialState: products,
  reducers: {
  }
});

//export const {} = productSlice.actions;
export default productsSlice.reducer;