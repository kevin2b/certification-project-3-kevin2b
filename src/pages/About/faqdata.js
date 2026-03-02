const faqData = [
  {
    id: 1,
    question: "What is Aura Store?",
    answer: "At Aura Store, we don't just sell products, we deliver experiences. By meticulously selecting the finest pieces in fashion and technology, we ensure that our community stays ahead of the curve. Driven by a passion for quality and a commitment to excellence, Aura Store is your premier destination for a life well-lived."
  },
  {
    id: 2,
    question: "What is Aura Store, actually?",
    answer: "Aura Store is a frontend project designed to showcase and practice modern web development techniques. It serves as a functional demonstration of a responsive e-commerce interface built from the ground up."
  },
  {
    id: 3,
    question: "What technologies were used for the frontend development?",
    answer: "The application is built using a modern stack including HTML, CSS, JavaScript and React. Navigation is powered by React Router, while some state management is handled by Redux Toolkit. Redux Thunk is used for (mocked) asynchronous logic."
  },
  {
    id: 4,
    question: "Is there a backend currently implemented?",
    answer: "At this stage, the project is a frontend-focused demonstration."
  },
  {
    id: 5,
    question: "What are some improvements that can be made to the frontend?",
    answer: "While a lot of time has been invested in this project, more can be done. For example, on some user inputs, I could add debouncing rather than triggering a render \"onChange\". I could implement pagination instead of loading all products. I could use images that are smaller in size. Improving accessibility with better contrast and the use of ARIA labels is another consideration. Since there is no backend or sessions, refreshing the page or opening in a new tab resets everything."
  }
];

export {faqData};