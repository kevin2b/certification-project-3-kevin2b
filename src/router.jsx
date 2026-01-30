import App from './App';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Product from './pages/Product/Product';
import Cart from './pages/Cart/Cart';
import Shop from './pages/Shop/Shop';
import Error from './pages/Error/Error';

const routes = [
  {
    path: "/",
    element: <App/>,
    children: [
      {index: true, element: <Home/>},
      {path: "about", element: <About/>},
      {path: "cart", element: <Cart/>},
      {path: "shop", element: <Shop/>},
      {path: "product", element: <Product/>},
      {path: "*", element: <Error/>},
    ],
  },
]

export default routes;