import { Outlet } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/ui/header/Header';
import Footer from './components/ui/Footer';
import { RootState } from './store';
import { useSelector } from 'react-redux';
import SellerHeader from './components/seller/SellerHeader';

function App() {
  const { sellerInfo } = useSelector((state: RootState) => state.auth);
  return (
    <>
    <Row>
      <Header />
    </Row>
      {/* {sellerInfo && <SellerHeader />} */}
        
      <Row>
      <main className='py-3 main-container'>
        <Container className='sub-container'>
          <Outlet />
        </Container>
      </main>
      </Row>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
