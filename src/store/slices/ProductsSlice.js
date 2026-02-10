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
    reduceStock: (state, action) => {
      const productId = Number(action.payload.productId);
      const quantity = Number(action.payload.quantity);
      const product = state.items.find(product => product.id === productId);
      if (product){
        product.stock = Math.max(0, product.stock-quantity)
      }
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

export const {reduceStock} = productsSlice.actions;
export { fetchProducts };
export default productsSlice.reducer;