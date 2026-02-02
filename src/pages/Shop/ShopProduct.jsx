function ShopProduct({id, image, title, price, stock}){
  return (
    <article> 
      <img src={image} alt="Product image" width="100px"/>
      <div> {title} </div>
      <div> Price: ${price} </div>
      <div> Stock: {stock} </div>
    </article>
  )
}

export default ShopProduct;