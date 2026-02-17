import twitter from "@/assets/images/icon-twitter.svg";
import facebook from "@/assets/images/icon-facebook.svg";
import instagram from "@/assets/images/icon-instagram.svg";
import styles from "./Footer.module.css";

function Footer(){
  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}> &copy; 2026 Aura Store. kevin2b </div>
      <div className={styles.desktop}> Follow us: </div>
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" width="25"> 
        <img src={facebook} alt="Facebook" className={styles.logo}/>
      </a>
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" width="25"> 
        <img src={instagram} alt="Instagram" className={styles.logo}/>
      </a>
      <a href="https://www.x.com" target="_blank" rel="noopener noreferrer" width="25">
        <img src={twitter} alt="Twitter" className={styles.logo}/>
      </a>
    </footer>
  )
}

export default Footer;
