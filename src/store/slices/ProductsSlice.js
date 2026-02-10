import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import products from '@/data.json';

//This is to fake an API call
const fetchProducts = createAsyncThunk('products/fetchProducts',
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return products;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: "idle", //idle, loading, done, error
  },
  reducers: {
    reduceAllStock: (state, action) => {
      Object.keys(action.payload).forEach((cartId) => {
        const productId = Number(cartId);
        const quantity = Number(action.payload[cartId]);
        const product = state.items.find(product => product.id === productId);
        if (product){
          product.stock = Math.max(0, product.stock-quantity)
        }
      });
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "done";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "error";
      });
  }
});

export const {reduceAllStock} = productsSlice.actions;
export { fetchProducts };
export default productsSlice.reducer;