import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa';
import Message from '../components/ui/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import { RootState } from '../store';
import useDocumentTitle from '../hooks/useDocumentTitle';
import Cart from '../components/cart/Cart';
import { useGetCartDetailsQuery } from '../slices/usersApiSlice';
import Loader from '../components/ui/loader/Loader';
import { CartItem } from '../types/product.types';

const CartScreen = () => {
  useDocumentTitle('Shopping Cart | Shorpee', false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.auth.token);
  const { data: res, isLoading, refetch, error } = useGetCartDetailsQuery({token})
  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }))
  }
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }
  const checkoutHandler = () => { navigate('/login?redirect=/shipping') }

  return (
    <>
    {isLoading ? ( <Loader/> ): error? (
      <Message>No Items in cart</Message>
    ) : (
      res.cart.map((item:CartItem)=>{
        <Cart cart={item}/>
      })
    )
  }
    </>
  )
}

export default CartScreen