import { Link } from "react-router";
import styles from "./Header.module.css";
import logo from '@/assets/images/logo.svg';
import cartImg from '@/assets/images/cart.svg';
import { useSelector } from "react-redux";
import { CATEGORIES } from "@/constants";

function Header(){
  const totalQuantity = useSelector((state) => Object.values(state.cart).reduce(
                          (sum, curr) => {
                            const num = Number(curr) || 0;
                            return num + sum;
                          }, 0));
  return (
    <header>
      <div className={styles.firstRow}>
        <Link to="/" className={styles.storeLogoName}> 
          <img src={logo} width="50" alt="Aura Logo" className={styles.logo}/>
          <span className={styles.storeName}> Aura </span>
        </Link>
        <Link to="/cart" className={styles.cart}> 
          <img src={cartImg} width="25" alt="View cart" className={styles.cartImg}/>
          {totalQuantity > 0 && <span className={styles.cartAmount}> {totalQuantity>99 ? "99+" : totalQuantity} </span>}
        </Link>
      </div>
      <nav className={`${styles.nav} ${styles.mobile}`}>
        <Link to="/shop" className={styles.linkButton}> Shop </Link>
        <Link to="/about" className={styles.linkButton}> About </Link>
      </nav>
      <nav className={`${styles.nav} ${styles.desktop}`}>
        {CATEGORIES.map((category) => {
          return <Link key={category} to={`/shop?category=${encodeURIComponent(category.toLowerCase())}`} className={styles.linkButton}> {category} </Link>
        })}
        <Link to="/about" className={styles.linkButton}> About </Link>
      </nav>
    </header>
  )
}

export default Header;
