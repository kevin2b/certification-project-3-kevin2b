import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import products from '@/data.json';

//This is to fake an API call
const fetchProducts = createAsyncThunk('products/fetchProducts',
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return products;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: {}, //See data.json for format
    status: "idle", //idle, loading, done, error
  },
  reducers: {
    reduceAllStock: (state, action) => { //Format is {"1": 4, "2": 5,...} where {productId: quantityReduced}
      Object.keys(action.payload).forEach((cartId) => {
        const quantity = Number(action.payload[cartId]);
        //Skip if invalid quantity
        if (isNaN(quantity) || quantity < 0){
          return;
        }
        //Skip if invalid id
        if (cartId in state.items){
          const product = state.items[cartId];
          //Prevent negative stocks
          product.stock = Math.max(0, product.stock-quantity);
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