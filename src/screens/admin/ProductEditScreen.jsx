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
    const navigate = useNavigate();
    const { id: prodId } = useParams();
    const token = useSelector((state) => state.auth.token);

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState(0)
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)

    const { data: product, isLoading, refetch } = useGetProductDetailQuery(prodId);
    const [updateProduct, { isloading: loadingUpdate, error }] = useUpdateProductMutation();

    useEffect(() => {
        if (product) {
            setName(product.data.product.name);
            setPrice(product.data.product.price);
            setImage(product.data.product.image);
            setBrand(product.data.product.brand);
            setCategory(product.data.product.category);
            setCountInStock(product.data.product.countInStock);
            setDescription(product.data.product.description)
        }

    }, [product])

    const submitHandler = async (e) => {
        e.preventDefault()
        const data = {
            prodId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }
        const result = await updateProduct({ data, token })
        if (result.error) {
            toast.error(result.error)
        }
        else {
            ;
            toast.success('Update success');
            navigate('/admin/productlist');
        }
    }
    return <>
        <Link to='/admin/productlist' className='btn btn-light my-3'>
            Go back
        </Link>
        <FormContainer>
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader />}

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
                            <Form.Group controlId='price' className='my-2'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Enter price'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                >

                                </Form.Control>
                            </Form.Group>
                            {/* image input */}
                            <Form.Group controlId='brand' className='my-2'>
                                <Form.Label>Brand</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter brand'
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                >

                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='countInStock' className='my-2'>
                                <Form.Label>Count in Stock</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Enter countInStock'
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                >

                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='category' className='my-2'>
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter category'
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >

                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='description' className='my-2'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >

                                </Form.Control>
                            </Form.Group>

                            <Button type='submit' variant='success' className='my-3'>
                                Update Product
                            </Button>
                        </Form>
                    )}
        </FormContainer>
    </>
}

export default ProductEditScreen