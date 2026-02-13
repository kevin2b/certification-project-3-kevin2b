import { Link } from "react-router";
import styles from "./Header.module.css";
import logo from '@/assets/images/logo.svg';
import cartImg from '@/assets/images/cart.svg';
import { useSelector } from "react-redux";

const CATEGORIES = ["All", "Electronics", "Jewellery", "Men's Clothing", "Women's Clothing"]

function Header(){
  const cartQuantity = Object.values(useSelector((state) => state.cart));
  const totalQuantity = cartQuantity.reduce((sum, curr) => {
    const num = Number(curr) || 0;
    return num + sum;
  }, 0);
  return (
    <header>
      <div className={styles.firstRow}>
        <Link to="/" className={styles.storeLogoName}> 
          <img src={logo} width="50px" height="auto" alt="Aura Logo" className={styles.logo}/>
          <span className={styles.storeName}> Aura </span>
        </Link>
        <Link to="/cart" className={styles.cart}> 
          <img src={cartImg} width="25px" height="auto" alt="View cart" className={styles.cartImg}/>
          {totalQuantity > 0 && <span className={styles.cartAmount}> {totalQuantity>99 ? "99+" : totalQuantity} </span>}
        </Link>
      </div>
      <nav className={`${styles.nav} ${styles.mobile}`}>
        <Link to="/shop" className={styles.linkButton}> Shop </Link>
        <Link to="/about" className={styles.linkButton}> About </Link>
      </nav>
      <nav className={`${styles.nav} ${styles.desktop}`}>
        {CATEGORIES.map((category) => {
          return <Link key={category} to={`/shop?category=${category.toLowerCase()}`} className={styles.linkButton}> {category} </Link>
        })}
        <Link to="/about" className={styles.linkButton}> About </Link>
      </nav>
    </header>
  )
}

export default Header;
