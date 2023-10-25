import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Form, Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/ui/Rating";
import { useGetProductDetailQuery, useCreateReviewMutation, useGetReviewsQuery } from '../slices/productsApiSlice';
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/ui/loader/Loader";
import Message from "../components/ui/Message";
import { addToCart } from '../slices/cartSlice';
import { RootState } from "../store";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { FaArrowLeft } from "react-icons/fa";
import './shared.css';
import { useAddToCartMutation } from "../slices/usersApiSlice";
// import Meta from "../components/Meta";

const ProductScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id: prodId } = useParams()
    const token = useSelector((state: RootState) => state.auth.token);
    const { userInfo } = useSelector((state: RootState) => state.auth);

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('')

    const { data: res, isLoading: loadingReview, refetch: reviewRefetch } = useGetReviewsQuery(prodId);
    const { data: product, isLoading, refetch, error } = useGetProductDetailQuery(prodId);
    const [createReview, { isLoading: reviewLoading }] = useCreateReviewMutation();
    const [addToCart, { error: addError, isLoading: addToCartLoading }] = useAddToCartMutation();

    useDocumentTitle(product?.data?.product?.name || 'Loading...', false);

    const addToCartHandler = async () => {
        if (userInfo) {
            const data = {
                sellerId:product.data.product.sellerId,
                productName:product.data.product.name, 
                qty:qty,
                ProductImage:product.data.product.image[0],
                productId:product.data.product._id,
                price:product.data.product.price,
                shippingPrice:product.data.product.shippingPrice,
            }
            const addRes = await addToCart({ data, token })
            console.log(addRes)
            if(addError){
                toast.error("Something went wrong")
            }else{
                toast.success("Product added to cart")
                navigate('/cart')
            }
        } else {
            navigate(`/login?redirect=/product/${product.data.product._id}`)
        }
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const data = { prodId, rating, comment }
            await createReview({ data, token }).unwrap();
            refetch()
            reviewRefetch()
            toast.success('Review Added')
            setRating(0);
            setComment('')
        } catch (error) {
            toast.error('error')
        }
    }
    return (
        <>
            <Link className="btn btn-light go-back-btn" to='/'>
                <FaArrowLeft />
            </Link>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>
                    {error}
                </Message>
            ) : (
                <>
                    {/* <Meta title={product.data.product.name} /> */}
                    <Row className="product-details-container">
                        <Col md={5}>
                            <Image src={product.data.product.image[0]} alt={product.data.product.name} fluid />
                        </Col>
                        {/* <div className="product-details-container"></div> */}
                        <Col md={4}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>{product.data.product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating value={product.data.product.rating} text={`${product.data.product.numReviews} reviews`} />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price: ₹{product.data.product.price}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Description: {product.data.product.description}
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
                                                <strong>₹{product.data.product.price}</strong>
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
                                                        onChange={(e) => setQty(Number(e.target.value))}
                                                    >
                                                        {[...Array(product.data.product.countInStock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}
                                    <ListGroup.Item>
                                        {addToCartLoading? (<Loader/>) : (
                                        <Button className="btn-block add-to-cart-btn"
                                            type='button'
                                            disabled={product.data.product.countInStock === 0}
                                            onClick={addToCartHandler} >
                                            Add To Cart
                                        </Button>
                                        )}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="review">
                        {/* <Col md={6}>
                            {loadingReview && <Loader />}
                            <h2>Reviews</h2>
                            {!res.reviews && <Message>No Reviews</Message>}
                            <ListGroup variant="flush">
                                {res?.reviews.map(review => (
                                    <ListGroup.Item>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} text={undefined} />
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item>
                                    <h2>Write a Review</h2>
                                    {reviewLoading && <Loader />}
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler} className="product-form">
                                            <Form.Group controlId="rating" className="my-2">
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                    as='select'
                                                    value={rating}
                                                    onChange={(e) => setRating(Number(e.target.value))}
                                                >
                                                    <option value=''>Select...</option>
                                                    <option value='1'>1 - Poor</option>
                                                    <option value='2'>2 - Fair</option>
                                                    <option value='3'>3 - Good</option>
                                                    <option value='4'>4 - Very Good</option>
                                                    <option value='5'>5 - Excellent</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="comment" className="my-2">
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control
                                                    as='textarea'
                                                    rows={3}
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}>
                                                </Form.Control>
                                            </Form.Group>
                                            <Button disabled={reviewLoading}
                                                type='submit'
                                                variant="primary">
                                                Submit
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Message>Please <Link to='/login'>login</Link> to write review</Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col> */}
                    </Row>
                </>
            )}

        </>
    )
}

export default ProductScreen;