import { useParams, useNavigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import ProductQuantitySelector from "@/components/ProductQuantitySelector/ProductQuantitySelector"
import { useState, useEffect } from "react";
import {addToCart} from "@/store/slices/CartSlice";
import {fetchProducts} from "@/store/slices/ProductsSlice";
import Loading from "@/components/Loading/Loading";
import Error from "@/pages/Error/Error";
import styles from "./Product.module.css"

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

  const product = products[id];
  if (!product){
    return (
    <section className={styles.product}>
      <button type="button" onClick={handleBack} className={styles.back}> Back </button>
      <p className={styles.productNotExist}>Product does not exist!</p> 
    </section>
    )
  }

  const MIN = 1;
  const MAX = product.stock - (cart?.[product.id] ?? 0);
  const formattedPrice = product.price.toFixed(2);
  
  return (
    <article className={styles.product}>
      <button type="button" onClick={handleBack} className={styles.back}> &lsaquo; Back </button>
      <h2 className={styles.title}> {product.title} </h2>
      <div className={styles.productInfoWrapper}>
        <img src={product.image} alt="Product image" width="100" className={styles.productImg}/>
        <div className={styles.productInfo}>
          <div className={styles.price}> ${formattedPrice} </div>
          <div className={styles.stock}> {product.stock > 0 ? "Stock: " + product.stock : "Out of stock!" } </div>
          <div className={styles.cartQuantity}> In cart: {cart?.[product.id] ?? 0}</div>
          <div> 
            {MAX > 0 && 
              <div className={styles.cartAdder}>
                <ProductQuantitySelector quantity={quantity} setQuantity={setQuantity} min={MIN} max={MAX}/>
                <button type="button" disabled={quantity === "" || Number(quantity) < MIN || Number(quantity) > MAX} onClick={handleAddToCart} className={styles.addButton}> Add to Cart </button>
              </div>
            }
            {product.stock > 0 && MAX === 0 && 
              <>
                <div className={styles.allStockTaken}>All stock in cart!</div>
              </>
            }
          </div>
        </div>
        <div className={styles.descriptionWrapper}>
          <h3 className={styles.descriptionHeader}>Description</h3>
          <p className={styles.description}>{product.description} </p>
        </div>
      </div>
    </article>
  )
}

export default Product;
