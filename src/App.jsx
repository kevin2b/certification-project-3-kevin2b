import Header from '@/components/Header/Header';
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
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App;
