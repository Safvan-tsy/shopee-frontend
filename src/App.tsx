import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';
import { RootState } from './store';
import { useSelector } from 'react-redux';
import SellerHeader from './components/seller/SellerHeader';


function App() {
  const { sellerInfo } = useSelector((state: RootState) => state.auth);
  return (
    <>
      <Header />
      {sellerInfo && <SellerHeader />}
      <main className='py-3'>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
