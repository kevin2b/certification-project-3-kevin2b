import styles from "./ProductQuantitySelector.module.css";

/**
 * Quantity must be a number.
 * Min and max must be numbers, min>= 0, min < max
 * User can only input empty string and numbers consisting of only digits.
 * If user enters a number beyond max, quantity is set to max.
 */
function ProductQuantitySelector({quantity, setQuantity, min, max}){

  function handleQuantityChange(e){
    const val = e.target.value;
    if (!/^\d*$/.test(val)) {
      return;
    }

    if (val === ""){
      setQuantity("");
      return;
    }

    const valNum = Number(val);
    setQuantity(valNum);
    if (valNum > max){
      setQuantity(max);
    }
  }

  return (
    <div className={styles.wrapper}>
      <button type="button" disabled={quantity === "" || Number(quantity)<= min} onClick={()=>{setQuantity(quantity-1)}} className={`${styles.minus} ${styles.button}`}> - </button>
      <input type="text" inputMode="numeric" maxLength={max.toString().length + 1} value={quantity} onChange={handleQuantityChange} className={`${styles.input} ${quantity < min ? styles.inputError : ""}`}/>
      <button type="button"  disabled={quantity === "" || Number(quantity)>=max} onClick={()=>{setQuantity(quantity+1)}} className={`${styles.plus} ${styles.button}`}> + </button>
    </div>
  );
}
export default ProductQuantitySelector;

