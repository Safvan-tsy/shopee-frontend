import { Outlet } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/ui/header/Header';
import Footer from './components/ui/Footer';
import { RootState } from './store';
import { useSelector } from 'react-redux';

function App() {
  const { sellerInfo } = useSelector((state: RootState) => state.auth);
  return (
    <>
      <Row>
        <Header />
      </Row>

      <Row>
        <main className='main-container'>
          <Container className='sub-container'>
            <div className='outlet-container'>
              <Outlet />
            </div>
          </Container>
        </main>
      </Row>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
