import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/ProductsSlice';
import cartReducer from './slices/CartSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});

export default store;