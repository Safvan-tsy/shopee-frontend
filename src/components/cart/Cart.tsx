import React from 'react'
import './cart.css'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const Cart = (props) => {
  return (
    <table>
    <thead>
      <tr>
        <th scope="col">Items</th>
        <th scope="col">SHIPPING ADDRESS</th>
        <th scope='col'>Date</th>
        <th scope="col">Total(₹)</th>
        <th scope="col">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="Items">
          <Link to='/'>
            <div className="items">
              <div className="items__title">lorem ipsum dolor sit amet</div>
            </div>
          </Link>
        </td>
        <td data-label="Address">Manikulath(H) Parappanpoyil(PO)</td>
        <td data-label="Date">2023-07-08</td>
        <td data-label="Total(₹)">899</td>
        <td data-label="Status" className='item-td'>
          <div className="items">
            <div className="items__title"><Button variant='success'>Checkout</Button></div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  )
}

export default Cart