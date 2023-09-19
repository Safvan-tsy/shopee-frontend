import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import Message from '../../components/ui/Message';
import Loader from '../../components/ui/loader/Loader';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import { RootState } from '../../store';

const OrderListScreen = () => {
  const token = useSelector((state:RootState) => state.auth.token);  //try await if this doesnt work
  const { data: res, isLoading, error } = useGetOrdersQuery(token)


  return <>
    <h1>Orders</h1>
    {isLoading ? (
      <Loader />
    ) : error ? (
      <Message variant='danger'>{error}</Message>
    ) : (
      <Table striped hover responsive className='table-sm' >
        <thead>
          <tr>
            <th>ID</th>
            <th>USER</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {res.orders.map((order)=>(
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user && order.user.name}</td>
              <td>{order.createdAt.substring(0.10)}</td>
              <td>{order.totalPrice}</td>
              <td>
                {order.isPaid ? (
                  <FaTimes/>
                ) : (
                  <FaTimes style={{color:'red'}} />
                )}
              </td>
              <td>
              {order.isDelivered ? (
                  <FaTimes/>
                ) : (
                  <FaTimes style={{color:'red'}} />
                )}
              </td>
              <td>
                <LinkContainer to={`/order/${order._id}`}>
                <Button className='btn-sm'>Details</Button>
                </LinkContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )}
  </>
}

export default OrderListScreen