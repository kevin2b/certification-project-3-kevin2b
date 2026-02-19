import styles from "./Error.module.css";

function Error({message}){
  return (
    <section className={styles.error}>
      <h1 className={styles.heading}> Error </h1>
      <p> {message} </p>
    </section>
  )
}

export default Error;
