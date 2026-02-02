import { useSelector } from "react-redux";
import ShopProduct from "./ShopProduct";

function Shop(){
  const products = useSelector((state) => state.products);
  return (
    <section> 
      This is shop page
      { products.map(product => (
          <ShopProduct key={product.id} id={product.id} image={product.image} title={product.title} price={product.price} stock= {product.stock}/>
        ))
      }
    </section>
  )
}

export default Shop;
