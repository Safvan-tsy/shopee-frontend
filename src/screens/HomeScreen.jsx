import { Row, Col } from 'react-bootstrap';
import { useParams,Link} from 'react-router-dom';
import Product from '../components/product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';

const HomeScreen = () => {
    const { page, keyword } = useParams()
    const { data: products, isLoading, error } = useGetProductsQuery({ page, keyword });

    return (
        <>
        {!keyword ? <ProductCarousel/> : <Link to='/' className='btn btn-light mb-4'>Go Back</Link>}
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                <>
                    <h1>Latest Products</h1>
                    <Row>
                        {products.data.products.map((product) => (
                            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                                <Product product={product} />
                            </Col>
                        ))}

                    </Row>
                    <Paginate pages={products.pages} page={products.page} keyword={keyword ? keyword :''}/>
                </>
            )}

        </>
    )
}

export default HomeScreen