import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../../components/ui/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../../slices/cartSlice';
import CheckoutSteps from '../../components/ui/CheckoutSteps';
import { RootState } from '../../store';
import './user.css'

const ShippingScreen = () => {
    const cart = useSelector((state: RootState) => state.cart);
    const { shippingAddress } = cart

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({
            address, city, postalCode, country
        }))
        navigate('/payment')


    }
    return <FormContainer>
        <CheckoutSteps step1 step2 step3={undefined} step4={undefined} />
        <h1 className='shipping-heading'>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address' className='my-2'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='city' className='my-2'>
                <Form.Label>City</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter city'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='postalCode' className='my-2'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter Postal Code'
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='country' className='my-2'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter country'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Button className='my-2' type='submit' variant='success'>
                Continue
            </Button>
        </Form>
    </FormContainer>
}

export default ShippingScreen;