import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetProductsQuery } from '../../slices/productsApiSlice';

const ProductListScreen = () => {

    const { data: res, isLoading, error } = useGetProductsQuery()
    const deleteHandler = () => {}
    return <>
        <Row className='align-items-center'>
            <Col>
                <h1>Products</h1>
            </Col>
            <Col className='text-end' >
                <Button className='btn btn-sm'>
                    <FaEdit />Create Product
                </Button>
            </Col>
        </Row>

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
                                            <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(product._id)}>
                                                <FaTrash style={{color:'white'}} />
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