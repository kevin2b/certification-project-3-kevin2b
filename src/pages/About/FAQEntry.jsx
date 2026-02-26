import { useState } from "react";
function FAQEntry({question, answer}){
  const [open, setOpen] = useState(false);
  return(
    <article>
      <button onClick={()=>{setOpen((curr) => !curr)}}>{question}</button>
      {open && <p>{answer}</p>}
    </article>
  );
}

export default FAQEntry;