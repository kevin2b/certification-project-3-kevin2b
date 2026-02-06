import { useDispatch, useSelector } from "react-redux";
import CartProduct from "./CartProduct";
import {removeAllFromCart} from "@/store/slices/CartSlice";
import {reduceStock} from "@/store/slices/ProductsSlice";
function Cart(){
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const cartIds = Object.keys(cart);

  let total = cartIds.reduce((sum, currId) => {
      return (sum +  products.find(product => product.id === Number(currId)).price * cart[currId]);
    } ,0);
  total = total.toFixed(2);

  function isValidCart (){
    return cartIds.every(cartId => {
      const product= products.find(product => product.id === Number(cartId));
      return product.stock >= cart[cartId];
    });
  }

  function handleCheckout(){
    cartIds.forEach(cartId => {
      dispatch(reduceStock({productId: cartId, quantity: cart[cartId]}));
    });
    dispatch(removeAllFromCart());
  }

  return (
    <section>
      {cartIds.length <= 0 ? (
        <div>No item in cart!</div>
      ):(
        <>
          <button type="button" onClick={()=>dispatch(removeAllFromCart())}>Clear Cart</button>
          {cartIds.map(productId => {
            const productIdNum = Number(productId);
            const product = products.find((product) => product.id === productIdNum);
            return <CartProduct key={productIdNum} id={productIdNum} amountInCart={cart[productId]} {...product} />;
          })}
          <div> Grand Total: ${total}</div>
          <button type="button" onClick={()=>handleCheckout()} disabled={!isValidCart()}>Checkout</button>
        </>
      )}
    </section>
  )
}

export default Cart;
