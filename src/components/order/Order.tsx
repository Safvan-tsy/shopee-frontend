import { Link } from 'react-router-dom';
import { Image, Form, Button } from 'react-bootstrap'

const Order = ({ order }) => {

  return (
    <table className='mb-2'>
      <thead>
        <tr>
          <th scope="col">Items</th>
          <th scope="col">SHIPPING ADDRESS</th>
          <th scope="col">Total(₹)</th>
          <th scope="col">Status</th>
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
              <Form.Text >{order.shippingAddress.address}</Form.Text><br />
              <Form.Text >{order.shippingAddress.city}</Form.Text><br />
              <Form.Text >{order.shippingAddress.postalCode}</Form.Text>
            </Form>
          </td>
          <td data-label="₹Total">
            {order.cartTotal}
          </td>
          <td data-label="Status" className='item-td'>
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