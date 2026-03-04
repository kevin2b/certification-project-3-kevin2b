import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {}, //Format is {"1": 4, "2": 5, ...} where {productId: quantityInCart}
  reducers: {
    addToCart: (state, action) => { //{productId: "1", quantity: 1}
      const productId = action.payload.productId;
      const quantity = Number(action.payload.quantity);
      //Skip if invalid quantity
      if (isNaN(quantity) || quantity < 0){
        return;
      }
      if (productId in state && state[productId] != ""){
        state[productId] += quantity;
      }
      else{
        state[productId] = quantity;
      }
    },
    changeQuantityCart: (state, action) => { //{productId: "1", quantity: 1} quantity can also be ""
      const productId = action.payload.productId;
      const quantity = action.payload.quantity;
      //"" is valid
      if (quantity === "" && productId in state) {
        state[productId] = "";
        return;
      }
      const numQuantity = Number(quantity);
      //Skip if invalid quantity
      if (isNaN(numQuantity) || numQuantity < 0){
        return;
      }
      if (productId in state){
        state[productId] = numQuantity;
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