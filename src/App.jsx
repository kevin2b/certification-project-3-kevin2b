import NavBar from '@/components/NavBar/NavBar';
import Footer from '@/components/Footer/Footer';
import { Outlet } from 'react-router';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '@/store/slices/ProductsSlice'
import { useEffect } from 'react';
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <NavBar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App;
