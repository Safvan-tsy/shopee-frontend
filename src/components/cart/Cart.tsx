import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { Image, Form, Button, Alert } from 'react-bootstrap'
import { RootState } from '../../store';
import { FaTrash } from 'react-icons/fa';
import './cart.css'
import { useDeleteCartMutation } from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';
import { useCreateOrderMutation } from '../../slices/ordersApiSlice';
import Loader from '../ui/loader/Loader';
import { OrderType } from '../../types/product.types';

const Cart = ({ cart }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  const [error, setError] = useState(false);
  const [address, setAddress] = useState('')
  const [district, setDistrict] = useState('')
  const [pincode, setPincode] = useState('')
  const [totalTax, setTotalTax] = useState(0);
  const [totalShipping, setTotalShipping] = useState(0);
  const [deleteCart, { isLoading, error: deleteCartError }] = useDeleteCartMutation()
  const [createOrder, { isLoading: loadingCheckout, error: errorCheckout }] = useCreateOrderMutation()

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

  const addressValidate = () => {
    if (
      !address ||
      !district ||
      !pincode
    ) {
      setError(true)
      return false
    } else {
      setError(false)
      return true
    }
  }

  const checkoutHandler = async (cart) => {
    try {

      if (addressValidate()) {
        let data: OrderType = { ...cart }
        data.shippingAddress = {
          address: address,
          city: district,
          postalCode: pincode,
          state: "Kerala",
          country: "India"
        }
        const res = await createOrder({ data, token }).unwrap()
        if (errorCheckout) {
          console.log(errorCheckout, "errorCheckout")
          toast.error('Error occured')
        } else {
          let cartId = cart._id
          await deleteCart({ cartId, token })
        }
      }


    } catch (error) {
      console.log(error)
      toast.error('Error occured')
    }
  }
  const deleteHandler = async (cartId: string) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteCart({ cartId, token })
        toast.success('Deleted');
      } catch (error) {
        toast.error('Error occured')
      }
    }
  }
  return (
    <table className='mb-2'>
      <thead>
        <tr>
          <th scope="col">Items</th>
          <th scope="col">SHIPPING ADDRESS</th>
          <th scope="col">₹ Breakdown</th>
          <th scope="col">Total(₹)</th>
          <th scope="col">Actions</th>
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
          <td data-label="Actions" className='item-td'>
            <div className="items">
              <div className="items__title cart-actions">
                {
                  loadingCheckout ? (<Loader />)
                    : (<Button variant='success' onClick={() => checkoutHandler(cart)}>Place Order</Button>)
                }
                {isLoading ? (<Loader />) : (
                  <Button variant='danger' onClick={() => deleteHandler(cart._id)}><FaTrash /></Button>
                )}
              </div>
            </div>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>
            {error && <Alert variant='danger'>Please fill All Fields</Alert>}
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

export default Cart