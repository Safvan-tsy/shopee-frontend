import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetCartDetailsQuery } from '../slices/usersApiSlice';
import { RootState } from '../store';
import useDocumentTitle from '../hooks/useDocumentTitle';
import Message from '../components/ui/Message';
import Loader from '../components/ui/loader/Loader';
import Cart from '../components/cart/Cart';
import { CartItem } from '../types/product.types';

const CartScreen = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const { data: cartDetails, isLoading, error } = useGetCartDetailsQuery({ token });
  const [cart, setCart] = useState([]);

  useDocumentTitle('Shopping Cart | Shorpee', false);

  useEffect(() => {
    if (cartDetails) {
      setCart(cartDetails.cart);
    }
  }, [cartDetails]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error || cart.length < 1 ? (
        <Message>No Items in cart</Message>
      ) : (
        cart.map((item: CartItem) => <Cart cart={item} key={item._id} />)
      )}
    </>
  );
};

export default CartScreen;
