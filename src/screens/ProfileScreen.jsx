import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';


const ProfileScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const token = useSelector((state)=> state.auth.token)
  const [updateProfile,{loading:loadingUpdateProfile}] = useProfileMutation()

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo,userInfo.name, userInfo.email])

  const submitHandler = async(e) => {
    e.preventDefault();
    if(password!==confirmPassword){
      toast.error('password did not match')
    }else{
      try {
        const data = {_id:userInfo._id,name,password, confirmPassword}
        const res = await updateProfile({data, token}).unwrap();
        dispatch(setCredentials(res));
        toast.success('Profile updated success')
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }

  }

  return <Row>
    <Col md={3}>
      <h2>User Profile</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name' className='my-2'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='email' className='my-2'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password' className='my-2'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmpasswrd' className='my-2'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm passwrd'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button variant='primary' type='submit' className='my-2'>
          Update
        </Button>
        {loadingUpdateProfile&&<Loader/>}
      </Form>
    </Col>
    <Col md={9}>
    </Col>
  </Row>
}

export default ProfileScreen