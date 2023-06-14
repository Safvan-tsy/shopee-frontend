import { useState } from "react";
import { useParams, Link,useNavigate} from "react-router-dom";
import { Form,Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from "react-bootstrap";
import Rating from "../components/Rating";
import { useGetProductDetailQuery } from '../slices/productsApiSlice';
import { useDispatch } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {addToCart} from '../slices/cartSlice';

const ProductScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id: prodId } = useParams()
    const [qty, setQty] = useState(1);
    
    const {data:product, isLoading, error} = useGetProductDetailQuery(prodId);
    const addToCartHandler=()=>{
        dispatch(addToCart({...product.data.product,qty}))
        navigate('/cart')
    }
    return (
        <>
            <Link className="btn btn-light my-3 " to='/'>
                Go Back
            </Link>
            {isLoading? (
                <Loader/>
            ) : error? (
                <Message variant='danger'>
                {error?.data?.message || error.error}
                </Message>
            ) : (
                <Row>
                <Col md={5}>
                    <Image src={product.data.product.image} alt={product.data.product.name} fluid />
                </Col>
                <Col md={4}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.data.product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.data.product.rating} text={`${product.data.product.numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price:${product.data.product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description:${product.data.product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush" >
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        <strong>${product.data.product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        <strong>{product.data.product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {product.data.product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col>
                                        <Form.Control as='select'
                                        value={qty}
                                        onChange={(e)=>setQty(Number(e.target.value))}
                                        >
                                            {[...Array(product.data.product.countInStock).keys()].map((x)=>(
                                                <option key={x+1} value={x+1}>
                                                {x+1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}
                            <ListGroup.Item>
                                <Button className="btn-block"
                                    type='button'
                                    disabled={product.data.product.countInStock === 0} 
                                    onClick={addToCartHandler} >
                                    Add To Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            )}
            
        </>
    )
}

export default ProductScreen