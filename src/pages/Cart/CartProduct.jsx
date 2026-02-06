import { Link } from "react-router";
import ProductQuantitySelector from "@/components/ProductQuantitySelector/ProductQuantitySelector";
import { useDispatch } from "react-redux";
import {changeQuantityCart, removeFromCart} from "@/store/slices/CartSlice";

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
    <article> 
      <img src={image} alt="Product image" width="100px"/>
      <Link to={`/product/` + id}> {title} </Link>
      <div> Stock: {stock} </div>
      <span>Amount in Cart</span>
      <ProductQuantitySelector quantity={amountInCart} setQuantity={setQuantity} min={1} max={stock} />
      <div> Price Per: ${price} </div>
      <div> Price Total: ${(price * amountInCart).toFixed(2)}</div>
      <button type="button" onClick={()=>dispatch(removeFromCart(id))}>Remove from Cart</button>
    </article>
  )
}

export default CartProduct;