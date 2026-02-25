import { Link } from "react-router";
import styles from "./ShopProduct.module.css";

function ShopProduct({id, image, title, price, stock}){
  return (
    <article>
      <Link to={`/product/` + id}> {title} </Link>
      <img src={image} alt="Product image" width="100px"/>
      <div> Price: ${price} </div>
      <div> Stock: {stock} </div>
    </article>
  )
}

export default ShopProduct;