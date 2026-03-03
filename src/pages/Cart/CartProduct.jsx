import { Link } from "react-router";
import ProductQuantitySelector from "@/components/ProductQuantitySelector/ProductQuantitySelector";
import { useDispatch } from "react-redux";
import {changeQuantityCart, removeFromCart} from "@/store/slices/CartSlice";
import crossImg from '@/assets/images/cross.svg';
import styles from "./CartProduct.module.css";

function CartProduct({id, image, title, price, stock, amountInCart}){
  const dispatch = useDispatch();

  const formattedPrice = price.toFixed(2);
  const displayQuantity = amountInCart === "" ? 0 : amountInCart;
  const totalInCents = Math.round(price * 100) * displayQuantity;
  const formattedTotal = (totalInCents / 100).toFixed(2);

  function changeQuantity(val) {
    let quantity = val;
    if (quantity === ""){
      dispatch(changeQuantityCart({productId: id, quantity: "" }));
      return;
    }
    //Do not need to check if invalid as it is handled in ProductQuantitySelector
    quantity = Number(quantity);
    dispatch(changeQuantityCart({productId: id, quantity}));
  }

  return (
    <article className={styles.cartItem}>
      <div className={styles.heading}>
        <Link to={`/product/${id}`} className={styles.productName}> {title} </Link>
        <button type="button" onClick={()=>dispatch(removeFromCart(id))} className={styles.removeButton}>
          <img src={crossImg} width="25" alt="Remove from cart" className={styles.crossImg}/>
        </button>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.wrapperRow}>
          <img src={image} alt={title} width="100" className={styles.productImage}/>
          <div className={styles.wrapperInfo}>
            <div> Price Per: ${formattedPrice} </div>
            <div> Stock: {stock} </div>
          </div>
        </div>
        <div className={styles.quantity}>
          <span className={styles.mobile}> Qty: </span>
          <ProductQuantitySelector quantity={amountInCart} changeQuantity={changeQuantity} min={1} max={stock} />
        </div>
        <div className={styles.total}> <span className={styles.mobile}>Price Total: </span>${formattedTotal}</div>
      </div>
      </article>
  )
}

export default CartProduct;