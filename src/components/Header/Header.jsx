import { Link } from "react-router";
import styles from "./Header.module.css";
import logo from '@/assets/images/logo.svg';
import cart from '@/assets/images/cart.svg';

function Header(){
  return (
    <header>
      <div className={styles.firstRow}>
        <Link to="/" className={styles.storeLogoName}> 
          <img src={logo} width="50px" height="auto" alt="Aura Logo" className={styles.logo}/>
          <span className={styles.storeName}> Aura </span>
        </Link>
        <Link to="/cart" className={styles.cart}> 
          <img src={cart} width="25px" height="auto" alt="Aura Logo" className={styles.cartImg}/>
        </Link>
      </div>
      <nav className={styles.nav}>
        <Link to="/shop" className={styles.linkButton}> Shop </Link>
        <Link to="/about" className={styles.linkButton}> About </Link>
      </nav>
    </header>
  )
}

export default Header;
