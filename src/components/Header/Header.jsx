import { Link } from "react-router";
import styles from "./Header.module.css";

function Header(){
  return (
    <header>
      <div>
        <Link to="/" className={styles.storeName}> Lotus </Link>
      </div>
      <nav>
      <Link to="/"> Home</Link>
      {` | `}
      <Link to="/shop"> Shop </Link>
      {` | `}
      <Link to="/about"> About </Link>
      {` | `}
      <Link to="/cart"> Cart </Link>
    </nav>
    </header>
  )
}

export default Header;
