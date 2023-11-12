import { Link} from 'react-router-dom';
import { Image, Form, Button} from 'react-bootstrap'

import { OrderType } from '../../types/product.types';

const Order = ({order}) => {

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
            {order.orderItems.map((item, index) => (
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
                value={order.shippingAddress.address}>
              </Form.Control>
              <Form.Control type='text'
                placeholder="Enter District"
                value={order.shippingAddress.city}>
              </Form.Control>
              <Form.Control type='text'
                placeholder="Enter Pincode"
                value={order.shippingAddress.postalCode}>
              </Form.Control>
            </Form>
          </td>
          <td data-label="₹Total">
            {order.cartTotal}
          </td>
          <td data-label="Total(₹)">{order.cartTotal}</td>
          <td data-label="Actions" className='item-td'>
            <div className="items">
              <div className="items__title cart-actions">
                <Button disabled>{order.status}</Button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Order