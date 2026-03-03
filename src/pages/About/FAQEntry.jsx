import { useState } from "react";
import styles from "./FAQEntry.module.css";
import up from '@/assets/images/up.svg';
import down from '@/assets/images/down.svg';
function FAQEntry({question, answer}){
  const [open, setOpen] = useState(false);
  return(
    <article className={styles.entry}>
      <button onClick={()=>{setOpen(prev => !prev)}} className={styles.question}>
        <span>{question}</span>
          <img src={open ? up : down} alt={open ? "Close" : "Open"} width="10" className={styles.arrow}/>
      </button>
      {open && <p className={styles.answer}>{answer}</p>}
    </article>
  );
}

export default FAQEntry;