import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import Message from '../../components/ui/Message';
import Loader from '../../components/ui/loader/Loader';
import { OrderType } from '../../types/product.types';
import { useGetMyOrdersQuery } from '../../slices/ordersApiSlice';
import Order from '../../components/order/Order';

const OrderScreen = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const { data: orderDetails, isLoading, error } = useGetMyOrdersQuery({ token });
    const [order, setOrder] = useState<OrderType[]>([]);

    useDocumentTitle('My Orders | Shorpee', false);
    useEffect(() => {
        if (orderDetails) {
            setOrder(orderDetails.orders);
        }
    }, [orderDetails]);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message>Error: Try Again</Message>
            ) : order.length < 1 ? (
                <Message>No Orders Found</Message>
            ) : (
                order.map((item: OrderType) => <Order order={item} key={item._id} />)
            )}
        </>
    )
}

export default OrderScreen;