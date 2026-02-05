/**
 * Quantity must be a number.
 * Min and max must be numbers and min < max
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
    <>
      <button type="button" disabled={quantity === "" || Number(quantity)<= min} onClick={()=>{setQuantity(prev => Number(prev)-1)}}> - </button>
      <input type="text" inputMode="numeric" value={quantity} onChange={handleQuantityChange} />
      <button type="button"  disabled={quantity === "" || Number(quantity)>=max} onClick={()=>{setQuantity(prev => Number(prev)+1)}}> + </button>
    </>
  );
}
export default ProductQuantitySelector;

