import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify'
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetProductsQuery, useCreateProductMutation , useDeleteProductMutation} from '../../slices/productsApiSlice';

const ProductListScreen = () => {
    
    const token = useSelector((state) => state.auth.token);
    const { data: res, isLoading, error, refetch } = useGetProductsQuery()
    const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation()
    const [deleteProduct, {isLoading:loadingDelete}] = useDeleteProductMutation()

    const deleteHandler = async(prodId) => {
        if(window.confirm('Are you sure')){
            try {
                await deleteProduct({prodId,token})
                toast.success('Deleted')
                refetch()
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }
        }
    }
    const createProductHandler = async () => {
        if (window.confirm('Are you sure')) {
            try {
                const data = {
                    name:'new product',
                    description:'type description here',
                    price: 0
                }
                await createProduct({ data, token })
                refetch()
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }

        }
    }
    return <>
        <Row className='align-items-center'>
            <Col>
                <h1>Products</h1>
            </Col>
            <Col className='text-end' >
                <Button className='btn btn-sm' onClick={createProductHandler}>
                    <FaEdit />Create Product
                </Button>
            </Col>
        </Row>
        {loadingCreate && <Loader />}
        {loadingDelete && <Loader />}
        {isLoading ? <Loader />
            : error ?
                <Message variant='danger'>{error}</Message>
                : (
                    <>
                        <Table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    <th>CATEGORY</th>
                                    <th>BRAND</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {res.data.products.map((product) => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand || 'null'}</td>
                                        <td>
                                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                <Button variant='light' className='btn-sm mx-2'>
                                                    <FaEdit />
                                                </Button>
                                            </LinkContainer>
                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                                <FaTrash style={{ color: 'white' }} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </>
                )}
    </>
}

export default ProductListScreen