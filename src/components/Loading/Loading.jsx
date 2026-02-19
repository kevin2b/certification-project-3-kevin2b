import styles from "./Loading.module.css";

function Loading(){
  return(
    <section className={styles.loading}>
      <div>Loading </div>
      <div className={styles.dot}>.</div>
      <div className={styles.dot}>.</div>
      <div className={styles.dot}>.</div>
    </section>
  )
}

export default Loading;