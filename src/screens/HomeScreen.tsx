import { Row, Col } from 'react-bootstrap';
import { useParams,Link} from 'react-router-dom';
import Product from '../components/product/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/ui/Loader';
import Message from '../components/ui/Message';
import Paginate from '../components/ui/Paginate';
import ProductCarousel from '../components/product/ProductCarousel';
import { ProductType } from '../types/product.types';

const HomeScreen = () => {
    const { page, keyword } = useParams<{ page?: string; keyword?: string }>();
    const { data: products, isLoading, error } = useGetProductsQuery({page: Number(page) ?? 1, keyword: keyword ?? '',});

    return (
        <>
        {!keyword ? <ProductCarousel/> : <Link to='/' className='btn btn-light mb-4'>Go Back</Link>}
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>
                    {error}
                </Message>
            ) : (
                <>
                    <h1>Latest Products</h1>
                    <Row>
                        {products?.data.products.map((product:ProductType) => (
                            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                                <Product product={product} />
                            </Col>
                        ))}

                    </Row>
                    <Paginate pages={products?.pages} page={products?.page} keyword={keyword ? keyword :''}/>
                </>
            )}

        </>
    )
}

export default HomeScreen;