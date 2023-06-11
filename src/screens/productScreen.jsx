import { useParams, Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from "react-bootstrap";
import Rating from "../components/Rating";
import { useGetProductDetailQuery } from '../slices/productsApiSlice';
import Loader from "../components/Loader";

const ProductScreen = () => {
    const { id: prodId } = useParams()
    const {data:product, isLoading, error} = useGetProductDetailQuery(prodId);
   
    return (
        <>
            <Link className="btn btn-light my-3 " to='/'>
                Go Back
            </Link>
            {isLoading? (
                <Loader/>
            ) : error? (
                <div>{error?.data?.message||error.error}</div>
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
                            <Rating value={product.data.product.rating} text={`${product.numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price:${product.price}
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
                            <ListGroup.Item>
                                <Button className="btn-block"
                                    type='button'
                                    disabled={product.data.product.countInStock === 0} >
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