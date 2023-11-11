import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/ui/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/ui/loader/Loader';
import { useRegistrationMutation } from '../slices/sellersApiSlice';
import { toast } from 'react-toastify';
import { setCredentials } from '../slices/authSlice';
import { RootState } from '../store';

const RegistrationScreen = () => {
    const [pan, setPan] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [registration, { isLoading }] = useRegistrationMutation();
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const { token } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (userInfo.isSeller) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const data = { pan, phone, password, displayName }
            const res = await registration({ data, token }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate('/')
        } catch (err) {
            toast.error("Failed to Register , please try again")
        }
    };
    return (
        <FormContainer>
            <h1>Seller Registration</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-3' controlId='name'>
                    <Form.Label>User name</Form.Label>
                    <Form.Control type='text'
                        disabled
                        value={userInfo.name}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-3' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email'
                        disabled
                        value={userInfo.email}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-3' controlId='name'>
                    <Form.Label>Display name</Form.Label>
                    <Form.Control type='text'
                        value={displayName}
                        placeholder='Enter the seller name you want to display'
                        onChange={(e) => setDisplayName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-3' controlId='phone'>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type='text'
                        value={phone}
                        placeholder="Enter mobile number"
                        onChange={(e) => setPhone(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-3' controlId='pan'>
                    <Form.Label>PAN Number</Form.Label>
                    <Form.Control type='password'
                        placeholder="Enter PAN"
                        value={pan}
                        onChange={(e) => setPan(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-3' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password'
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Row className='py-3'>
                    <Col>
                        By continuing, I agree to Shorpee's  <Link to={'/login'}>Terms & conditions</Link>
                    </Col>
                </Row>
                <Button type='submit'
                    variant='success' className='mt-2'
                    disabled={isLoading}>
                    Register & Continue
                </Button>
                {isLoading && <Loader />}
            </Form>
        </FormContainer>
    )
}

export default RegistrationScreen;