# certification-project-3-kevin2b

### What is this?
This is a **frontend project** designed to showcase and practice modern web development techniques. It serves as a functional demonstration of a responsive e-commerce interface built from the ground up.

---

### Features
You can navigate through the storefront via a fully responsive interface. The "About" page features a collapsible FAQ section. The other buttons lead to a listing of products. Here, products can be filtered out by name and category and be sorted by name or price. Clicking on a product here allows you to visit the product page where you can choose to add the product in various quantities to the cart. Going to the cart, you can revisit the product page for each product, adjust quantities or remove from cart. You can checkout from cart which will reduce the stocks (locally). Products with no stock are removed from the listing.

---
### What technologies were used for the frontend development?
The application is built using a modern stack including:
* **HTML, CSS, JavaScript and React**
* **React Router** for navigation
* **Redux Toolkit** and **Redux Thunk** for some state management and (mocked) asynchronous logic

---

### Is there a backend currently implemented?
At this stage, the project is a **frontend-focused demonstration**.

---

### What are some improvements that can be made to the frontend?
While a lot of time has been invested in this project, more can be done. Key considerations for future updates include:

* **Performance:** Adding **debouncing** to user inputs rather than triggering a render `onChange`, implementing **pagination** instead of loading all products, using `useMemo` to prevent unnecessary recalculations, and using images that are smaller in size.
* **Accessibility:** Improving color contrast and the implementation of **ARIA labels**.
* **Persistence:** Currently, since there is no backend or session management, refreshing the page or opening a new tab resets all data.