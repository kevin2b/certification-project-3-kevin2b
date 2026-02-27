import { useDispatch, useSelector } from "react-redux";
import CartProduct from "./CartProduct";
import {removeAllFromCart} from "@/store/slices/CartSlice";
import {reduceAllStock, fetchProducts} from "@/store/slices/ProductsSlice";
import Loading from "@/components/Loading/Loading";
import Error from "@/pages/Error/Error";
import { useEffect } from "react";
import styles from "./Cart.module.css";

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

  let subtotal = cartIds.reduce((sum, currId) => {
      const product = products[currId];
      //In case cannot find product
      if (!product){
        return sum;
      }
      return (sum +  product.price * cart[currId]);
    } ,0);
  subtotal = Number(subtotal.toFixed(2));

  const formattedSubtotal = subtotal.toFixed(2);
  const formattedTax = (subtotal*0.13).toFixed(2);
  const formattedGrandTotal = (subtotal + Number(formattedTax)).toFixed(2);

  function isValidCart (){
    return cartIds.every(cartId => {
      const product = products[cartId];
      const quantity = cart[cartId];
      return product ? product.stock >= quantity && quantity > 0: false;
    });
  }

  function handleCheckout(){
    dispatch(reduceAllStock(cart));
    dispatch(removeAllFromCart());
  }

  return (
    <div className={styles.cart}>
      {cartIds.length <= 0 ? (
        <p className={styles.heading}>No items in cart!</p>
      ):(
        <div className={styles.wrapper}>
          <button type="button" onClick={()=>dispatch(removeAllFromCart())} className={styles.clearButton}>Clear Cart</button>
          <section className={`${styles.desktop} ${styles.header}`}>
            <span className={styles.headerField}> Info </span>
            <span className={styles.headerField}> Qty. </span>
            <span className={styles.headerField}> Total Price </span>
          </section>
          <section className={styles.cartItems}>
            {cartIds.map(productId => {
              const product = products[productId];
              //Guard
              if (!product){
                return null;
              }
              return <CartProduct key={productId} id={productId} amountInCart={cart[productId]} title={product.title} price={product.price} image={product.image} stock={product.stock}/>;
            })}
          </section>
          <section className={styles.summary}>
            <div className={styles.summaryRow}>
              <span className={styles.summaryField}> Subtotal:</span>
              <span> ${formattedSubtotal} </span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryField}> Tax (13%): </span>
              <span> ${formattedTax} </span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryField}> Grand Total: </span>
              <span> ${formattedGrandTotal} </span>
            </div>
            <button type="button" onClick={()=>handleCheckout()} disabled={!isValidCart()} className={styles.checkoutButton}>Checkout</button>
          </section>
        </div>
      )}
    </div>
  )
}

export default Cart;
