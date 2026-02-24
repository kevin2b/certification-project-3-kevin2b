import styles from "./Home.module.css";
import { Link } from "react-router";
import logo from '@/assets/images/logo.svg';

function Home(){
  return (
    <main className={styles.wrapper}>
      <div className={styles.logoWrapper}>
        <img src={logo} alt="Aura" width="200" className={styles.logo}/>
        <h1 className={styles.storeName}> Aura </h1>
      </div>
      <p className={styles.summary}>Clothing, Electronics and Jewellery...</p>
      <Link to="/shop" className={styles.linkButton}> Unleash Your Aura </Link>
    </main>
  )
}

export default Home;
