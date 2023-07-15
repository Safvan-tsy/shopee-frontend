import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import { useUpdateProductMutation, useGetProductDetailQuery } from '../../slices/productsApiSlice';

const ProductEditScreen = () => {
    const { id: prodId } = useParams();
    const token = useSelector((state) => state.auth.token);

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState(0)
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)

    return (
        <div>ProductEditScreen</div>
    )
}

export default ProductEditScreen