import { Link } from "react-router";
import ProductQuantitySelector from "@/components/ProductQuantitySelector/ProductQuantitySelector";
import { useDispatch } from "react-redux";
import {changeQuantityCart, removeFromCart} from "@/store/slices/CartSlice";
import crossImg from '@/assets/images/cross.svg';
import styles from "./CartProduct.module.css";

function CartProduct({id, image, title, price, stock, amountInCart}){
  const dispatch = useDispatch();

  function setQuantity(val) {
    let quantity = val;
    if (quantity === ""){
      dispatch(changeQuantityCart({productId: id, quantity: "" }));
      return;
    }
    quantity = Number(quantity);
    if (quantity > stock){
      quantity = stock;
    }
    dispatch(changeQuantityCart({productId: id, quantity: quantity }));
  };

  return (
    <article className={styles.cartItem}>
      <div className={styles.heading}>
        <Link to={`/product/` + id} className={styles.productName}> {title} </Link>
        <button type="button" onClick={()=>dispatch(removeFromCart(id))} className={styles.removeButton}>
          <img src={crossImg} width="25" alt="Remove from cart" className={styles.crossImg}/>
        </button>
      </div>
      <div className={styles.wrapperRow}>
        <img src={image} alt="Product image" width="100" className={styles.productImage}/>
        <div className={styles.wrapperInfo}>
          <div> Price Per: ${price} </div>
          <div> Stock: {stock} </div>
        </div>
      </div>
      <div className={styles.quantity}>
        <span> Qty: </span>
        <ProductQuantitySelector quantity={amountInCart} setQuantity={setQuantity} min={1} max={stock} />
      </div>
      <div className={styles.total}> Price Total: ${(price * amountInCart).toFixed(2)}</div>
    </article>
  )
}

export default CartProduct;