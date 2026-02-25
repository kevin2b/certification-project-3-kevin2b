import styles from "./Error.module.css";

function Error({message}){
  return (
    <div className={styles.error}>
      <h1 className={styles.heading}> Error </h1>
      <p> {message} </p>
    </div>
  )
}

export default Error;
