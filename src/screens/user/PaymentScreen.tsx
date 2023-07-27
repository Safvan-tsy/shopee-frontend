import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Col } from 'react-bootstrap';
import FormContainer from '../../components/ui/FormContainer';
import CheckoutSteps from '../../components/ui/CheckoutSteps';
import { savePaymentMethod } from '../../slices/cartSlice';
import { RootState } from '../../store';

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('stripe')
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state:RootState) => state.cart)
    const { shippingAddress } = cart;

    useEffect(() => {
        if (!shippingAddress) {
            navigate('/shipping')
        }
    }, [shippingAddress, navigate])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 step4={undefined} />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>
                        Select method
                    </Form.Label>
                    <Col>
                        <Form.Check type='radio'
                            className='my-2'
                            label='Stripe'
                            id='stripe'
                            name='paymentMethod'
                            value={paymentMethod}
                            checked
                            onChange={((e) => setPaymentMethod(e.target.value))}
                        ></Form.Check>
                    </Col>
                </Form.Group>
                <Button type='submit' variant='success'>Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen