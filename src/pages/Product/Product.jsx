import { useParams, useNavigate, useLocation } from "react-router";
import { useSelector } from "react-redux";

function Product(){
  const navigate = useNavigate();
  const location = useLocation();
  const {id} = useParams();
  const products = useSelector((state) => state.products);
  const product = products.find(product => product.id === Number(id));

  function handleBack() {
    //If there is a back history, key should not be default
    if (location.key === 'default') {
      navigate("/shop");
    } else {
      navigate(-1); 
    }
  }

  if (!product){
    return (
    <section>
      <button type="button" onClick={handleBack}> Back </button>
      Product does not exist! 
    </section>
    )
  }

  return (
    <section>
      <button type="button" onClick={handleBack}> Back </button>
      <img src={product.image} alt="Product image" width="100px"/>
      <div> {product.title} </div>
      <div> {product.description} </div>
      <div> Price: ${product.price} </div>
      <div> {product.stock > 0 ? "Stock: " + product.stock : "Out of stock!" } </div>
    </section>
  )
}

export default Product;
