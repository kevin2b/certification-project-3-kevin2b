import {faqData} from "./faqdata";
import styles from "./About.module.css";
import FAQEntry from "./FAQEntry";

function About(){
  return (
    <div className={styles.about}>
      <h1 className={styles.heading}>FAQ</h1>
      {faqData.map(entry => <FAQEntry key={entry.id} question={entry.question} answer={entry.answer}/>)}
    </div>
  )
}

export default About;
