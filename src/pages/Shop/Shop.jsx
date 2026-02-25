import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ShopProduct from "./ShopProduct";
import { useSearchParams } from "react-router";
import Loading from "@/components/Loading/Loading";
import Error from "@/pages/Error/Error";
import {fetchProducts} from "@/store/slices/ProductsSlice";

function Shop(){
  const {items: allProducts, status} = useSelector((state) => state.products);
  const [searchParams, setSearchParams] = useSearchParams();
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

  const term = searchParams.get("term") || "";
  const category = searchParams.get("category") || "all"; 
  const order = searchParams.get("order") || "nameAsc";
  let products = filterProducts(allProducts, term, category);
  products = orderProducts(products, order);

  return (
    <div> 
      <input type="text" name="search" id="search" placeholder="Enter product name" value={term} onChange={(e) => setSearchParams({ term: e.target.value, category, order})}/>
      <label htmlFor="category"> Sort By: </label>
      <select id="category" name="category" value={category} onChange={(e) => setSearchParams({term, category: e.target.value, order})}>
        <option value="all"> All </option>
        <option value="men's clothing"> Men's Clothing </option>
        <option value="women's clothing"> Women's Clothing </option>
        <option value="jewellery"> Jewelery </option>
        <option value="electronics"> Electronics </option>
      </select>
      <label htmlFor="order"> Sort By: </label>
      <select id="order" name="order" value={order} onChange={(e) => setSearchParams({term, category, order: e.target.value})}>
        <option value="nameAsc"> Name: A to Z </option>
        <option value="nameDesc"> Name: Z to A </option>
        <option value="priceAsc"> Price: Low to High </option>
        <option value="priceDesc"> Price: High to Low </option>
      </select>
      { products.map(product => (
          <ShopProduct key={product.id} {...product}/>
        ))
      }
      {products.length === 0 && <div> No products found!</div>}
    </div>
  )
}

function filterProducts(allProducts, term, category){
  let products = allProducts;
  //Prevent no stock items from being shown
  products = products.filter(product => product.stock > 0);

  //Filter by term
  if (term.trimStart() !== ""){
    products = products.filter(product => product.title.toLowerCase().includes(term.trimStart().toLowerCase()));
  }

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
    default:
      return productsDup.sort((a,b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }));
  }
}

export default Shop;
