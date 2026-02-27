import { useState } from "react";
import styles from "./FAQEntry.module.css";
import up from '@/assets/images/up.svg';
import down from '@/assets/images/down.svg';
function FAQEntry({question, answer}){
  const [open, setOpen] = useState(false);
  return(
    <article className={styles.entry}>
      <button onClick={()=>{setOpen(!open)}} className={styles.question}>
        <span>{question}</span>
        {open ?(
          <img src={up} alt="Close" width="10"  className={styles.arrow}/>
        ):(
          <img src={down} alt="Open" width="10"  className={styles.arrow}/>
        )}
      </button>
      {open && <p className={styles.answer}>{answer}</p>}
    </article>
  );
}

export default FAQEntry;