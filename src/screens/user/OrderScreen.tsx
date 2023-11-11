import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Message from '../../components/ui/Message';
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap';
import Loader from '../../components/ui/loader/Loader';
import { useGetOrderDetailsQuery, useUpdateOrderToDeliveredMutation } from '../../slices/ordersApiSlice';
import { useSelector } from 'react-redux';
import Stripe from '../../components/stripe/Stripe';
import { toast } from 'react-toastify';
import { RootState } from '../../store';

const OrderScreen = () => {
    const { id: orderId } = useParams()
    const token = useSelector((state:RootState) => state.auth.token)
    const request = {
        orderId,
        token
    }
    const { userInfo } = useSelector((state:RootState) => state.auth);
    const { data, refetch, isLoading, error } = useGetOrderDetailsQuery(request)
    const [updateOrderToDelivered, { isLoading: loadingDeliver }] = useUpdateOrderToDeliveredMutation();

    const deliverOrderHandler = async () => {
        try {
            await updateOrderToDelivered({ orderId, token });
            refetch();
            toast.success('marked as delivered')
        } catch (error) {
            toast.error('error?.data?.message || error.message')
        }
    }
    return isLoading ? <Loader />
        : error ? <Message variant='danger' >Error</Message>
            : (
                <>
                    <h1>Order {orderId} </h1>
                    {/* <Row>
                        <Col md={8}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Shipping</h2>
                                    <p>
                                        <strong>Name: </strong> {data.data.order.user.name}
                                    </p>
                                    <p>
                                        <strong>Email: </strong> {data.data.order.user.email}
                                    </p>
                                    <p>
                                        <strong>Adress: </strong>
                                        {data.data.order.shippingAddress.address},{data.data.order.shippingAddress.city}{' '}
                                        {data.data.order.shippingAddress.postalCode},{' '} {data.data.order.shippingAddress.country}

                                    </p>
                                    {data.data.order.isDelivered ? (
                                        <Message variant='success'>
                                            Delivered on {data.data.order.deliveredAt}
                                        </Message>
                                    ) : (
                                        <Message variant='danger'>
                                            Not Delivered
                                        </Message>
                                    )}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h2>Payment </h2>
                                    <strong>Status</strong>
                                    {data.data.order.isPaid ? (
                                        <Message variant='success'>
                                            Paid on {data.data.order.paidAt}
                                        </Message>
                                    ) : (
                                        <Message variant='danger'>
                                            Not Paid
                                        </Message>
                                    )}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h2>Order Items</h2>
                                    {data.data.order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name}
                                                        fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/products/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} X ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h2>Order Summary</h2>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Items </Col>
                                            <Col>${data.data.order.itemsPrice} </Col>
                                        </Row>
                                        <Row>
                                            <Col>Shipping</Col>
                                            <Col>${data.data.order.shippingPrice}</Col>
                                        </Row>
                                        <Row>
                                            <Col>Tax</Col>
                                            <Col>${data.data.order.taxPrice}</Col>
                                        </Row>
                                        <Row>
                                            <Col>Total</Col>
                                            <Col>${data.data.order.totalPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {userInfo && !userInfo.isAdmin && !data.data.order.isPaid && (
                                        <ListGroup.Item>
                                        <Stripe totalPrice={data.data.order.totalPrice} orderId={orderId} />
                                    </ListGroup.Item>
                                    )}
                                    {loadingDeliver && <Loader />}
                                    {userInfo && userInfo.isAdmin &&
                                        data.data.order.isPaid && !data.data.order.isDelivered && (
                                            <ListGroup.Item>
                                                <Button
                                                    type='button'
                                                    className='btn btn-block'
                                                    onClick={deliverOrderHandler}
                                                >
                                                    Mark As Delivered
                                                </Button>
                                            </ListGroup.Item> 
                                        )}
                                </ListGroup>

                            </Card>

                        </Col>
                    </Row> */}
                </>
            )
}

export default OrderScreen;