import { Link } from "react-router";
import styles from "./ShopProduct.module.css";

function ShopProduct({id, image, title, price, stock}){
  const formattedPrice = price.toFixed(2);
  return (
    <article className={styles.productWrapper}>
      <Link to={`/product/` + id} className={styles.product}>
        <div className={styles.productImgWrapper}>
          <img src={image} alt={title} width="100" className={styles.productImg}/>
        </div>
        <h2 className={styles.productName}>{title}</h2>
        <div className={styles.productPrice}> ${formattedPrice} </div>
        <div className={styles.stockInfo}> 
          <div className={styles.stock}>
            Stock
          </div>
          <div className={styles.stockAmount}>
            {stock}
          </div>
        </div>
      </Link>
    </article>
  )
}

export default ShopProduct;