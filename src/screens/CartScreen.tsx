import React, { useEffect, useState } from 'react';
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
  const [cart, setCart] = useState([]);
  useDocumentTitle('Shopping Cart | Shorpee', false);

  const token = useSelector((state: RootState) => state.auth.token);
  const { data: res, isLoading, refetch, error } = useGetCartDetailsQuery({token})

   useEffect(()=>{
    if(res){
      setCart(res.cart)
    }

   },[res])
   
  return (
    <>
    {isLoading ? ( <Loader/> ): error? (
      <Message>No Items in cart</Message>
    ) : cart.length<1 ? (
      <Message>No Items in cart</Message>
    ):(
      cart.map((item: CartItem) => (
        <Cart cart={item} key={item._id} /> 
      ))
    )
  }
    </>
  )
}

export default CartScreen