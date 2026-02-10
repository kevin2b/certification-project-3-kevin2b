import { useParams, useNavigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import ProductQuantitySelector from "@/components/ProductQuantitySelector/ProductQuantitySelector"
import { useState, useEffect } from "react";
import {addToCart} from "@/store/slices/CartSlice";
import {fetchProducts} from "@/store/slices/ProductsSlice";
import Loading from "@/components/Loading/Loading";
import Error from "@/pages/Error/Error";

function Product(){
  const navigate = useNavigate();
  const location = useLocation();
  const {id} = useParams();
  const dispatch = useDispatch();

  const {items: products, status} = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);

  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    setQuantity(1);
  }, [id]); // Prevent state from being preserved if product goes from 1 product page to another

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

  function handleBack() {
    //If there is a back history, key should not be default
    if (location.key === 'default') {
      navigate("/shop");
    } else {
      navigate(-1); 
    }
  }

  function handleAddToCart(){
    dispatch(addToCart({productId: product.id , quantity}));
    setQuantity(1);
  }

  const product = products.find(product => product.id === Number(id));
  if (!product){
    return (
    <section>
      <button type="button" onClick={handleBack}> Back </button>
      Product does not exist! 
    </section>
    )
  }

  const MIN = 1;
  const MAX = product.stock - (cart?.[product.id] ?? 0);
  
  return (
    <section>
      <button type="button" onClick={handleBack}> Back </button>
      <img src={product.image} alt="Product image" width="100px"/>
      <div> {product.title} </div>
      <div> {product.description} </div>
      <div> Price: ${product.price} </div>
      <div> {product.stock > 0 ? "Stock: " + product.stock : "Out of stock!" } </div>
      <div> In cart: {cart?.[product.id] ?? 0}</div>
      <div> 
        {MAX > 0 && 
          <>
            <ProductQuantitySelector quantity={quantity} setQuantity={setQuantity} min={MIN} max={MAX}/>
            <button type="button" disabled={quantity === "" || Number(quantity) < MIN || Number(quantity) > MAX} onClick={handleAddToCart}> Add to Cart </button>
          </>
        }
        {product.stock > 0 && MAX === 0 && 
          <>
            <div>You have all remaining stock in your cart!</div>
          </>
        }
      </div>
    </section>
  )
}

export default Product;
