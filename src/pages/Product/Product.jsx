import { useParams } from "react-router";
import { useSelector } from "react-redux";

function Product(){
  const {id} = useParams();
  const products = useSelector((state) => state.products);
  const product = products.find(product => product.id === Number(id));

  if (!product){
    return <section> Product does not exist! </section>
  }

  return (
    <section>
      <img src={product.image} alt="Product image" width="100px"/>
      <div> {product.title} </div>
      <div> {product.description} </div>
      <div> Price: ${product.price} </div>
      <div> Stock: {product.stock} </div>
    </section>
  )
}

export default Product;
