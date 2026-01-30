import NavBar from '@/components/NavBar/NavBar';
import Footer from '@/components/Footer/Footer';
import { Outlet } from 'react-router';
const App = () => {
  return (
    <>
      <NavBar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App;
