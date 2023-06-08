import React,{useEffect,useState} from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/product';

const HomeScreen = () => {
    const [products,setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {

        }

        fetchProducts();
    },[])
    return (
        <>
            <h1>
                <Row>
                    {products.map((product) => (
                        <Col sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}

                </Row>
            </h1></>
    )
}

export default HomeScreen