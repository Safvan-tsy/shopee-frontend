import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/ui/Message';
import Loader from '../../components/ui/Loader';
import FormContainer from '../../components/ui/FormContainer';
import { toast } from 'react-toastify';
import { useUploadProdImageMutation, useUpdateProductMutation, useGetProductDetailQuery } from '../../slices/productsApiSlice';
import { RootState } from '../../store';

const ProductEditScreen = () => {
    const navigate = useNavigate();
    const { id: prodId } = useParams();
    const token = useSelector((state:RootState) => state.auth.token);

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState<number>(0)
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState<number>(0)

    const { data: product, isLoading, refetch } = useGetProductDetailQuery(prodId);
    const [updateProduct, { error }] = useUpdateProductMutation();
    const [uploadProdImage, { isLoading: loadingUpload }] = useUploadProdImageMutation();

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
        try {
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
        await updateProduct({ data, token })
        toast.success('Update success');
        navigate('/admin/productlist');
            
    } catch (error) {
        toast.error('error')
    }
        
    };
    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('imageCover', e.target.files[0])
        try {
            console.log(formData)
            const res = await uploadProdImage({ formData, token }).unwrap()
            toast.success('success')
            setImage(res.image)
        } catch (error) {
            toast.error('error?.data?.message || error.error');
        }

    }
    return <>
        <Link to='/admin/productlist' className='btn btn-light my-3'>
            Go back
        </Link>
        <FormContainer>
            <h1>Edit Product</h1>
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
                            <Form.Group controlId='price' className='my-2'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Enter price'
                                    value={price}
                                    onChange={(e) => setPrice(Number(e.target.value))}
                                >

                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='image' className='my-2'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control type='text'
                                    placeholder='upload Image'
                                    value={image} 
                                >
                                </Form.Control>
                                <Form.Control
                                    type='file'
                                    aria-label='choose file'
                                    onChange={uploadFileHandler}
                                ></Form.Control>
                            </Form.Group>
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
                                    onChange={(e) => setCountInStock(Number(e.target.value))}
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