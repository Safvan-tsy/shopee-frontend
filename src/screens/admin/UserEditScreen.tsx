import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/ui/Message';
import Loader from '../../components/ui/Loader';
import FormContainer from '../../components/ui/FormContainer';
import { toast } from 'react-toastify';
import { useGetUserDetailsQuery,useUpdateUserMutation } from '../../slices/usersApiSlice';
import { RootState } from '../../store';
import { FaArrowLeft } from 'react-icons/fa';

const UserEditScreen = () => {
    const navigate = useNavigate();
    const { id: userId } = useParams();
    const token = useSelector((state:RootState) => state.auth.token);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const { data: res, isLoading, refetch } = useGetUserDetailsQuery({userId,token});
    const [updateUser, {  error }] = useUpdateUserMutation();

    useEffect(() => {
        if (res) {
            setName(res.user.name);
            setEmail(res.user.email);
            setIsAdmin(res.user.isAdmin);
        }

    }, [res])

    const submitHandler = async (e) => {
        e.preventDefault()
        const data = {
            userId,
            name,
            email,
            isAdmin
        }
        try {
        const result = await updateUser({ data, token })
    
            toast.success('Update success');
            navigate('/admin/userlist');
        
    } catch (error) {
            toast.error('fail')
    }
    };

    return <>
        <Link to='/admin/userlist' className='btn btn-light go-back-btn'>
        <FaArrowLeft/>
        </Link>
        <FormContainer>
            <h1>Edit User Details</h1>
            {/* {loadingUpdate && <Loader />} */}

            {isLoading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name' className='my-2'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >

                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='email' className='my-2'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                >

                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='isAdmin' className='my-2'>
                                <Form.Check
                                type='checkbox'
                                label='Is Admin'
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                                ></Form.Check>
                            </Form.Group>

                            <Button type='submit' variant='success' className='my-3'>
                                Update user
                            </Button>
                        </Form>
                    )}
        </FormContainer>
    </>
}

export default UserEditScreen