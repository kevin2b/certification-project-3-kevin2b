import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { Outlet } from 'react-router';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '@/store/slices/ProductsSlice'
import { useEffect } from 'react';
import styles from './App.module.css'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <Header/>
      <main className={styles.main}>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}

export default App;
