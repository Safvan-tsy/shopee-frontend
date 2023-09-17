import { Row, Col } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import Product from '../components/product/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/ui/Loader';
import Message from '../components/ui/Message';
import Paginate from '../components/ui/Paginate';
import ProductCarousel from '../components/product/carousel/ProductCarousel';
import { ProductType } from '../types/product.types';
import './shared.css';
import useDocumentTitle from '../hooks/useDocumentTitle';
import {FaArrowLeft} from 'react-icons/fa';
const HomeScreen = () => {
    const { page, keyword } = useParams<{ page?: string; keyword?: string }>();
    const { data: products, isLoading, error } = useGetProductsQuery({ page: page ?? '1', keyword: keyword ?? '', });
    useDocumentTitle('Online Shopping From Near By Sellers. Best Offers!', false);
    
    return (
        <>
            {keyword && <Link to='/' className='btn btn-light mb-4 go-back-btn'><FaArrowLeft/></Link>}
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>
                    {error}
                </Message>
            ) : (
                <>
                    {!keyword && <h1 className='homescreen-h1'>Latest Products</h1>}
                    <div >
                    <Row className='card-container'>
                        {products?.data.products.map((product: ProductType) => (
                            <Col sm={6} md={3} lg={4} xl={3} key={product._id}>
                                <Product product={product} />
                            </Col>
                        ))}

                    </Row>
                    </div>
                    <Paginate pages={products?.pages} page={products?.page} keyword={keyword ? keyword : ''} />
                </>
            )}

        </>
    )
}

export default HomeScreen;