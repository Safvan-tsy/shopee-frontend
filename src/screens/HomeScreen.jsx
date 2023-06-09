import React,{useEffect,useState} from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/product';
import axios from 'axios';

const HomeScreen = () => {
    const [products,setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
           const resp = await axios.get(process.env.REACT_APP_API_URL+'/product')
           setProducts(resp.data.data.products)
        }

        fetchProducts();
    },[])
    return (
        <>
            <h1>
                <Row>
                    {products.map((product) => (
                        <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                            <Product product={product} />
                        </Col>
                    ))}

                </Row>
            </h1></>
    )
}

export default HomeScreen