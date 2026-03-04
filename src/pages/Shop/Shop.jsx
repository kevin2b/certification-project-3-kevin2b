import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import ShopProduct from "./ShopProduct";
import { useSearchParams } from "react-router";
import Loading from "@/components/Loading/Loading";
import Error from "@/pages/Error/Error";
import {fetchProducts} from "@/store/slices/ProductsSlice";
import styles from "./Shop.module.css";
import { CATEGORIES } from "@/constants";

function Shop(){
  const {items: allProducts, status} = useSelector((state) => state.products);
  const [searchParams, setSearchParams] = useSearchParams();
  const [term, setTerm] = useState(searchParams.get("term") || "");
  const dispatch = useDispatch();

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

  const category = searchParams.get("category") || "all"; 
  const order = searchParams.get("order") || "nameAsc";

  const allProductsArray = Object.values(allProducts);
  let products = filterProducts(allProductsArray, term, category);
  products = orderProducts(products, order);

  function handleSearchChange(key, value){
    setSearchParams((prev) => {
      const curr = new URLSearchParams(prev);
      curr.set(key, value)
      return curr;
    }, {replace: true});
  }

  //Prevent cursor location from resetting in input text box
  function handleSearchTermChange(value){
    setTerm(value);
    setSearchParams((prev) => {
      const curr = new URLSearchParams(prev);
      curr.set("term", value)
      return curr;
    }, {replace: true});
  }

  return (
    <div className={styles.shop}>
      <section className={styles.search}>
        <div className={styles.inputWrapper}>
          <label htmlFor="search" className={styles.inputLabel}> Search </label>
          <input className={`${styles.input} ${styles.inputText}`} type="text" name="search" id="search" maxLength="200" placeholder="Enter product name" value={term} onChange={(e) => handleSearchTermChange( e.target.value)}/>
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="category" className={styles.inputLabel}> Category </label>
          <select className={`${styles.input} ${styles.select}`} id="category" name="category" value={category} onChange={(e) => handleSearchChange("category", e.target.value)}>
            {CATEGORIES.map (category => {
              return <option key={category} value={category.toLowerCase()}> {category} </option>;
            })}
          </select>
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="order" className={styles.inputLabel}> Sort By </label>
          <select className={`${styles.input} ${styles.select}`} id="order" name="order" value={order} onChange={(e) => handleSearchChange("order", e.target.value)}>
            <option value="nameAsc"> Name: A to Z </option>
            <option value="nameDesc"> Name: Z to A </option>
            <option value="priceAsc"> Price: Low to High </option>
            <option value="priceDesc"> Price: High to Low </option>
          </select>
        </div>
      </section>
      <section className={styles.productGrid}>
        {products.map(product => (
            <ShopProduct key={product.id} id={product.id} title={product.title} price={product.price} image={product.image} stock={product.stock}/>
          ))
        }
      </section>
      {products.length === 0 && <p className={styles.zeroFound}> No products found!</p>}
      
    </div>
  )
}

function filterProducts(allProductsArray, term, category){
  let products = allProductsArray;
  //Prevent no stock items from being shown
  products = products.filter(product => product.stock > 0);

  //Filter by search term
  products = products.filter(product => product.title.toLowerCase().includes(term.trimStart().toLowerCase()));

  //Filter by category
  if (category !== "all"){
    products = products.filter(product => product.category === category);
  }
  return products;
}

function orderProducts(products, order){
  let productsDup = [...products];
  switch(order){
    case "nameDesc":
      return productsDup.sort((a,b) => b.title.localeCompare(a.title, undefined, { sensitivity: 'base' }));
    case "priceAsc":
      return productsDup.sort((a,b) => a.price - b.price);
    case "priceDesc":
      return productsDup.sort((a,b) => b.price - a.price);
    default: //nameAsc
      return productsDup.sort((a,b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }));
  }
}

export default Shop;
