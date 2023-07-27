import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';


function App() {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
         <Outlet/>
        </Container>
      </main>
      <Footer/>
      <ToastContainer/>
    </>
  );
}

export default App;
