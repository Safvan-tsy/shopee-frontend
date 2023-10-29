import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa';
import { RootState } from '../../store';
import './cart.css'
import { useGetProductDetailQuery } from '../../slices/productsApiSlice';

const Cart = ({ cart }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [address, setAddress] = useState('')
  const [district, setDistrict] = useState('')
  const [pincode, setPincode] = useState('')
  const [totalTax, setTotalTax] = useState(0); 
  const [totalShipping, setTotalShipping] = useState(0);

  useEffect(() => {
    let tax = 0;
    let shipping = 0;

    cart.orderItems.forEach((item) => {
      tax += item.taxPrice;
      shipping += item.shippingPrice;
    });

    setTotalTax(tax); 
    setTotalShipping(shipping); 
  }, [cart]);


  const token = useSelector((state: RootState) => state.auth.token);
  const checkoutHandler = () => { navigate('/login?redirect=/shipping') }

  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Items</th>
          <th scope="col">SHIPPING ADDRESS</th>
          <th scope="col">₹ Breakdown</th>
          <th scope="col">Total(₹)</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td data-label="Items">
            {cart.orderItems.map((item, index) => (
              <Link to={`/product/${item.productId}`} key={index}>
                <div className="items">
                  <Image src={item.image} alt={item.name} className='cart-img' fluid rounded />
                  <div className="items__title">{item.name}({item.qty})</div>
                </div>
              </Link>
            ))}
          </td>
          <td data-label="Address">
            <Form>
              <Form.Control type='text'
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}>
              </Form.Control>
              <Form.Control type='text'
                placeholder="Enter District"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}>
              </Form.Control>
              <Form.Control type='text'
                placeholder="Enter Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}>
              </Form.Control>
            </Form>
          </td>
          <td data-label="₹Breakdown">
            Total tax: {totalTax} <br />
            Shipping: {totalShipping}
          </td>
          <td data-label="Total(₹)">{cart.cartTotal}</td>
          <td data-label="Status" className='item-td'>
            <div className="items">
              <div className="items__title">
                <Button variant='success' onClick={checkoutHandler}>Checkout</Button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Cart