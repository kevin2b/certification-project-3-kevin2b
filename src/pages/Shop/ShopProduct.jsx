import { Link } from "react-router";

function ShopProduct({id, image, title, price, stock}){
  return (
    <article> 
      <img src={image} alt="Product image" width="100px"/>
      <Link to={`/product/` + id}> {title} </Link>
      <div> Price: ${price} </div>
      <div> Stock: {stock} </div>
    </article>
  )
}

export default ShopProduct;