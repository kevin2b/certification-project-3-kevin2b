import { useDispatch, useSelector } from "react-redux";
import CartProduct from "./CartProduct";
import {removeAllFromCart} from "@/store/slices/CartSlice";
import {reduceAllStock, fetchProducts} from "@/store/slices/ProductsSlice";
import Loading from "@/components/Loading/Loading";
import Error from "@/pages/Error/Error";
import { useEffect } from "react";

function Cart(){
  const dispatch = useDispatch();
  const {items: products, status} = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const cartIds = Object.keys(cart);

  //Attempt data fetch if error in previous fetch
  useEffect(() => {
    if (status === 'error') {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

  if(status === "idle" || status === "loading"){
    return <Loading/>;
  }

  if(status === "error"){
    return <Error message="Network error."/>;
  }

  let total = cartIds.reduce((sum, currId) => {
      const product = products.find(product => product.id === Number(currId));
      //In case cannot find product
      if (!product){
        return sum;
      }
      return (sum +  product.price * cart[currId]);
    } ,0);
  total = total.toFixed(2);

  function isValidCart (){
    return cartIds.every(cartId => {
      const product = products.find(product => product.id === Number(cartId));
      return product ? product.stock >= cart[cartId]: false;
    });
  }

  function handleCheckout(){
    dispatch(reduceAllStock(cart));
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
            //Guard
            if (!product){
              return null;
            }
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
